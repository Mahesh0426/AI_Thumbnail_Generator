import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    //find user by email
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists..." });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    //save to db
    const newUser = new User({ name, email, password: hasedPassword });
    await newUser.save();

    //setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id;

    return res.json({
      messsage: "User Created Successfully!!!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found..." });
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!!!" });
    }

    //setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = user._id;

    return res.json({
      message: "User logged in successfully!!!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//logout user
export const logoutUser = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      return res.json({ message: "User logged out successfully!!!" });
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//user verify
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ user, message: "User verified successfully!!!" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
