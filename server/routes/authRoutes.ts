import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/AuthControllers.js";
import authMiddleware from "../middleware/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser);
AuthRouter.post("/logout", authMiddleware, logoutUser);
AuthRouter.get("/verify", authMiddleware, verifyUser);

export default AuthRouter;
