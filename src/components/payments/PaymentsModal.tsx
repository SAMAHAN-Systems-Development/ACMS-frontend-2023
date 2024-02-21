'use client';

import type { FC } from 'react';
import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import ModalWrapper from '@/components/ui/ModalWrapper';

import PaymentsCard from '@/components/payments/PaymentsCard';
import Button from '@/components/ui/Button';
import type { Payment } from '@/types/types';

type PaymentsModalProps = {
  listOfPayments: Payment[];
  type: string;
};

const PaymentsModal: FC<PaymentsModalProps> = ({ listOfPayments, type }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="w-fit">
          <Button text={`View ${type} payments`} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <ModalWrapper>
          <div className="bg-white p-5">
            <div className="sticky top-0 bg-white/85 py-8">
              <p className="capitalize  text-xl font-bold text-center">
                {type} payments
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {listOfPayments.map((payment: Payment) => (
                <PaymentsCard
                  key={payment.id}
                  eventPrice={payment.event.price}
                  eventTitle={payment.event.title}
                  studentName={`${payment.firstName} ${payment.lastName}`}
                  paymentPhotoUrl={payment.payment.photo_src}
                />
              ))}
            </div>
          </div>
        </ModalWrapper>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PaymentsModal;
