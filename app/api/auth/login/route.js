import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth.js";

export async function POST(req) {
  const { email, password } = await req.json();

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ role: "admin" });

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return res;
}
