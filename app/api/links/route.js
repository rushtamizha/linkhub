import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db.js";
import Link from "../../models/link.js";
import { verifyToken } from "../../lib/auth.js";

function auth(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Unauthorized");
  verifyToken(token);
}

export async function GET(req) {
  auth(req);
  await connectDB();
  return NextResponse.json(await Link.find().sort({ createdAt: -1 }));
}

export async function POST(req) {
  auth(req);
  await connectDB();

  const data = await req.json();

  if (!/^https:\/\//.test(data.url)) {
    return NextResponse.json({ error: "HTTPS only" }, { status: 400 });
  }

  const link = await Link.create(data);
  return NextResponse.json(link);
}

export async function PUT(req) {
  auth(req);
  await connectDB();
  const { id, ...data } = await req.json();
  return NextResponse.json(
    await Link.findByIdAndUpdate(id, data, { new: true })
  );
}

export async function DELETE(req) {
  auth(req);
  await connectDB();
  const { id } = await req.json();
  await Link.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
