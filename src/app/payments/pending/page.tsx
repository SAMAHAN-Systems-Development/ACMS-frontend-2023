'use client';
import React, { useCallback, useEffect, useState } from 'react';

import PendingPaymentsPage from '@/components/payments/PendingPaymentsPage';

const Page = () => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const [listOfPendingPayments, setListOfPendingPayments] = useState([]);

  const getPendingPaymentStatus = useCallback(async () => {
    fetch(`${backendUrl}/payment/pending`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setListOfPendingPayments(data);
      })
      .catch((error) => error);
  }, [backendUrl]);

  useEffect(() => {
    void getPendingPaymentStatus();
  }, [getPendingPaymentStatus]);

  const acceptButtonAction = (ids: string[]) => {
    fetch(`${backendUrl}/payments/accept`, {
      method: 'PUT',
      body: JSON.stringify(ids),
    })
      .then((response) => response.json())
      .then((data) => {
        setListOfPendingPayments(data);
      })
      .catch((error) => error);
  };

  const declineButtonAction = (ids: string[]) => {
    fetch(`${backendUrl}/payments/decline`, {
      method: 'PUT',
      body: JSON.stringify(ids),
    })
      .then((response) => response.json())
      .then((data) => {
        setListOfPendingPayments(data);
      })
      .catch((error) => error);
  };

  return (
    <PendingPaymentsPage
      listOfPayments={listOfPendingPayments}
      acceptAllButtonAction={acceptButtonAction}
      declineAllButtonAction={declineButtonAction}
    />
  );
};

export default Page;
