"use server";

import bcrypt from "bcryptjs";
import User from "../../../../../modal/user";
import dbConnection from "../../../../../libs/mongo";
import { validateEmail } from "../../../../../libs/validateCredential";


export async function handleSignup({ email, password, fullname }) {
  try {
    await dbConnection();

    if (!email || !password || !fullname) {
      return { success: false, message: "Please fill in all fields" };
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return { success: false, message: emailError };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists. Please log in." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
    });

    await newUser.save();

    return { success: true, message: "User registered successfully!" };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "Something went wrong" };
  }
}
