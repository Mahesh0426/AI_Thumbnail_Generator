import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("mongo db connected successfully!!")
    );
    await mongoose.connect(process.env.MONGODB_URI as string)
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
