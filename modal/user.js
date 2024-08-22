import mongoose from "mongoose";
import validator from "validator";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model is already compiled
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
