'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import EventTierField from '@/components/event/EventTierField';
import Button from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';
import { Toggle } from '@/components/ui/Toggle';
import type { EventTierViewEvent } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import { editEvent, fetchEventData } from '@/utilities/fetch/event';
import useWindowSize from '@/utilities/useWindowSize';

export type FormData = {
  date: Dayjs | null;
  description: string;
  earlyBirdAccessDate: Dayjs | null;
  eventTiers: {
    earlyBirdPrice: number;
    id: number;
    max_participants: number;
    originalPrice: number;
  }[];
  hasEarlyBirdAccess: boolean;
  requires_payment: boolean;
  title: string;
};

type propTypes = {
  eventId: string;
};

const EditEventPage: React.FC<propTypes> = ({ eventId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });
  const { width } = useWindowSize();

  const token = tokenQuery.data || '';

  const eventQuery = useQuery({
    queryKey: ['event', eventId],
    queryFn: () =>
      fetchEventData(token, eventId, {
        studentItems: 10,
        studentPage: 1,
        studentSearchValue: '',
      }),
  });

  const eventTiers = eventQuery.data.eventTiers;

  const [formData, setFormData] = React.useState<FormData>({
    title: eventQuery.data.title,
    description: eventQuery.data.description,
    date: dayjs(eventQuery.data.date),
    earlyBirdAccessDate: dayjs(eventQuery.data.earlyBirdAccessDate),
    requires_payment: eventQuery.data.requires_payment,
    hasEarlyBirdAccess: eventQuery.data.hasEarlyBirdAccess,
    eventTiers: eventQuery.data.eventTiers.map((tier: EventTierViewEvent) => ({
      id: tier.id,
      max_participants: tier.crowdLimit,
      earlyBirdPrice: tier.earlyBirdPrice,
      originalPrice: tier.originalPrice,
    })),
  });

  const formDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const toggleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.checked });
  };

  const dateOnChange = (date: Dayjs | null) => {
    setFormData({ ...formData, date });
  };

  const editEventMutation = useMutation({
    mutationFn: async () => {
      await editEvent(token, Number(eventId), formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['event', eventId],
        exact: true,
      });
      toast.success('Updated the event successfully');
    },
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    editEventMutation.mutate();
  };

  return (
    <div className="flex flex-col">
      <div className="p-8 w-full border-b-2 relative">
        <div className="absolute">
          {width >= VIEW_PORT_SIZES.md && (
            <span
              className="icon-[material-symbols--arrow-back-rounded]"
              style={{
                width: '48px',
                height: '48px',
                color: '#724700',
              }}
              onClick={() => {
                router.back();
              }}
              role="button"
              onKeyUp={() => {}}
              tabIndex={0}
            />
          )}
        </div>

        <h1 className="text-5xl text-navyBlue font-extrabold text-center">
          EDIT EVENT
        </h1>
      </div>
      <div className="w-full flex flex-col justify-start items-center flex-grow mt-20">
        <form
          className="md:w-[30rem] w-[20rem] flex flex-col gap-8 items-center"
          onSubmit={onSubmit}
        >
          <div className="w-full flex flex-col gap-8 items-center">
            <TextField
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={formDataOnChange}
            />
            <TextArea
              label="Event Description"
              name="description"
              value={formData.description}
              onChange={formDataOnChange}
            />
            <DatePicker
              value={formData.date}
              onChange={dateOnChange}
              label="Event Date"
              name="date"
            />
            <div className="flex justify-start w-full">
              <Toggle
                value={Boolean(formData.requires_payment)}
                label="Requires Payment"
                onChange={toggleOnChange}
                name="requires_payment"
              />
            </div>
            {Boolean(formData.requires_payment) && (
              <div className="flex justify-start w-full">
                <Toggle
                  value={Boolean(formData.hasEarlyBirdAccess)}
                  label="Early Bird Access"
                  onChange={toggleOnChange}
                  name="hasEarlyBirdAccess"
                />
              </div>
            )}
            {Boolean(formData.requires_payment) &&
              Boolean(formData.hasEarlyBirdAccess) && (
                <DatePicker
                  value={formData.earlyBirdAccessDate}
                  onChange={dateOnChange}
                  label="Early Bird Access Date"
                  name="earlyBirdAccessDate"
                />
              )}
            {eventTiers.map((eventTier: any) => (
              <EventTierField
                key={eventTier.id}
                eventTier={eventTier}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
          <div className="w-[9rem] mb-8">
            <Button type="submit">Edit Event</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
