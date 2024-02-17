'use client';
import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/ui/Loading';
import Unauthorized from '@/components/ui/Unauthorized';
import { fetchUser } from '@/utilities/fetch/user';

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
    '/test'
  ],
  student: ['/events/register/'],
};

export const UserContext = createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const pathname: string = usePathname();

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(supabase),
  });
  const { userType } = userQuery.data || {
    email: '',
    userType: 'student',
    accessToken: '',
  };

  // Path for students to register for events
  if (allowedUrls['student'].includes(pathname) || pathname === '/login') {
    return children;
  }

  // Checks if the URL is valid according to the usertype
  if (allowedUrls[userType].includes(pathname)) {
    return (
      <UserContext.Provider value={{ user: userQuery.data }}>
        {children}
      </UserContext.Provider>
    );
  }

  if (userQuery.isLoading) {
    return <Loading />;
  }

  return <Unauthorized />;
}

export function useUser() {
  return useContext(UserContext);
}
