import React from 'react';
import Image from 'next/image';

import axios from 'axios';

import Checkbox from '@/components/ui/Checkbox';
import type { Payment } from '@/types/types';

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
      className="w-[24rem] h-[44rem] cursor-pointer p-8 rounded-xl shadow-[2px_0px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      onClick={onCheckedAction}
      role="button"
      onKeyUp={onCheckedAction}
      tabIndex={0}
    >
      <div className="flex flex-col gap-4 max-h-full min-h-full">
        <div className="flex justify-between gap-12 items-start">
          <div className="flex flex-col items-start justify-start">
            <p className="font-body text-lg text-left font-bold">
              {eventTitle}
            </p>
            <p className="text-sm text-left">{studentName}</p>
          </div>
          {hasCheckbox && (
            <Checkbox checked={checked} onCheckedAction={onCheckedAction} />
          )}
        </div>

        <div className="flex flex-col items-center justify-between flex-grow">
          <div className="flex flex-col gap-4">
            <p className="text-md text-center font-bold">{eventPrice}</p>
            <div className="flex items-center justify-center">
              <Image
                className="object-cover"
                src={paymentPhotoUrl || '/placeholderImage.jpg'}
                alt="Payment Photo"
                width={200}
                height={200}
              />
            </div>
          </div>
          {hasRestoreButton && (
            <div className="flex items-center justify-end my-3">
              <button
                id="restore-button"
                onClick={restoreButtonAction}
                className="px-4 py-2 text-sm font-bold text-white bg-navyBlue rounded-md"
              >
                Restore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
