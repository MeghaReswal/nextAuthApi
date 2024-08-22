"use server";

import User from "../../../../../modal/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnection from "../../../../../libs/mongo";

const JWT_SECRET = "secretvalue";
const REFRESH_TOKEN_SECRET = "secretrefresh";

export async function handleLogin({ email, password }) {
  try {
    await dbConnection();

    // check the email and password is correct or not
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { success: false, message: "Invalid email or password" };
    }

    // Generate tokens
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // Return the token and user data
    return {
      success: true,
      token,
      message: "Successfully logged in",
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      refreshToken, 
    };
  } catch (err) {
    console.error("Error during login:", err);
    return {
      success: false,
      message: "Something went wrong",
      error: err.message,
    };
  }
}
