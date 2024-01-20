import React from 'react';
import Image from 'next/image';

import axios from 'axios';

import { type Payment } from '@/types/types';

type propTypes = {
  payment: Payment;
  checkedCards?: number[];
  hasCheckbox?: boolean;
  hasRestoreButton?: boolean;
  setCheckedCards?: React.Dispatch<React.SetStateAction<number[]>>;
};

const PaymentsCard: React.FC<propTypes> = ({
  hasRestoreButton,
  hasCheckbox,
  checkedCards,
  payment,
  setCheckedCards,
}) => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const eventPrice = payment.event.price;
  const eventTitle = payment.event.title;
  const studentName = `${payment.firstName} ${payment.lastName}`;
  const paymentPhotoUrl = payment.payment.photo_src;
  const restoreButtonAction = async (event: React.MouseEvent) => {
    event.stopPropagation();
    await axios.post(`${backendUrl}/payment/restore`, {
      paymentIds: [payment.id],
    });
  };

  let checked = false;
  let onCheckedAction = () => {};
  if (checkedCards && setCheckedCards) {
    checked = checkedCards.includes(payment.id);
    onCheckedAction = () => {
      if (checkedCards.includes(payment.id)) {
        setCheckedCards(
          checkedCards.filter((checkedCard) => checkedCard !== payment.id)
        );
      } else {
        setCheckedCards([...checkedCards, payment.id]);
      }
    };
  }

  return (
    <div
      className={`border-4 w-60 cursor-pointer`}
      onClick={onCheckedAction}
      role="button"
      onKeyUp={onCheckedAction}
      tabIndex={0}
    >
      {hasCheckbox && (
        <input type="checkbox" checked={checked} onChange={onCheckedAction} />
      )}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center h-20">
          <Image
            className="object-cover w-20 h-20 rounded-full"
            src={paymentPhotoUrl || '/placeholderImage.jpg'}
            alt="Payment Photo"
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg font-bold text-center">{eventTitle}</div>
          <div className="text-sm text-center">{studentName}</div>
          <div className="text-sm text-center">{eventPrice}</div>
        </div>
        {hasRestoreButton && (
          <div className="flex items-center justify-center my-3">
            <button
              id="restore-button"
              onClick={restoreButtonAction}
              className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full"
            >
              Restore
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsCard;
