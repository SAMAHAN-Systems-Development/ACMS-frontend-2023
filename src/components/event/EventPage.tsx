'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import EventCard from '@/components/event/EventCard';
import PaymentButton from '@/components/payments/PaymentButton';
import Pagination from '@/components/ui/Pagination';
import type { Event } from '@/types/types';
import {
  fetchActiveEvents,
  fetchInactiveEvents,
} from '@/utilities/fetch/event';

type propTypes = {
  eventType: 'active' | 'inactive';
};

const EventPage: React.FC<propTypes> = ({ eventType }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const eventTitle = getEventTitle(eventType);
  const fetchFunction = getFetchFunction(eventType);
  const { viewButtonLabel, viewButtonLocation } = viewButtonData(eventType);

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const paymentsQuery = useQuery<{ events: Event[]; maxPage: number }>({
    queryKey: ['events', eventType, { page }],
    queryFn: () => fetchFunction(token, page),
  });

  const { events: listOfEvents, maxPage } = paymentsQuery.data || {
    events: [],
    maxPage: 1,
  };

  const viewInactivatedButtonOnClick = () => {
    router.push(viewButtonLocation);
  };

  const addEventButtonOnClick = () => {
    router.push('/event/add');
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col border-b-2 w-full">
        <div className="flex flex-row gap-4 p-12 justify-between">
          <h1 className="text-5xl text-navyBlue font-extrabold">
            {eventTitle}
          </h1>
          <div className="flex gap-2 cursor-pointer items-center">
            <PaymentButton onClick={viewInactivatedButtonOnClick}>
              {viewButtonLabel}
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
        {listOfEvents.length > 0 ? (
          <>
            <div className="flex gap-8 flex-wrap justify-center">
              {listOfEvents.map((event: Event) => {
                return (
                  <EventCard
                    key={event.id}
                    eventPageType={eventType}
                    event={event}
                    page={page}
                    hasViewButton={true}
                    hasEditButton={true}
                    hasDeactivateButton={eventType === 'active'}
                    hasActivateButton={eventType === 'inactive'}
                  />
                );
              })}
            </div>
            <div className="flex justify-center">
              <Pagination page={page} setPage={setPage} maxPage={maxPage} />
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <h1 className="text-3xl text-navyBlue font-extrabold">
              No events found
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;

const getEventTitle = (eventType: 'active' | 'inactive') => {
  return eventType === 'active'
    ? 'List of Active Events'
    : 'List of Inactive Events';
};

const getFetchFunction = (eventType: 'active' | 'inactive') => {
  return eventType === 'active' ? fetchActiveEvents : fetchInactiveEvents;
};

const viewButtonData = (eventType: 'active' | 'inactive') => {
  if (eventType === 'active') {
    return {
      viewButtonLabel: 'View Inactivated',
      viewButtonLocation: '/event/inactive',
    };
  }

  return {
    viewButtonLabel: 'View Activated',
    viewButtonLocation: '/event/active',
  };
};
