import express from "express";
import {
  deleteThumbnail,
  generateThumbnail,
} from "../controllers/ThumbnailControllers.js";
import authMiddleware from "../middleware/auth.js";

const ThumbnailRouter = express.Router();

ThumbnailRouter.post("/generate", authMiddleware, generateThumbnail);
ThumbnailRouter.delete("/delete/:id", authMiddleware, deleteThumbnail);

export default ThumbnailRouter;
