'use client';

import type { FC } from 'react';
import React, { useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';

import ModalWrapper from '@/components/ui/ModalWrapper';

import PaymentsCard from '@/components/payments/PaymentsCard';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import type { Payment } from '@/types/types';
import {
  fetchAcceptedEventPayments,
  fetchDeclinedEventPayments,
} from '@/utilities/fetch/payment';

type PaymentsModalProps = {
  eventId: number;
  paymentType: string;
  token: string;
};

const PaymentsModal: FC<PaymentsModalProps> = ({
  paymentType,
  token,
  eventId,
}) => {
  const [page, setPage] = useState(1);

  const queryFn = () => {
    if (paymentType === 'accepted') {
      return fetchAcceptedEventPayments(token, page, eventId);
    }

    return fetchDeclinedEventPayments(token, page, eventId);
  };

  const paymentsQuery = useQuery({
    queryKey: [`${paymentType}EventPayments`],
    queryFn: queryFn,
  });

  const isEmpty =
    paymentsQuery.data?.payments && paymentsQuery.data.payments.length == 0;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">
        <div
          className={`w-full px-4 py-1 text-slate-50 font-semibold rounded-lg text-sm  transition-colors duration-200 ease-in-out bg-brown text-white hover:bg-goldenBrown`}
        >{`View ${paymentType} Payments`}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <ModalWrapper>
          <div className="w-full h-full flex flex-col items-center gap-8 bg-white p-4 relative">
            <div className="absolute top-0 right-0 m-2">
              <Dialog.Close>
                <span
                  className="icon-[material-symbols--close-rounded]"
                  style={{
                    width: '40px',
                    height: '40px',
                    color: '#181842',
                  }}
                />
              </Dialog.Close>
            </div>

            <div className="sticky top-0 bg-white/85 py-2">
              <p className="capitalize  text-xl font-bold text-center">
                {paymentType} payments
              </p>
              {!isEmpty && (
                <Pagination
                  maxPage={paymentsQuery.data?.maxPage}
                  page={page}
                  setPage={setPage}
                />
              )}
            </div>
            {!isEmpty ? (
              <div className="flex flex-row gap-4 flex-wrap justify-center items-center">
                {paymentsQuery.data?.payments?.map((payment: Payment) => (
                  <div key={payment.id} className="cols-1 mx-auto py-2">
                    <PaymentsCard
                      payment={payment}
                      page={1}
                      paymentPageType="accepted"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">No payments.</div>
            )}
          </div>
        </ModalWrapper>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PaymentsModal;
