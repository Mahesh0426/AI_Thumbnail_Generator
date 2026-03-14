import express, { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";

await connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Server is running...</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
