'use server';
import { cookies } from 'next/headers';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import PaymentsPage from '@/components/payments/PaymentsPage';
import { fetchPendingPayments } from '@/utilities/fetch/payment';
import { fetchUser } from '@/utilities/fetch/user';

const PageFinal = async () => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['payments', 'pending', { page: 1 }],
    queryFn: () => fetchPendingPayments(user.accessToken, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentsPage paymentPageType="pending" />
    </HydrationBoundary>
  );
};

export default PageFinal;
