const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/netflix");
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

module.exports = connectDB;
