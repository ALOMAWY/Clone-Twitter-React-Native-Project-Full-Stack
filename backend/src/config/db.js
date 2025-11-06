import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To DB Successfully 🚀");
  } catch (error) {
    console.error("cannot to connect DB", error);
    process.exit(1);
  }
};
