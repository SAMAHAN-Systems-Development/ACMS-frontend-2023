import React from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PaymentButton from '@/components/payments/PaymentButton';
import Checkbox from '@/components/ui/Checkbox';
import type { Payment } from '@/types/types';
import { restorePayments } from '@/utilities/fetch/payment';

type propTypes = {
  page: number;
  payment: Payment;
  paymentPageType: 'accepted' | 'declined';
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
  paymentPageType,
  page,
}) => {
  const eventPrice = payment.event.price;
  const eventTitle = payment.event.title;
  const studentName = `${payment.firstName} ${payment.lastName}`;
  const paymentPhotoUrl = payment.payment.photo_src;
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';
  const queryClient = useQueryClient();

  const restorePaymentsMutation = useMutation({
    mutationFn: async () => {
      await restorePayments(token, [payment.id]);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payments', paymentPageType, { page }],
        exact: true,
      });
      toast.success('Payment restored successfully');
    },
  });

  const restoreButtonAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    restorePaymentsMutation.mutate();
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
      className="w-[24rem] h-[44rem] cursor-pointer p-8 rounded-xl border-blue border-2 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      onClick={onCheckedAction}
      role="button"
      onKeyUp={onCheckedAction}
      tabIndex={0}
    >
      <div className="flex flex-col gap-4 max-h-full min-h-full">
        <div className="flex justify-between gap-12 items-start">
          <div className="flex flex-col items-start justify-start">
            <p className="font-body text-sm text-left font-bold">
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
            <p className="text-xl text-center font-bold">{eventPrice}</p>
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
            <div className="flex items-center justify-center my-3 w-full">
              <PaymentButton onClick={restoreButtonAction}>
                Restore
              </PaymentButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
