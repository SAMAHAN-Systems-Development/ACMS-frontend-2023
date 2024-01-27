'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

import {
  fetchAcceptedPayments,
  fetchDeclinedPayments,
  restorePayments,
} from '@/api/payment';
import PaymentsCard from '@/components/payments/PaymentsCard';
import Checkbox from '@/components/ui/Checkbox';
import type { Payment } from '@/types/types';

type propTypes = {
  paymentPageType: 'accepted' | 'declined';
};

const PaymentsPage: React.FC<propTypes> = ({ paymentPageType }) => {
  const [checkedCards, setCheckedCards] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const token = getCookie('json-web-token') || '';

  const queryFn = () => {
    if (paymentPageType === 'accepted') {
      return fetchAcceptedPayments(token);
    }

    return fetchDeclinedPayments(token);
  };

  const paymentsQuery = useQuery<Payment[]>({
    queryKey: ['payments', paymentPageType],
    queryFn: queryFn,
  });

  const listOfPayments: Payment[] = paymentsQuery.data || [];

  const selectAllButtonAction = () => {
    setCheckedCards(listOfPayments.map((payment) => payment.id));
  };

  const unselectAllButtonAction = () => {
    setCheckedCards([]);
  };

  const restoreAllSelectedMutation = useMutation({
    mutationFn: async () => {
      await restorePayments(token, checkedCards);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payments', paymentPageType],
        exact: true,
      });
      toast.success('Payments restored successfully');
      setCheckedCards([]);
    },
  });

  const restoreAllButtonAction = () => {
    if (checkedCards.length === 0) {
      toast.error('No payments selected');
      return;
    }

    restoreAllSelectedMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-8">
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
        <button
          className="px-4 py-2 text-sm font-bold text-white bg-navyBlue rounded-md"
          onClick={restoreAllButtonAction}
        >
          Restore All Selected
        </button>
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
            paymentPageType={paymentPageType}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentsPage;
