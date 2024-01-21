'use client';

import React, { useState } from 'react';

import PaymentsCard from '@/components/payments/PaymentsCard';
import Checkbox from '@/components/ui/Checkbox';
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
    <div className="flex flex-col p-16 gap-8">
      <div className="flex flex-row gap-8">
        <div
          onClick={
            listOfPayments.length === checkedCards.length &&
            listOfPayments.length !== 0
              ? unselectAllButtonAction
              : selectAllButtonAction
          }
          role="button"
          onKeyUp={() => {}}
          tabIndex={0}
          className="flex gap-2 cursor-pointer items-center"
        >
          <Checkbox
            checked={
              listOfPayments.length === checkedCards.length &&
              listOfPayments.length !== 0
            }
            onCheckedAction={() => {}}
          />
          <p>Select All</p>
        </div>
        <button>Restore All Selected</button>
      </div>
      <div className="flex gap-8 flex-wrap justify-center">
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
