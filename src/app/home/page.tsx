import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import CashierHomePage from '@/components/home/CashierHomePage';
import FacilitatorHomePage from '@/components/home/FacilitatorHomePage';
import {
  fetchActiveEvents,
  fetchAllActiveTitleEvents,
} from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';
import Navigation from '@/components/ui/Navigation';

const Home = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['events', 'active', { page: 1 }],
    queryFn: () => fetchActiveEvents(user.accessToken, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  await queryClient.prefetchQuery({
    queryKey: ['events', 'active', 'all', 'title'],
    queryFn: () => fetchAllActiveTitleEvents(user.accessToken),
  });

  if (user.userType === 'facilitator') {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Navigation />
        <FacilitatorHomePage />
      </HydrationBoundary>
    );
  }

  if (user.userType === 'cashier') {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Navigation />
        <CashierHomePage />
      </HydrationBoundary>
    );
  }

  return <Navigation />;
};

export default Home;
