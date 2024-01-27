import { cookies } from 'next/headers';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchAcceptedPayments } from '@/api/payment';
import PaymentsPage from '@/components/payments/PaymentsPage';

const PageFinal = async () => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const token = cookieStore.get('json-web-token') || { value: '' };
  await queryClient.prefetchQuery({
    queryKey: ['payments', 'accepted'],
    queryFn: () => fetchAcceptedPayments(token.value),
  });

  const listOfAcceptedPayments = await fetchAcceptedPayments(token.value);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PaymentsPage listOfPayments={listOfAcceptedPayments} />
    </HydrationBoundary>
  );
};

export default PageFinal;
