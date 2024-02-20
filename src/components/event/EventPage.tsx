'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import EventCard from '@/components/event/EventCard';
import PaymentButton from '@/components/payments/PaymentButton';
import Pagination from '@/components/ui/Pagination';
import type { Event } from '@/types/types';
import { fetchActiveEvents } from '@/utilities/fetch/event';

const EventPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const paymentsQuery = useQuery<{ events: Event[]; maxPage: number }>({
    queryKey: ['payments', 'active', { page }],
    queryFn: () => fetchActiveEvents(token, page),
  });

  const { events: listOfEvents, maxPage } = paymentsQuery.data || {
    events: [],
    maxPage: 1,
  };

  const viewInactivatedButtonOnClick = () => {
    router.push('/events/inactive');
  };

  const addEventButtonOnClick = () => {
    router.push('/events/add');
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col border-b-2 w-full">
        <div className="flex flex-row gap-4 p-12 justify-between">
          <h1 className="text-5xl text-navyBlue font-extrabold">
            List of Active Events
          </h1>
          <div className="flex gap-2 cursor-pointer items-center">
            <PaymentButton onClick={viewInactivatedButtonOnClick}>
              View Inactivated
            </PaymentButton>
            <PaymentButton onClick={addEventButtonOnClick}>
              Add Event
            </PaymentButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-wrap justify-center w-full px-16 pb-16">
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
        <div className="flex gap-8 flex-wrap justify-center">
          {listOfEvents.map((event: Event) => {
            return (
              <EventCard
                key={event.id}
                eventPageType="active"
                event={event}
                page={page}
                hasViewButton={true}
                hasEditButton={true}
                hasDeactivateButton={true}
              />
            );
          })}
        </div>
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
