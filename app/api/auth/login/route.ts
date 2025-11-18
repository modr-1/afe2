import { NextResponse } from "next/server";
import { decode as jwtDecode } from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch("https://assignment2.swafe.dk/api/Users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to login. Please check your credentials." },
      { status: 401 }
    );
  }

  const data = await response.json();

  // Decode the JWT token securely on the server
  const decodedToken = jwtDecode(data.jwt);

  // Set HttpOnly cookie for the JWT token
  const responseWithCookie = NextResponse.json({
    message: "Login successful",
    role: (decodedToken as any).Role,
    userId: (decodedToken as any).UserId,
  });

  responseWithCookie.cookies.set("authToken", data.jwt, {
    httpOnly: true,
    secure: true, // Ensure this is true in production
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  responseWithCookie.cookies.set("role", (decodedToken as any).Role, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  responseWithCookie.cookies.set("userId", (decodedToken as any).UserId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return responseWithCookie;
}
