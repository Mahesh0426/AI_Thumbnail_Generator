import { Request, Response } from "express";
import Thumbnail from "../models/thumbnailModel.js";
import { generateImageFromOpenAI } from "../services/aiService_gpt.js";
import path from "path";
import fs from "fs";
import { cloudinary } from "../config/cloudinary.js";
import { url } from "inspector/promises";

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    console.log("req.body", req.body);

    //save to db
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    console.log("thumbnail", thumbnail);

    //generate the image using ai service
    const finalBuffer = await generateImageFromOpenAI({
      title,
      style,
      color_scheme,
      user_prompt,
      aspect_ratio,
    });

    //create filename
    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join("images", filename);

    console.log("filePath", filePath);

    //create the images directory if it doesn't exist
    fs.mkdirSync("images", { recursive: true });

    //save the image to the file system
    fs.writeFileSync(filePath, finalBuffer!);

    //upload to cloudinary
    const uploadToCloudinary = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    console.log("uploadToCloudinary", uploadToCloudinary);

    //update the thumbnail with the image url
    thumbnail.image_url = uploadToCloudinary.secure_url || url;
    thumbnail.isGenerating = false;

    //save to db
    await thumbnail.save();
    res.json({
      message: "Thumbnail generated successfully",
      thumbnail,
    });

    //delete the local file
    fs.unlinkSync(filePath);
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//delete thumbnail

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    await Thumbnail.findByIdAndDelete({ _id: id, userId });

    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
