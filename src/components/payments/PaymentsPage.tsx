'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PaymentButton from '@/components/payments/PaymentButton';
import PaymentsCard from '@/components/payments/PaymentsCard';
import Checkbox from '@/components/ui/Checkbox';
import Pagination from '@/components/ui/Pagination';
import type { Payment } from '@/types/types';
import {
  acceptPayments,
  declinePayments,
  fetchAcceptedPayments,
  fetchDeclinedPayments,
  fetchPendingPayments,
  restorePayments,
} from '@/utilities/fetch/payment';

type propTypes = {
  paymentPageType: 'accepted' | 'declined' | 'pending';
};

const PaymentsPage: React.FC<propTypes> = ({ paymentPageType }) => {
  const paymentPageTitle = getPaymentTitle(paymentPageType);
  const [checkedCards, setCheckedCards] = useState<number[]>([]);
  const { push } = useRouter();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    upperButtonLabel,
    lowerButtonLabel,
    upperButtonLocation,
    lowerButtonLocation,
  } = getRedirectButtonProperties(paymentPageType);

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const queryFn = () => {
    if (paymentPageType === 'accepted') {
      return fetchAcceptedPayments(token, page);
    }

    if (paymentPageType === 'pending') {
      return fetchPendingPayments(token, page);
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

  const acceptAllSelectedMutation = useMutation({
    mutationFn: async () => {
      await acceptPayments(token, checkedCards);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payments', paymentPageType, { page }],
        exact: true,
      });
      toast.success('Payments accepted successfully');
      setCheckedCards([]);
    },
  });

  const declineAllSelectedMutation = useMutation({
    mutationFn: async () => {
      await declinePayments(token, checkedCards);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['payments', paymentPageType, { page }],
        exact: true,
      });
      toast.success('Payments declined successfully');
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

  const acceptAllButtonAction = () => {
    if (checkedCards.length === 0) {
      toast.error('No payments selected');
      return;
    }

    acceptAllSelectedMutation.mutate();
  };

  const declineAllButtonAction = () => {
    if (checkedCards.length === 0) {
      toast.error('No payments selected');
      return;
    }

    declineAllSelectedMutation.mutate();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row border-b-2 w-full">
        <div className="flex flex-col gap-4 p-12">
          <h1 className="text-5xl text-navyBlue font-extrabold">
            {paymentPageTitle}
          </h1>
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
            <p className="pt-1 text-navyBlue font-medium text-md">Select All</p>
          </div>
          <div className="flex flex-row gap-4">
            {(paymentPageType === 'accepted' ||
              paymentPageType === 'declined') && (
              <PaymentButton onClick={restoreAllButtonAction}>
                RESTORE SELECTED
              </PaymentButton>
            )}

            {paymentPageType === 'pending' && (
              <PaymentButton onClick={acceptAllButtonAction}>
                ACCEPT SELECTED
              </PaymentButton>
            )}
            {paymentPageType === 'pending' && (
              <PaymentButton onClick={declineAllButtonAction}>
                DECLINE SELECTED
              </PaymentButton>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-grow items-end p-16">
          <PaymentButton
            onClick={() => {
              push(upperButtonLocation);
            }}
          >
            {upperButtonLabel}
          </PaymentButton>
          <PaymentButton
            onClick={() => {
              push(lowerButtonLocation);
            }}
          >
            {lowerButtonLabel}
          </PaymentButton>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-wrap justify-center px-16 pb-16">
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          {listOfPayments.map((payment: Payment, index: number) => (
            <PaymentsCard
              key={payment.id + index}
              hasRestoreButton={
                paymentPageType === 'accepted' || paymentPageType === 'declined'
              }
              hasAcceptButton={paymentPageType === 'pending'}
              hasDeclineButton={paymentPageType === 'pending'}
              hasCheckbox={true}
              checkedCards={checkedCards}
              setCheckedCards={setCheckedCards}
              payment={payment}
              paymentPageType={paymentPageType}
              page={page}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
      </div>
    </div>
  );
};

const getPaymentTitle = (paymentPageType: string) => {
  switch (paymentPageType) {
    case 'accepted':
      return 'Accepted Payments';
    case 'declined':
      return 'Declined Payments';
    case 'pending':
      return 'Pending Payments';
    default:
      return 'Accepted Payments';
  }
};

const getRedirectButtonProperties = (paymentPageType: string) => {
  switch (paymentPageType) {
    case 'accepted':
      return {
        upperButtonLabel: 'View Pending Payments',
        lowerButtonLabel: 'View Declined Payments',
        upperButtonLocation: '/payments/pending',
        lowerButtonLocation: '/payments/declined',
      };
    case 'declined':
      return {
        upperButtonLabel: 'View Pending Payments',
        lowerButtonLabel: 'View Accepted Payments',
        upperButtonLocation: '/payments/pending',
        lowerButtonLocation: '/payments/accepted',
      };
    case 'pending':
      return {
        upperButtonLabel: 'View Declined Payments',
        lowerButtonLabel: 'View Accepted Payments',
        upperButtonLocation: '/payments/declined',
        lowerButtonLocation: '/payments/accepted',
      };
    default:
      return {
        upperButtonLabel: 'View Accepted Payments',
        lowerButtonLabel: 'View Declined Payments',
        upperButtonLocation: '/payments/accepted',
        lowerButtonLocation: '/payments/declined',
      };
  }
};

export default PaymentsPage;
