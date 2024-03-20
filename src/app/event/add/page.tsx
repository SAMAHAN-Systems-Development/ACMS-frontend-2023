import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import AddEventPage from '@/components/event/AddEventPage';
import Navigation from '@/components/ui/Navigation';
import { fetchEventTiers } from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';

const FinalPage = async () => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['event-tiers'],
    queryFn: () => fetchEventTiers(user.accessToken),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation />
      <AddEventPage />
    </HydrationBoundary>
  );
};

export default FinalPage;
