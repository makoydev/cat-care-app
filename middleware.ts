import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the path is /cats
  if (request.nextUrl.pathname.startsWith('/cats')) {
    // For client-side protection, we'll handle auth in the component
    // This is just to prevent direct URL access without any session
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/cats/:path*',
};