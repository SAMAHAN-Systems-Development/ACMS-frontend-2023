'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PaymentsCard from '@/components/payments/PaymentsCard';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Pagination from '@/components/ui/Pagination';
import type { Student } from '@/types/types';
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

  const paymentsQuery = useQuery<{ maxPage: number; payments: Student[] }>({
    queryKey: ['payments', paymentPageType, { page }],
    queryFn: queryFn,
  });

  const { payments: listOfStudents, maxPage } = paymentsQuery.data || {
    payments: [],
    maxPage: 1,
  };

  const selectAllButtonAction = () => {
    setCheckedCards(listOfStudents.map((student) => student.paymentId));
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
        <div className="flex flex-col gap-4 md:p-12 p-2">
          <h1 className="md:text-5xl text-3xl text-navyBlue font-extrabold">
            {paymentPageTitle}
          </h1>
          <div className="flex flex-col gap-4">
            <div
              onClick={
                listOfStudents.length === checkedCards.length &&
                listOfStudents.length !== 0
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
                  listOfStudents.length === checkedCards.length &&
                  listOfStudents.length !== 0
                }
                onCheckedAction={() => {}}
              />
              <p className="pt-1 text-navyBlue font-medium text-md">
                Select All
              </p>
            </div>
            <div className="flex flex-row gap-4">
              {(paymentPageType === 'accepted' ||
                paymentPageType === 'declined') && (
                <div>
                  <Button onClick={restoreAllButtonAction}>
                    RESTORE SELECTED
                  </Button>
                </div>
              )}

              {paymentPageType === 'pending' && (
                <div>
                  <Button onClick={acceptAllButtonAction}>
                    ACCEPT SELECTED
                  </Button>
                </div>
              )}
              {paymentPageType === 'pending' && (
                <div>
                  <Button onClick={declineAllButtonAction}>
                    DECLINE SELECTED
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-grow items-end md:p-16 p-2">
          <div>
            <Button
              onClick={() => {
                push(upperButtonLocation);
              }}
            >
              {upperButtonLabel}
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                push(lowerButtonLocation);
              }}
            >
              {lowerButtonLabel}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-wrap justify-center items-center md:px-16 md:pb-16 px-4 pb-4">
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
        {listOfStudents.length > 0 ? (
          <>
            <div className="flex gap-8 flex-wrap justify-center">
              {listOfStudents.map((student: Student, index: number) => (
                <PaymentsCard
                  key={student.paymentId + index}
                  hasRestoreButton={
                    paymentPageType === 'accepted' ||
                    paymentPageType === 'declined'
                  }
                  hasAcceptButton={paymentPageType === 'pending'}
                  hasDeclineButton={paymentPageType === 'pending'}
                  hasCheckbox={true}
                  checkedCards={checkedCards}
                  setCheckedCards={setCheckedCards}
                  student={student}
                  paymentPageType={paymentPageType}
                  page={page}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination page={page} setPage={setPage} maxPage={maxPage} />
            </div>
          </>
        ) : (
          <h1 className="text-3xl text-navyBlue font-extrabold">
            No payments found
          </h1>
        )}
      </div>
    </div>
  );
};

const getPaymentTitle = (paymentPageType: string) => {
  switch (paymentPageType) {
    case 'accepted':
      return 'ACCEPTED PAYMENTS';
    case 'declined':
      return 'DECLINED PAYMENTS';
    case 'pending':
      return 'PENDING PAYMENT VERIFICATIONS';
    default:
      return 'ACCEPTED PAYMENTS';
  }
};

const getRedirectButtonProperties = (paymentPageType: string) => {
  switch (paymentPageType) {
    case 'accepted':
      return {
        upperButtonLabel: 'View Pending Payments',
        lowerButtonLabel: 'View Declined Payments',
        upperButtonLocation: '/home',
        lowerButtonLocation: '/payments/declined',
      };
    case 'declined':
      return {
        upperButtonLabel: 'View Pending Payments',
        lowerButtonLabel: 'View Accepted Payments',
        upperButtonLocation: '/home',
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
