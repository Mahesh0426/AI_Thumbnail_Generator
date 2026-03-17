import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("Database connection successfully!!");
  } catch (error: any) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
