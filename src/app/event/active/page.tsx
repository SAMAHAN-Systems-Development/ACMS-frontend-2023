import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import EventPage from '@/components/event/EventPage';
import { fetchActiveEvents } from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';

const PageFinal = async () => {
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventPage />
    </HydrationBoundary>
  );
};

export default PageFinal;
