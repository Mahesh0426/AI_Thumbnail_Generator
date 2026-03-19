import express from "express";
import {
  getThumbnailById,
  getUsersThumbnails,
} from "../controllers/UserControllers.js";
import authMiddleware from "../middleware/auth.js";

const UserRouter = express.Router();

UserRouter.get("/thumbnails", authMiddleware, getUsersThumbnails);
UserRouter.get("/thumbnail/:id", authMiddleware, getThumbnailById);

export default UserRouter;
