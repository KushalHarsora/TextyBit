import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Middleware Logic
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/sign-up" || path === "/sign-in" || path === "/";

    const token = request.cookies.get("token")?.value || "";
    // If user is on public url with tokens set
    if (isPublicPath && token) {
        const response = NextResponse.redirect(new URL("/", request.nextUrl));
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response;
    }
    // If user does not have both token and seeing public url
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
    }
}
 
// Matching for Routes
export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
  ],
}