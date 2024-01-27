'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setCookie } from 'cookies-next';

import Loading from '@/components/ui/Loading';
import Unauthorized from '@/components/ui/Unauthorized';
// import { useQuery } from '@tanstack/react-query';

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
  student: ['/events/register/'],
};

export const UserContext = createContext({});
const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    email: string;
    userType: 'facilitator' | 'cashier' | 'admin' | 'student';
  }>({
    email: '',
    userType: 'student',
  });


  const supabase = createClientComponentClient();
  const pathname: string = usePathname();

  const updateUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    const response = await axios
      .post(`${backendUrl}/user`, { supabaseUserId: data.user.id })
      .catch((error) => {
        throw new Error(error);
      });

    setUser(response.data)

    const accessToken = response.headers['x-access-token'];
    setCookie('json-web-token', accessToken);

    // return response.data
  };

  // const userQuery = useQuery({ queryKey: ['user'], queryFn: updateUser })
  // console.log(userQuery.data)

  useEffect(() => {
    void updateUser();
  }, [supabase.auth]);

  // Path for students to register for events
  if (allowedUrls['student'].includes(pathname) || pathname === '/login') {
    return children;
  }

  // Checks if the URL is valid according to the usertype
  if (allowedUrls[user.userType].includes(pathname)) {
    return (
      <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
  }

  if (!user.email) {
    return <Loading />;
  }

  return <Unauthorized />;
}

export function useUser() {
  return useContext(UserContext);
}
