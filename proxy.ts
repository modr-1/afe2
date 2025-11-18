import { NextResponse, NextRequest } from "next/server";
import { decode as jwtDecode } from "jsonwebtoken";

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get("authToken");

  if (!authToken) {
    // Redirect to login if no token is found
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decodedToken = jwtDecode(authToken.value);

    // Role-based access control
    const role = (decodedToken as any).Role;

    // Manager routes
    if (request.nextUrl.pathname.startsWith("/manager") && role !== "Manager") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Personal Trainer routes
    if (
      request.nextUrl.pathname.startsWith("/trainer") &&
      role !== "PersonalTrainer"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Client routes
    if (request.nextUrl.pathname.startsWith("/client") && role !== "Client") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } catch (error) {
    // Redirect to login if token decoding fails
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow access if everything is valid
}

export const config = {
  matcher: [
    "/manager/:path*", // Apply proxy to all manager routes
    "/trainer/:path*", // Apply proxy to all trainer routes
    "/client/:path*", // Apply proxy to all client routes
  ],
};
