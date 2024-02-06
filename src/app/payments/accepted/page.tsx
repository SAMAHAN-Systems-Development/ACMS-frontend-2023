'use server';
import { cookies } from 'next/headers';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchAcceptedPayments } from '@/utilities/fetch/payment';
import { fetchUser } from '@/utilities/fetch/user';
import PaymentsPage from '@/components/payments/PaymentsPage';

const PageFinal = async () => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ['payments', 'accepted', { page: 1 }],
    queryFn: () => fetchAcceptedPayments(user.accessToken, 1),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return (
    <div className="flex flex-col p-16 gap-8">
      <h1 className="text-5xl text-navyBlue font-extrabold">
        Accepted Payments
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaymentsPage paymentPageType="accepted" />
      </HydrationBoundary>
    </div>
  );
};

export default PageFinal;
