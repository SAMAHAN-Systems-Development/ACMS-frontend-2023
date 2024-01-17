import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  createMiddlewareClient,
  type SupabaseClient,
} from '@supabase/auth-helpers-nextjs';

const allowedUrls = {
  facilitator: ['/login', '/home'],
  cashier: ['/login', '/register-student'],
  admin: [
    '/login',
    '/home',
    '/student',
    '/event/active',
    '/event/inactive',
    '/payment/pending',
    'payment/declined',
    'payment/accepted',
  ],
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userType = await fetchUserType(req, res, supabase, backendUrl);

  if (userType) {
    // res.headers.set('user-type', userType)
    // TODO: https://nextjs.org/docs/app/building-your-application/routing/middleware
  }

  if (
    userType !== 'facilitator' &&
    userType !== 'cashier' &&
    userType !== 'admin'
  ) {
    return res;
  }

  if (req.nextUrl.pathname in allowedUrls[userType]) {
    // TODO: add functionality here
  }
  if (session && req.nextUrl.pathname === '/login') {
    req.nextUrl.pathname = '/home';
    return NextResponse.redirect(req.nextUrl);
  }

  if (!session && req.nextUrl.pathname !== '/login') {
    req.nextUrl.pathname = '/login';
    return NextResponse.redirect(req.nextUrl);
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth routes)
     */
    '/((?!auth|_next/static|_next/image|favicon.ico).*)',
  ],
};

const fetchUserType = async (
  req: NextRequest,
  res: NextResponse,
  supabase: SupabaseClient,
  backendUrl: string
) => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;

  const supabaseUserId = data.user.id;

  if (req.nextUrl.pathname.includes('/events/register/')) {
    return res;
  }

  const response = await fetch(`${backendUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ supabaseUserId: supabaseUserId }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const dataJson = await response.json();
  const userType: string = dataJson.userType;

  return userType;
};