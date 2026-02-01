import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths that don't require authentication
const publicPaths = ["/", "/login", "/register", "/forgot-password"];

// Admin-only paths
const adminPaths = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies (we'll implement proper auth token storage later)
  const token = request.cookies.get("tu-access-token")?.value;

  // Check if the current path is public
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Check if the current path is for admin
  const isAdminPath = adminPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // If user is not authenticated and trying to access protected route
  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access auth pages (login/register)
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // TODO: Add admin role check when authentication is implemented
  // For now, we'll let all authenticated users access admin routes
  // In production, you should verify the user's role from the token

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
