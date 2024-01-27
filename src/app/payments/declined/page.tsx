import { cookies } from 'next/headers';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchDeclinedPayments } from '@/api/payment';
import PaymentsPage from '@/components/payments/PaymentsPage';

const PageFinal = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = cookieStore.get('json-web-token') || { value: '' };
  await queryClient.prefetchQuery({
    queryKey: ['payments', 'declined'],
    queryFn: () => fetchDeclinedPayments(token.value),
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
