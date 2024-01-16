'use client';
import { createContext, useContext, useEffect, useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

export const UserContext = createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();
  const backendUrl =
    process.env.NEXT_APP_BACKEND_URL || 'http://localhost:3000';

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
        .then((res: any) => {
          setUser(res.data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };
    void updateUser();
  }, [backendUrl, supabase.auth]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
