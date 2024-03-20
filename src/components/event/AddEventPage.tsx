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
import type { EventTierPayment } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import { addEvent, fetchEventTiers } from '@/utilities/fetch/event';
import useWindowSize from '@/utilities/useWindowSize';

export type FormData = {
  date: Dayjs | null;
  description: string;
  eventTiers: { id: number; max_participants: number; price: number }[];
  requires_payment: boolean;
  title: string;
};

const AddEventPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const { width } = useWindowSize();

  const token = tokenQuery.data || '';

  const eventTiersQuery = useQuery<EventTierPayment[]>({
    queryKey: ['event-tiers'],
    queryFn: () => fetchEventTiers(token),
  });

  const eventTiers = eventTiersQuery.data || [];

  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    description: '',
    date: dayjs().add(1, 'day'),
    requires_payment: false,
    eventTiers: eventTiers.map((tier) => ({
      id: tier.id,
      max_participants: 0,
      price: 0,
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

  const addEventMutation = useMutation({
    mutationFn: async () => {
      await addEvent(token, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['events', 'active', { page: 1 }],
        exact: true,
      });
      setFormData({
        title: '',
        description: '',
        date: dayjs().add(1, 'day'),
        eventTiers: [],
        requires_payment: false,
      });
      toast.success('Added the event successfully');
    },
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    addEventMutation.mutate();
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
                color: '#181842',
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
          ADD EVENT
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
            <div className="flex justify-start w-full pl-4">
              <Toggle
                value={Boolean(formData.requires_payment)}
                label="Requires Payment"
                onChange={toggleOnChange}
                name="requires_payment"
              />
            </div>

            {eventTiers.map((eventTier) => (
              <EventTierField
                key={eventTier.id}
                eventTier={eventTier}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </div>
          <div className="w-[9rem] mb-8">
            <Button type="submit">Add Event</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage;
