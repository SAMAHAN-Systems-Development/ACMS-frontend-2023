'use client'

import type { FC } from 'react'
import React, { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'

import ModalWrapper from '@/components/ui/ModalWrapper'

import PaymentsCard from '@/components/payments/PaymentsCard'
import Button from '@/components/ui/Button'
import Pagination from '@/components/ui/Pagination'
import type { Payment } from '@/types/types'
import {
    fetchAcceptedEventPayments,
    fetchDeclinedEventPayments,
} from '@/utilities/fetch/payment'

type PaymentsModalProps = {
    eventId: number
    paymentType: string
    token: string
}

const PaymentsModal: FC<PaymentsModalProps> = ({
    paymentType,
    token,
    eventId,
}) => {
    const [page, setPage] = useState(1)

    const queryFn = () => {
        if (paymentType === 'accepted') {
            return fetchAcceptedEventPayments(token, page, eventId)
        }

        return fetchDeclinedEventPayments(token, page, eventId)
    }

    const paymentQuery = useQuery({
        queryKey: [`${paymentType}EventPayments`],
        queryFn: queryFn,
    })

    const isEmpty =
        paymentQuery.data?.payments && paymentQuery.data.payments.length == 0

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <div className="w-fit">
                    <Button text={`View ${paymentType} payments`} />
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <ModalWrapper>
                    <div className={`bg-white p-5 ${isEmpty && 'h-full'}`}>
                        <div className="sticky top-0 bg-white/85 py-2">
                            <p className="capitalize  text-xl font-bold text-center">
                                {paymentType} payments
                            </p>
                            {!isEmpty && (
                                <Pagination
                                    maxPage={paymentQuery.data?.maxPage}
                                    page={page}
                                    setPage={setPage}
                                />
                            )}
                        </div>
                        {!isEmpty ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {paymentQuery.data?.payments?.map(
                                    (payment: Payment) => (
                                        <div
                                            key={payment.id}
                                            className="cols-1 mx-auto py-2"
                                        >
                                            <PaymentsCard
                                                payment={payment}
                                                page={1}
                                                paymentPageType="accepted"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="text-center">No payments.</div>
                        )}
                    </div>
                </ModalWrapper>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default PaymentsModal
