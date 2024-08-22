import User from "../../../../../modal/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import dbConnection from "../../../../../libs/mongo";

const JWT_SECRET = "secretvalue";
const REFRESH_TOKEN_SECRET = "secretrefresh"; 

export async function POST(req) {
  try {
    await dbConnection();

    const { email, password } = await req.json();

    // Find and authenticate user
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate tokens
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // Set refresh token in an HTTP-only cookie
    const res = NextResponse.json({
      success: true,
      token,
      message : "successfully logged in",
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res;
  } catch (err) {
    console.error("Error during login:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}
