'use client';

import React, { useState } from 'react';

import PaymentsCard from '@/components/payments/PaymentsCard';
import type Payment from '@/types/Payment';

type propTypes = {
  listOfPayments: Payment[];
  restoreButtonAction: ([]) => void;
};

const PaymentsPage: React.FC<propTypes> = ({
  listOfPayments,
  restoreButtonAction,
}) => {
  const [checkedCards, setCheckedCards] = useState<string[]>([]);

  const selectAllButtonAction = () => {
    setCheckedCards(listOfPayments.map((payment) => payment.id));
  };

  const unselectAllButtonAction = () => {
    setCheckedCards([]);
  };

  return (
    <div>
      <div className="flex flex-row gap-8">
        {listOfPayments.length === checkedCards.length &&
        listOfPayments.length !== 0 ? (
          <button onClick={unselectAllButtonAction}>Unselect All</button>
        ) : (
          <button onClick={selectAllButtonAction}>Select All</button>
        )}
        <button onClick={() => restoreButtonAction(checkedCards)}>
          Restore All Selected
        </button>
      </div>
      <div>
        {listOfPayments.map((payment: Payment) => (
          <PaymentsCard
            key={payment.id}
            eventPrice={payment.event.price}
            eventTitle={payment.event.title}
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
            studentName={`${payment.firstName} ${payment.lastName}`}
            paymentPhotoUrl={payment.payment.photo_src}
            checked={checkedCards.includes(payment.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
