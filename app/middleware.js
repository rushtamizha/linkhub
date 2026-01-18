import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (req.nextUrl.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
