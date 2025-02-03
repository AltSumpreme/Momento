import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [/^\/login$/, /^\/signup$/];
const privateRoutes = [/^\/dashboard(?:\/.*)?$/];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const pathname = request.nextUrl.pathname;

  const isPublicPath = publicRoutes.some((route) => route.test(pathname));
  const isPrivatePath = privateRoutes.some((route) => route.test(pathname));

  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
