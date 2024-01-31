import { cookies } from 'next/headers';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchDeclinedPayments } from '@/api/payment';
import { fetchUser } from '@/api/user';
import PaymentsPage from '@/components/payments/PaymentsPage';

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
    <div className="flex flex-col p-16 gap-8">
      <h1 className="text-5xl text-navyBlue font-extrabold">
        Declined Payments
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaymentsPage paymentPageType="declined" />
      </HydrationBoundary>
    </div>
  );
};

export default PageFinal;
