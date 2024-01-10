'use client';

import React, { useState } from 'react';

import PaymentsCard from '@/components/payments/PaymentsCard';
import type Payment from '@/types/Payment';

type propTypes = {
  listOfAcceptedPayments: Payment[];
  restoreButtonAction: ([]) => void;
};

const PaymentsPage: React.FC<propTypes> = ({
  listOfAcceptedPayments,
  restoreButtonAction,
}) => {
  const [checkedCards, setCheckedCards] = useState<string[]>([]);

  const selectAllButtonAction = () => {
    setCheckedCards(listOfAcceptedPayments.map((payment) => payment.id));
  };

  const unselectAllButtonAction = () => {
    setCheckedCards([]);
  };

  return (
    <div>
      <div className="flex flex-row gap-8">
        {listOfAcceptedPayments.length === checkedCards.length ? (
          <button onClick={unselectAllButtonAction}>Unselect All</button>
        ) : (
          <button onClick={selectAllButtonAction}>Select All</button>
        )}
        <button onClick={() => restoreButtonAction(checkedCards)}>
          Restore All Selected
        </button>
      </div>
      <div>
        {listOfAcceptedPayments.map((payment: Payment) => (
          <PaymentsCard
            key={payment.id}
            eventPrice={payment.eventPrice}
            eventTitle={payment.eventTitle}
            onCheckedAction={() => {
              if (checkedCards.includes(payment.id)) {
                setCheckedCards(
                  checkedCards.filter(
                    (checkedCard) => checkedCard !== payment.id
                  )
                );
              } else {
                setCheckedCards([...checkedCards, payment.id]);
              }
            }}
            restoreButtonAction={() => restoreButtonAction([payment.id])}
            studentName={payment.studentName}
            paymentPhotoUrl={payment.paymentPhotoUrl}
            checked={checkedCards.includes(payment.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
