import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Already connected to MongoDB database");
    return;
  }

  try {
    const url = process.env.MONGODB_URL;

    await mongoose.connect(url);
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
};
