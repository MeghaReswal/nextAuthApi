import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { NextResponse } from "next/server";

const JWT_SECRET = "secretvalue";
const REFRESH_TOKEN_SECRET = "secretrefresh";

export function GET(req) {
  const cookies = parse(req.headers.get("cookie") || "");
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    const user = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const newToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ token: newToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
