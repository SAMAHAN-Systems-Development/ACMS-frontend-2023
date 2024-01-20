'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

import Unauthorized from '@/components/ui/Unauthorized';

const allowedUrls = {
  facilitator: ['/login', '/home', '/'],
  cashier: ['/login', '/register-student', '/home', '/'],
  admin: [
    '/login',
    '/home',
    '/student',
    '/event/active',
    '/event/inactive',
    '/payments/pending',
    '/payments/declined',
    '/payments/accepted',
    '/',
  ],
};

export const UserContext = createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; userType: string }>({
    email: '',
    userType: '',
  });
  const [token, setToken] = useState<string>();
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    const updateUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase.auth.getUser();

      if (!data.user) return;

      axios
        .post(`${backendUrl}/user`, { supabaseUserId: data.user.id })
        .then((res: AxiosResponse) => {
          setUser(res.data);
          const accessToken = res.headers['x-access-token'];
          setToken(accessToken);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    void updateUser();
  }, [backendUrl, supabase.auth]);

  if (pathname.includes('/events/register/') || pathname === '/login') {
    return children;
  }

  if (
    user.userType !== 'facilitator' &&
    user.userType !== 'cashier' &&
    user.userType !== 'admin'
  ) {
    return <Unauthorized />;
  }

  if (allowedUrls[user.userType].includes(pathname)) {
    return (
      <UserContext.Provider value={{ user, token }}>
        {children}
      </UserContext.Provider>
    );
  }

  return <Unauthorized />;
}

export function useUser() {
  return useContext(UserContext);
}
