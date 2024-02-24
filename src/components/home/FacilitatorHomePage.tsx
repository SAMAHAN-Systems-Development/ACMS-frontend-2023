'use client';
import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import EventCard from '@/components/event/EventCard';
import Pagination from '@/components/ui/Pagination';
import type { Event } from '@/types/types';
import { fetchActiveEvents } from '@/utilities/fetch/event';

const FacilitatorHomePage = () => {
  const [page, setPage] = useState(1);

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const activeEventsQuery = useQuery<{ events: Event[]; maxPage: number }>({
    queryKey: ['events', 'active', { page }],
    queryFn: () => fetchActiveEvents(token, page),
  });

  const { events: listOfEvents, maxPage } = activeEventsQuery.data || {
    events: [],
    maxPage: 1,
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="p-8 w-full border-b-2">
        <h1 className="text-5xl text-navyBlue font-extrabold text-center md:text-left">
          List Of Events
        </h1>
      </div>
      <div className="flex flex-col gap-8 justify-between flex-grow">
        <div className="flex justify-center">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
        <div className="flex gap-8 w-full justify-center flex-wrap px-4">
          {listOfEvents.map((event: Event) => (
            <EventCard
              key={event.id}
              event={event}
              page={page}
              eventPageType="active"
              hasScanQrButton={true}
            />
          ))}
        </div>
        <div className="flex justify-center mb-8">
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </div>
      </div>
    </div>
  );
};

export default FacilitatorHomePage;
