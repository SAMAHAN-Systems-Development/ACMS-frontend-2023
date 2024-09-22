const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const fetchAcceptedPayments = async (
  token: string,
  page: number,
  studentNameSearch: string
) => {
  const response = await fetch(
    `${backendUrl}/payment/accepted?page=${page}&studentName=${studentNameSearch}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error in fetching the accepted payments');
  }

  const responseData = await response.json();
  const { acceptedPayments, maxPage } = responseData;

  return { payments: acceptedPayments, maxPage };
};

export const fetchDeclinedPayments = async (
  token: string,
  page: number,
  studentNameSearch: string
) => {
  const response = await fetch(
    `${backendUrl}/payment/declined?page=${page}&studentName=${studentNameSearch}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error in fetching the declined payments');
  }

  const responseData = await response.json();

  const { declinedPayments, maxPage } = responseData;

  return { payments: declinedPayments, maxPage };
};

export const fetchPendingPayments = async (
  token: string,
  page: number,
  studentNameSearch: string
) => {
  const response = await fetch(
    `${backendUrl}/payment/pending?page=${page}&studentName=${studentNameSearch}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error in fetching the pending payments');
  }

  const responseData = await response.json();
  const { pendingPayments, maxPage } = responseData;

  return { payments: pendingPayments, maxPage };
};

export const fetchPaymentsByEventId = async (
  token: string,
  page: number,
  studentNameSearch: string,
  eventId: number | null,
  paymentType: string
) => {
  const response = await fetch(
    `${backendUrl}/payment/${paymentType}/${
      eventId ?? ''
    }?page=${page}&studentName=${studentNameSearch}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error in fetching the pending payments');
  }

  const responseData = await response.json();
  const { maxPage, ...other } = responseData;
  const listOfPayments = other[Object.keys(other)[0]];

  return { payments: listOfPayments, maxPage };
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

export const acceptPayments = async (token: string, paymentIds: number[]) => {
  const response = await fetch(`${backendUrl}/payment/accept`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIds }),
  });

  if (!response.ok) {
    throw new Error('Error in accepting payments');
  }

  return true;
};

export const declinePayments = async (token: string, paymentIds: number[]) => {
  const response = await fetch(`${backendUrl}/payment/decline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentIds }),
  });

  if (!response.ok) {
    throw new Error('Error in declining payments');
  }

  return true;
};

export const fetchAcceptedEventPayments = async (
  token: string,
  page: number,
  eventId: number
) => {
  const response = await fetch(
    `${backendUrl}/payment/accepted/${eventId}?page=${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch accepted event payments.');
  }

  const responseData = await response.json();
  const { acceptedPayments, maxPage } = responseData;

  return { payments: acceptedPayments, maxPage };
};

export const fetchDeclinedEventPayments = async (
  token: string,
  page: number,
  eventId: number
) => {
  const response = await fetch(
    `${backendUrl}/payment/declined/${eventId}?page=${page}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch declined event payments.');
  }

  const responseData = await response.json();
  const { declinedPayments, maxPage } = responseData;

  return { payments: declinedPayments, maxPage };
};
