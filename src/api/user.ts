import type { SupabaseClient } from '@supabase/supabase-js';

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const fetchUser = async (
  supabase: SupabaseClient
): Promise<{
  accessToken: string;
  email: string;
  userType: 'facilitator' | 'cashier' | 'admin' | 'student';
}> => {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return { email: '', userType: 'student', accessToken: '' };

  const response = await fetch(`${backendUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ supabaseUserId: data.user.id }),
  });

  if (!response.ok) {
    throw new Error('Error in fetching the accepted payments');
  }
  const accessToken = response.headers.get('x-access-token');

  const users: {
    email: '';
    userType: 'facilitator' | 'cashier' | 'admin' | 'student';
  } = await response.json();

  if (!accessToken) return { ...users, accessToken: '' };

  return { ...users, accessToken };
};
