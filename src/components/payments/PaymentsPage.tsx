'use client';

import React, { useState } from 'react';

import PaymentsCard from '@/components/payments/PaymentsCard';
import type { Payment } from '@/types/types';

type propTypes = {
  listOfPayments: Payment[];
};

const PaymentsPage: React.FC<propTypes> = ({ listOfPayments }) => {
  const [checkedCards, setCheckedCards] = useState<number[]>([]);

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
        <button>Restore All Selected</button>
      </div>
      <div className="flex gap-8 flex-wrap">
        {listOfPayments.map((payment: Payment, index: number) => (
          <PaymentsCard
            key={payment.id + index}
            hasRestoreButton={true}
            hasCheckbox={true}
            checkedCards={checkedCards}
            setCheckedCards={setCheckedCards}
            payment={payment}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
