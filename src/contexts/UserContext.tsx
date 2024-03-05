'use client';
import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';

import Loading from '@/components/ui/Loading';
import Unauthorized from '@/components/ui/Unauthorized';
import { fetchUser } from '@/utilities/fetch/user';

const allowedUrls = {
  facilitator: [
    '/home',
    '/',
    '/student',
    '/event/qr-scan/[id]',
    '/register/[id]',
  ],
  cashier: ['/home', 'register-student', '/', '/register/[id]'],
  admin: [
    '/',
    '/home',
    '/student',
    '/event/view/[id]',
    '/event/active',
    '/event/inactive',
    '/event/add',
    '/event/edit/[id]',
    '/payments/declined',
    '/payments/accepted',
    '/register/[id]',
  ],
  student: ['/register/[id]', '/'],
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
  if (pathname === '/login') {
    return children;
  }

  if (isAllowed(pathname, userType) && userQuery.isFetched) {
    return (
      <UserContext.Provider value={{ user: userQuery.data }}>
        {children}
      </UserContext.Provider>
    );
  }

  if (userQuery.isFetching) {
    return <Loading />;
  }

  return <Unauthorized />;
}

const isAllowed = (
  pathname: string,
  userType: 'facilitator' | 'student' | 'admin' | 'cashier'
) => {
  const pathnameSplitted = pathname.split('/');
  for (const idx in allowedUrls[userType]) {
    const url = allowedUrls[userType][idx].replace('[id]', '');
    const urlSplitted = allowedUrls[userType][idx].split('/');

    if (
      pathname.includes(url) &&
      pathnameSplitted.length === urlSplitted.length
    ) {
      return true;
    }
  }
  return false;
};

export function useUser() {
  return useContext(UserContext);
}
