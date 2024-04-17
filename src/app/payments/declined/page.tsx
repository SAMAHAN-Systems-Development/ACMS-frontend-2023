import React from 'react';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import PaymentsPage from '@/components/payments/PaymentsPage';
import Navigation from '@/components/ui/Navigation';
import { fetchDeclinedPayments } from '@/utilities/fetch/payment';
import { fetchUser } from '@/utilities/fetch/user';

const PageFinal = async () => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['payments', 'declined', { page: 1, studentNameSearch: '' }],
    queryFn: () => fetchDeclinedPayments(user.accessToken, 1, ''),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navigation />
      <PaymentsPage paymentPageType="declined" />
    </HydrationBoundary>
  );
};

export default PageFinal;
