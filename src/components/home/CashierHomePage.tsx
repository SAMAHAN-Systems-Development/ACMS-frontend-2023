'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { MenuItem, type SelectChangeEvent } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import TextField from '@/components/ui/TextField';
import type { EventTierStudent } from '@/types/types';
import {
  fetchAllActiveTitleEvents,
  fetchEventTiersBasedOnEventId,
} from '@/utilities/fetch/event';
import { submitRegistration } from '@/utilities/fetch/student';
import { Toggle } from '@/components/ui/Toggle';

type EventTitle = {
  id: number;
  title: string;
};

const CashierHomePage = () => {
  const router = useRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const activeEventsQuery = useQuery<EventTitle[]>({
    queryKey: ['events', 'active', 'all', 'title'],
    queryFn: () => fetchAllActiveTitleEvents(token),
  });

  const allEventTitle = activeEventsQuery.data || [];

  const eventTierMutation = useMutation({
    mutationFn: async (eventId: number) => {
      return await fetchEventTiersBasedOnEventId(eventId);
    },
    onSuccess: (data: EventTierStudent[]) => {
      setInputData((prev) => ({
        ...prev,
        eventTierId: data[0].id,
      }));
    },
  });

  const eventTierData = eventTierMutation.data || [];

  const [inputData, setInputData] = useState<{
    email: string;
    eventId: number;
    eventTierId: number;
    firstName: string;
    is_addu_student: boolean;
    lastName: string;
    year_and_course: string;
  }>({
    firstName: '',
    lastName: '',
    year_and_course: '',
    email: '',
    eventId: allEventTitle[0].id,
    eventTierId: eventTierData[0] ? eventTierData[0].id : 1,
    is_addu_student: true,
  });

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      inputData.email === '' ||
      inputData.firstName === '' ||
      inputData.lastName === '' ||
      inputData.year_and_course === ''
    ) {
      toast.error('Please fill up all the fields');
      return;
    }

    const studentData = await submitRegistration({
      ...inputData,
      photo_src: '',
      isSubmittedByStudent: false,
      event_requires_payment: null,
    });

    if (studentData) {
      toast.success('Successfully submitted registration');
      router.push(`/student?uuid=${studentData.uuid}`);
    }
  };

  const inputOnChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<unknown>
  ) => {
    setInputData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const selectEventInputOnChange = (event: SelectChangeEvent<unknown>) => {
    eventTierMutation.mutate(Number(event.target.value));
    setInputData((prev) => ({
      ...prev,
      eventId: Number(event.target.value),
    }));
  };

  const toggleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    eventTierMutation.mutate(allEventTitle[0].id);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="p-8 w-full border-b-2">
        <h1 className="md:text-5xl text-4xl text-navyBlue font-extrabold text-center">
          REGISTRATION FORM
        </h1>
      </div>
      <div className="flex justify-center flex-grow mt-20">
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={onFormSubmit}
        >
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <TextField
              label="first name"
              value={inputData.firstName}
              name="firstName"
              onChange={inputOnChange}
            />
            <TextField
              label="last name"
              value={inputData.lastName}
              name="lastName"
              onChange={inputOnChange}
            />
          </div>
          <TextField
            label="Year and Course"
            value={inputData.year_and_course}
            name="year_and_course"
            onChange={inputOnChange}
          />
          <div className="w-full flex justify-start items-center gap-4 h-full">
            <Toggle
              value={Boolean(inputData.is_addu_student)}
              label="Are you an AdDU student?"
              onChange={toggleOnChange}
              name="is_addu_student"
              labelPlacement="start"
            />
            <p className="text-l font-bold">
              {Boolean(inputData.is_addu_student)
                ? 'Yes, I am'
                : 'No, I am not'}
            </p>
          </div>
          <TextField
            label={
              Boolean(inputData.is_addu_student)
                ? 'AdDU Email'
                : 'Personal Email'
            }
            value={inputData.email}
            name="email"
            type="email"
            onChange={inputOnChange}
          />
          <Select
            value={String(inputData.eventId)}
            onChange={selectEventInputOnChange}
            name="eventId"
          >
            {allEventTitle.map((event: EventTitle) => (
              <MenuItem key={event.id} value={event.id}>
                {event.title}
              </MenuItem>
            ))}
          </Select>
          {
            <Select
              value={String(inputData.eventTierId)}
              onChange={inputOnChange}
              name="eventTierId"
            >
              {eventTierMutation.isSuccess &&
                eventTierData.map((eventTier: EventTierStudent) => (
                  <MenuItem key={eventTier.id} value={eventTier.id}>
                    {eventTier.name}
                  </MenuItem>
                ))}
            </Select>
          }
          <div className="flex w-full justify-end">
            <div className="w-[8rem]">
              <Button type="submit" onClick={() => {}}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashierHomePage;
