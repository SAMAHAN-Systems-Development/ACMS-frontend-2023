'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  fetchAcceptedPayments,
  fetchDeclinedPayments,
  restorePayments,
} from '@/api/payment';
import PaymentsCard from '@/components/payments/PaymentsCard';
import Checkbox from '@/components/ui/Checkbox';
import Pagination from '@/components/ui/Pagination';
import type { Payment } from '@/types/types';

type propTypes = {
  paymentPageType: 'accepted' | 'declined';
};

const PaymentsPage: React.FC<propTypes> = ({ paymentPageType }) => {
  const [checkedCards, setCheckedCards] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const queryFn = () => {
    if (paymentPageType === 'accepted') {
      return fetchAcceptedPayments(token, page);
    }

    return fetchDeclinedPayments(token, page);
  };

  const paymentsQuery = useQuery<{ maxPage: number; payments: Payment[] }>({
    queryKey: ['payments', paymentPageType, { page }],
    queryFn: queryFn,
  });

  const { payments: listOfPayments, maxPage } = paymentsQuery.data || {
    payments: [],
    maxPage: 1,
  };

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
        queryKey: ['payments', paymentPageType, { page }],
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
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
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
      <div className="flex justify-center">
        <Pagination page={page} setPage={setPage} maxPage={maxPage} />
      </div>
    </div>
  );
};

export default PaymentsPage;
