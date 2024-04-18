import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import ViewEventPage from '@/components/event/ViewEventPage';
import Navigation from '@/components/ui/Navigation';
import { fetchEventData } from '@/utilities/fetch/event';
import {
  fetchAcceptedEventPayments,
  fetchDeclinedEventPayments,
} from '@/utilities/fetch/payment';
import { fetchUser } from '@/utilities/fetch/user';

const EventsPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['event', params.id],
    queryFn: () =>
      fetchEventData(user.accessToken, params.id, {
        studentItems: 10,
        studentPage: 1,
        studentSearchValue: '',
      }),
  });

  await queryClient.prefetchQuery({
    queryKey: ['acceptedEventPayments'],
    queryFn: () =>
      fetchAcceptedEventPayments(user.accessToken, 1, Number(params.id)),
  });

  await queryClient.prefetchQuery({
    queryKey: ['declinedEventPayments'],
    queryFn: () =>
      fetchDeclinedEventPayments(user.accessToken, 1, Number(params.id)),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation />
      <ViewEventPage id={params.id} />
    </HydrationBoundary>
  );
};

export default EventsPage;
