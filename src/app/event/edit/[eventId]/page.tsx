import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import EditEventPage from '@/components/event/EditEventPage';
import Navigation from '@/components/ui/Navigation';
import { fetchEventData } from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';

const FinalPage = async ({ params }: { params: { eventId: string } }) => {
  const { eventId } = params;

  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEventData(user.accessToken, eventId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation />
      <EditEventPage eventId={eventId} />
    </HydrationBoundary>
  );
};

export default FinalPage;
