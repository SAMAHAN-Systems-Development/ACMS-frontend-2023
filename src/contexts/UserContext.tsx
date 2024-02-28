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
    '/events/[id]',
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
  //TODO: it should check if it contains the URL
  if (
    allowedUrls[userType].includes(pathname) ||
    pathname.includes('/events/') ||
    pathname.includes('/event/') ||
    pathname.includes('/student')
  ) {
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
