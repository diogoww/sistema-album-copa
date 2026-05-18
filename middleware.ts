import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { securityHeaders } from "@/lib/security";

export default auth((req) => {
  const response = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const { pathname } = req.nextUrl;
  const isPrivate =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/collection") ||
    pathname.startsWith("/stickers") ||
    pathname.startsWith("/missing") ||
    pathname.startsWith("/duplicates") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/collection") ||
    pathname.startsWith("/api/import");

  if (isPrivate && !req.auth) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
