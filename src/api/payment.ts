import type { Payment } from '@/types/types';

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const fetchAcceptedPayments = async (token: string) => {
  const response = await fetch(`${backendUrl}/payment/accepted`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the accepted payments');
  }

  const listOfAcceptedPayments: Payment[] = await response.json();

  return listOfAcceptedPayments;
};

export const restorePayments = async (token: string, paymentIds: number[]) => {
  const response = await fetch(`${backendUrl}/payment/restore`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIds }),
  });

  if (!response.ok) {
    throw new Error('Error in fetching the accepted payments');
  }

  return true;
};
