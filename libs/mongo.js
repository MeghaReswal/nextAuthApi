import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    // Await the connection to ensure it completes before proceeding
    await mongoose.connect("mongodb://127.0.0.1:27017/crudapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default dbConnection;
