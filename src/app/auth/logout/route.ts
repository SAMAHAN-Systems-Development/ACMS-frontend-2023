import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST() {
  const baseUrl = process.env.NEXT_APP_BASE_URL;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  await supabase.auth.signOut();

  return NextResponse.redirect(`${baseUrl}/login`, {
    status: 301,
  });
}
