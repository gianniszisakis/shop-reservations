import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function proxy(request: NextRequest) {
  const session = await auth();

  const isLoginPage = request.nextUrl.pathname === "/login";
  const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!session && !isLoginPage) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (session && isLoginPage) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
