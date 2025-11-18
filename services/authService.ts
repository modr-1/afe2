import { decode as jwtDecode } from "jsonwebtoken";

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<any> {
  const response = await fetch("https://assignment2.swafe.dk/api/Users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to login. Please check your credentials.");
  }

  const data = await response.json();

  localStorage.setItem("authToken", data.jwt);

  const decodedToken = jwtDecode(data.jwt);
  localStorage.setItem("userRole", (decodedToken as any).Role);
  localStorage.setItem("userId", (decodedToken as any).UserId);

  return data.jwt;
}
