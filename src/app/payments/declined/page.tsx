import { cookies } from 'next/headers';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import PaymentsPage from '@/components/payments/PaymentsPage';
import { fetchDeclinedPayments } from '@/utilities/fetch/payment';
import { fetchUser } from '@/utilities/fetch/user';

const PageFinal = async () => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['payments', 'declined', { page: 1 }],
    queryFn: () => fetchDeclinedPayments(user.accessToken, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentsPage paymentPageType="declined" />
    </HydrationBoundary>
  );
};

export default PageFinal;
