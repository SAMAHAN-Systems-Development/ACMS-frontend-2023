'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import Button from '@/components/ui/Button';
import DatePicker from '@/components/ui/DatePicker';
import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';
import { Toggle } from '@/components/ui/Toggle';
import { editEvent, fetchEventData } from '@/utilities/fetch/event';

type propTypes = {
  eventId: string;
};

const EditEventPage: React.FC<propTypes> = ({ eventId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const eventQuery = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEventData(token, eventId),
  });

  const [formData, setFormData] = React.useState<{
    date: Dayjs | null;
    description: string;
    max_participants: number;
    price: string;
    requires_payment: boolean;
    title: string;
  }>({
    title: eventQuery.data.title,
    description: eventQuery.data.description,
    date: dayjs(eventQuery.data.date),
    price: eventQuery.data.price,
    max_participants: eventQuery.data.max_participants,
    requires_payment: eventQuery.data.requires_payment,
  });

  const formDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'max_participants') {
      setFormData({
        ...formData,
        [event.target.name]: Number(event.target.value),
      });
      return;
    }

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
        </div>

        <h1 className="text-5xl text-navyBlue font-extrabold text-center">
          EDIT EVENT
        </h1>
      </div>
      <div className="w-full flex flex-col justify-start items-center flex-grow mt-20">
        <form
          className="w-[30rem] flex flex-col gap-8 items-center"
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
            <TextField
              label="Crowd Limit"
              name="max_participants"
              type="number"
              value={formData.max_participants}
              onChange={formDataOnChange}
            />
            <div className="flex justify-start w-full pl-4">
              <Toggle
                value={Boolean(formData.requires_payment)}
                label="Requires Payment"
                onChange={toggleOnChange}
                name="requires_payment"
              />
            </div>
            {Boolean(formData.requires_payment) && (
              <TextField
                label="Event Price"
                name="price"
                type="string"
                value={formData.price}
                onChange={formDataOnChange}
              />
            )}
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
