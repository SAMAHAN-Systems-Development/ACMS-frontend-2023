import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import QrScanPage from '@/components/event/QrScanPage';
import Navigation from '@/components/ui/Navigation';
import { fetchEventData } from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';

const FinalPage = async ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['events', eventId],
    queryFn: () => fetchEventData(user.accessToken, eventId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <div>
      <Navigation />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QrScanPage eventId={eventId} />
      </HydrationBoundary>
    </div>
  );
};

export default FinalPage;
