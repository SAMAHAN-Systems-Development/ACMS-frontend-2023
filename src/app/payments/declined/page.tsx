import React, { useEffect, useState } from 'react';

import PaymentsPage from '@/components/payments/PaymentsPage';

const PageFinal = () => {
  const backendUrl = process.env.BACKEND_URL;
  const [listOfDeclinedPayments, setListOfDeclinedPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      fetch(`${backendUrl}/payments/declined`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
          setListOfDeclinedPayments(data);
        })
        .catch((error) => error);
    };
    void fetchPayments();
  }, [backendUrl]);

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
      listOfAcceptedPayments={listOfDeclinedPayments}
      restoreButtonAction={restoreButtonAction}
    />
  );
};

export default PageFinal;
