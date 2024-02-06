const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const fetchAcceptedPayments = async (token: string, page: number) => {
  const response = await fetch(`${backendUrl}/payment/accepted?page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the accepted payments');
  }

  const responseData = await response.json();
  const { acceptedPayments, maxPage } = responseData;

  return { payments: acceptedPayments, maxPage };
};

export const fetchDeclinedPayments = async (token: string, page: number) => {
  const response = await fetch(`${backendUrl}/payment/declined?page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the declined payments');
  }

  const responseData = await response.json();

  const { declinedPayments, maxPage } = responseData;

  return { payments: declinedPayments, maxPage };
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
    throw new Error('Error in restoring payments');
  }

  return true;
};
