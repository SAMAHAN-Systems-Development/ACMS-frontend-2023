import React from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import type { Payment } from '@/types/types';
import {
  acceptPayments,
  declinePayments,
  restorePayments,
} from '@/utilities/fetch/payment';
import moneyFormatter from '@/utilities/moneyFormatter';

type propTypes = {
  page: number;
  payment: Payment;
  paymentPageType: 'accepted' | 'declined' | 'pending';
  checkedCards?: number[];
  hasAcceptButton?: boolean;
  hasCheckbox?: boolean;
  hasDeclineButton?: boolean;
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
  hasDeclineButton,
  hasAcceptButton,
}) => {
  const required_payment = payment.required_payment;
  const eventTitle = payment.event.title;
  const studentName = `${payment.student.firstName} ${payment.student.lastName}`;
  const paymentPhotoUrl = payment.photo_src;
  const eventTier = payment.eventTier.name;
  const studentEmail = payment.student.email;
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

  const acceptPaymentsMutation = useMutation({
    mutationFn: async () => {
      await acceptPayments(token, [payment.id]);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payments', paymentPageType, { page }],
        exact: true,
      });
      toast.success('Payment accepted successfully');
    },
  });

  const declinePaymentsMutation = useMutation({
    mutationFn: async () => {
      await declinePayments(token, [payment.id]);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payments', paymentPageType, { page }],
        exact: true,
      });
      toast.success('Payment declined successfully');
    },
  });

  const restoreButtonAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    restorePaymentsMutation.mutate();
  };

  const acceptButtonAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    acceptPaymentsMutation.mutate();
  };

  const declineButtonAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    declinePaymentsMutation.mutate();
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
      className="md:w-[24rem] w-[20rem] h-[46rem] cursor-pointer p-8 rounded-xl border-blue border-2 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      onClick={onCheckedAction}
      role="button"
      onKeyUp={onCheckedAction}
      tabIndex={0}
    >
      <div className="flex flex-col gap-4 max-h-full min-h-full">
        <div className="flex justify-between gap-12 items-start">
          <div className="flex flex-col items-start justify-start">
            <p className="font-body text-sm text-left font-bold">
              {`${eventTitle} (${eventTier})`}
            </p>
            <p className="text-sm text-left">{`${studentName} (${studentEmail})`}</p>
          </div>
          {hasCheckbox && (
            <Checkbox checked={checked} onCheckedAction={onCheckedAction} />
          )}
        </div>

        <div className="flex flex-col items-center justify-between flex-grow">
          <div className="flex flex-col gap-4">
            <p className="text-xl text-center font-bold">
              {moneyFormatter(required_payment)}
            </p>
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
          <div className="flex flex-row gap-4 justify-between w-full">
            {hasRestoreButton && (
              <div className="flex items-center justify-center my-3 w-full">
                <div className="w-[8rem]">
                  <Button onClick={restoreButtonAction}>Restore</Button>
                </div>
              </div>
            )}
            {hasAcceptButton && (
              <div className="flex items-center justify-center my-3 w-full">
                <div className="w-[8rem]">
                  <Button onClick={acceptButtonAction}>Accept</Button>
                </div>
              </div>
            )}
            {hasDeclineButton && (
              <div className="flex items-center justify-center my-3 w-full">
                <div className="w-[8rem]">
                  <Button onClick={declineButtonAction}>Decline</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
