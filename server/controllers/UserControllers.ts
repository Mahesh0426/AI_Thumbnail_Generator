import { Request, Response } from "express";
import Thumbnail from "../models/thumbnailModel.js";

//controller to get all thumbnails
export const getUsersThumbnails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    const thumbnail = await Thumbnail.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Thumbnails fetched successfully!!!",
      thumbnail,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// controller to get single User thumbnail a user
export const getThumbnailById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const { id } = req.params;

    const thumbnail = await Thumbnail.findOne({ _id: id, userId });
    res.json({
      message: "Thumbnail fetched successfully!!!",
      thumbnail,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
