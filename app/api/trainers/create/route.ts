import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const jwt = (await cookies()).get("authToken")?.value;

  const response = await fetch("https://assignment2.swafe.dk/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to create trainer please check your forms" },
      { status: 401 }
    );
  }

  const responseData = await response.json();
  console.log("Login successful:", responseData);
  return NextResponse.json(responseData, { status: 201 });
}
