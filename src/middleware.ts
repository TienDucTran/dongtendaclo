import { NextResponse, type NextRequest } from 'next/server';

// Note: Authentication is handled client-side using localStorage
// This middleware is disabled for admin routes to allow client-side auth check
// The admin layout component handles the redirect logic

export async function middleware(request: NextRequest) {
  // Just pass through - auth is handled by client-side localStorage
  // See src/app/admin/layout.tsx for authentication logic
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
