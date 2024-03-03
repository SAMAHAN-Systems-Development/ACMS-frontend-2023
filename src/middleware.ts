import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    req.nextUrl.pathname.includes('/register') ||
    req.nextUrl.pathname.includes('/student')
  ) {
    return res;
  }

  if (!session && req.nextUrl.pathname !== '/login') {
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }

  if (session && req.nextUrl.pathname === '/login') {
    req.nextUrl.pathname = '/home';
    return NextResponse.redirect(req.nextUrl);
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    '/((?!auth|_next/static|_next/image|assets|favicon.ico|logo.png|RegisterCoverPhoto.png|RegisterCoverPhoto768.png|sw.js).*)',
  ],
};
