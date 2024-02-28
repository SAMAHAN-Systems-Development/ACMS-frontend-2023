import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import EventPage from '@/components/event/EventPage';
import { fetchInactiveEvents } from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';
import Navigation from '@/components/ui/Navigation';

const PageFinal = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['events', 'inactive', { page: 1 }],
    queryFn: () => fetchInactiveEvents(user.accessToken, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation />
      <EventPage eventType="inactive" />
    </HydrationBoundary>
  );
};

export default PageFinal;
