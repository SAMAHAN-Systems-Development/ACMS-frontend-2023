'use client';
import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchAllActiveTitleEvents } from '@/utilities/fetch/event';
import { submitRegistration } from '@/utilities/fetch/student';

type EventTitle = {
  id: number;
  title: string;
};

const CashierHomePage = () => {
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const activeEventsQuery = useQuery<EventTitle[]>({
    queryKey: ['events', 'active', 'all', 'title'],
    queryFn: () => fetchAllActiveTitleEvents(token),
  });

  const allEventTitle = activeEventsQuery.data || [];

  const [inputData, setInputData] = useState<{
    email: string;
    event: number;
    firstName: string;
    lastName: string;
    year_and_course: string;
  }>({
    firstName: '',
    lastName: '',
    year_and_course: '',
    email: '',
    event: allEventTitle[0].id,
  });

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitRegistration(token, {
      ...inputData,
      photo_src: '',
      isSubmittedByStudent: false,
    });
  };

  const inputOnChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="h-full">
      <div className="p-8 w-full border-b-2">
        <h1 className="text-5xl text-navyBlue font-extrabold text-center">
          REGISTRATION FORM
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={onFormSubmit}
        >
          <div className="flex gap-4 w-full">
            <input
              name="firstName"
              type="text"
              className="border-2 w-full"
              onChange={inputOnChange}
              value={inputData.firstName}
            />
            <input
              name="lastName"
              type="text"
              className="border-2 w-full"
              onChange={inputOnChange}
              value={inputData.lastName}
            />
          </div>
          <input
            name="year_and_course"
            type="text"
            className="border-2 w-full"
            onChange={inputOnChange}
            value={inputData.year_and_course}
          />
          <input
            name="email"
            type="text"
            className="border-2 w-full"
            onChange={inputOnChange}
            value={inputData.email}
          />
          <select
            className="border-2"
            name="event"
            id="event"
            onChange={inputOnChange}
            value={String(inputData.event)}
          >
            {allEventTitle.map((event: EventTitle) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CashierHomePage;
