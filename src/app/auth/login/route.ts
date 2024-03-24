import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  const baseUrl = process.env.NEXT_APP_BASE_URL;
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  formData.delete('email');
  formData.delete('password');

  return NextResponse.redirect(`${baseUrl}/home`, {
    status: 301,
  });
}
