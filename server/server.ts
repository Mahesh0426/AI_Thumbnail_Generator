import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import AuthRouter from "./routes/authRoutes.js";
import ThumbnailRouter from "./routes/thumbnailRoutes.js";
import UserRouter from "./routes/userRoutes.js";

declare module "express-session" {
  interface SessionData {
    isLoggedIn?: boolean;
    userId?: string;
  }
}

await connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, //7 day,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
      collectionName: "sessions",
    }),
  }),
);
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://72.61.125.129:5173",
    ],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Server is running...</h1>");
});

//routes
app.use("/api/auth", AuthRouter);
app.use("/api/thumbnail", ThumbnailRouter);
app.use("/api/user", UserRouter);

//server listen
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
