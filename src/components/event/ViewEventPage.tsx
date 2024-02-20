'use client'

import React from 'react'
import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'

import PaymentsModal from '@/components/payments/PaymentsModal'
import Button from '@/components/ui/Button'
import StudentsTable from '@/components/ui/StudentsTable'
import { fetchEventData } from '@/utilities/fetch/event'

const DetailLine = ({ title, detail }: { detail: string; title: string }) => {
    return (
        <div className="flex justify-between text-sm">
            <p className="font-semibold w-1/3">{title}</p>
            <p className="w-2/3 ">{detail}</p>
        </div>
    )
}

const ViewEventPage = ({ id }: { id: string }) => {
    const tokenQuery = useQuery<string>({
        queryKey: ['jwt'],
    })

    const token = tokenQuery.data || ''

    const eventData = useQuery({
        queryKey: ['event'],
        queryFn: () => fetchEventData(token, id),
    })

    return (
        <>
            <section className="relative border-b-2 border-navyBlue w-full text-center py-10">
                <Link href={'/event/active'} className="absolute left-10">
                    <span
                        className="icon-[material-symbols--keyboard-arrow-left]"
                        style={{
                            width: '48px',
                            height: '48px',
                            color: '#181842',
                        }}
                        role="button"
                        onKeyUp={() => {}}
                        tabIndex={0}
                    />
                </Link>
                <h1 className="text-3xl font-bold  capitalize">
                    {eventData.data.title}
                </h1>
            </section>
            <section className="flex w-full my-10">
                <div className="border-2 border-navyBlue mx-auto rounded-2xl p-5 lg:w-1/3 sm:w-1/2 w-full">
                    <DetailLine
                        title={'Event Description'}
                        detail={eventData.data.description}
                    />
                    <DetailLine
                        title={'Event Date'}
                        detail={eventData.data.date}
                    />
                    <DetailLine
                        title={'Crowd Limit'}
                        detail={eventData.data.max_participants}
                    />
                    <DetailLine
                        title={'Students Registered'}
                        detail={eventData.data.students.length}
                    />
                    <DetailLine
                        title={'Event Price:'}
                        detail={eventData.data.price}
                    />
                    <div className="flex flex-col space-y-2 items-center mt-5">
                        <PaymentsModal
                            paymentType={'accepted'}
                            token={token}
                            eventId={eventData.data.id}
                        />
                        <PaymentsModal
                            paymentType={'declined'}
                            token={token}
                            eventId={eventData.data.id}
                        />
                        <Button text={'View Registration Form'} />
                    </div>
                </div>
            </section>
            <section className="md:w-4/5 w-96 mx-auto my-10">
                {eventData.isFetching ? (
                    <div className="flex justify-center">Loading...</div>
                ) : (
                    <StudentsTable list={eventData.data.students} />
                )}
            </section>
        </>
    )
}

export default ViewEventPage
