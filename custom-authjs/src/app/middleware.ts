import { NextRequest, NextResponse } from "next/server";

export const privateRoute = ["/settings", "/private"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (privateRoute.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
