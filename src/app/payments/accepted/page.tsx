import { cookies } from 'next/headers';

import PaymentsPage from '@/components/payments/PaymentsPage';
import type { Payment } from '@/types/types';

const PageFinal = async () => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  const cookieStore = cookies();
  const token = cookieStore.get('json-web-token') || { value: '' };

  // console.log(token.value)

  const response = await fetch(`${backendUrl}/payment/accepted`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the accepted payments');
  }

  const listOfAcceptedPayments: Payment[] = await response.json();

  return <PaymentsPage listOfPayments={listOfAcceptedPayments} />;
};

export default PageFinal;
