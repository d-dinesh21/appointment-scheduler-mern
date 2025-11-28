const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("MONGO_URI not set. Skipping MongoDB connection for now.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
