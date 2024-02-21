'use client';

import React, { useCallback, useEffect, useState } from 'react';

import PaymentsPage from '@/components/payments/PaymentsPage';
import type Payment from '@/types/Payment';

const PageFinal = () => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const [listOfDeclinedPayments, setListOfDeclinedPayments] = useState<
    Payment[]
  >([]);

  const fetchPayments = useCallback(async () => {
    fetch(`${backendUrl}/payment/declined`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setListOfDeclinedPayments(data);
      })
      .catch((error) => error);
  }, [backendUrl]);

  useEffect(() => {
    void fetchPayments();
  }, [fetchPayments]);

  const restoreButtonAction = (ids: string[]) => {
    fetch(`${backendUrl}/payments/restore`, {
      method: 'POST',
      body: JSON.stringify(ids),
    })
      .then((response) => response.json())
      .then((data) => {
        setListOfDeclinedPayments(data);
      })
      .catch((error) => error);
  };

  return (
    <PaymentsPage
      listOfPayments={listOfDeclinedPayments}
      restoreButtonAction={restoreButtonAction}
    />
  );
};

export default PageFinal;
