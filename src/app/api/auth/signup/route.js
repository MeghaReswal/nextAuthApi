import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "../../../../../modal/user";
import dbConnection from "../../../../../libs/mongo";
import {validateEmail} from "../../../../../libs/validateCredential"

export async function POST(req) {
  try {
    await dbConnection(); 

    const {email, password, fullname} = await req.json();
    console.log("Request32", email, password, fullname);

    if (!email || !password || !fullname) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    const emailError = validateEmail(email);
    if (emailError) {
      return NextResponse.json(
        { success: false, message: emailError },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists. Please log in." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
