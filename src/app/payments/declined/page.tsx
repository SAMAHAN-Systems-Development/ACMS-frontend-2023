import PaymentsPage from '@/components/payments/PaymentsPage';
import type { Payment } from '@/types/types';

const PageFinal = async () => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  const response = await fetch(`${backendUrl}/payment/declined`, {
    method: 'GET',
  });
  const listOfDeclinedPayments: Payment[] = await response.json();

  return <PaymentsPage listOfPayments={listOfDeclinedPayments} />;
};

export default PageFinal;
