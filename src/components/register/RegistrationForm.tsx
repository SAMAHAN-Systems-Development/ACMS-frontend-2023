'use client';
import type { FormEvent } from 'react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { SelectChangeEvent } from '@mui/material';
import { MenuItem } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import RegistrationEventTiersTable from '@/components/register/RegistrationEventTiersTable';
import Button from '@/components/ui/Button';
import InputFile from '@/components/ui/InputFile';
import Loading from '@/components/ui/Loading';
import Select from '@/components/ui/Select';
import TextField from '@/components/ui/TextField';
import { Toggle } from '@/components/ui/Toggle';
import type { Event, EventTierRegistration } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import {
  fetchEventByFormName,
  fetchEventTiersBasedOnEventId,
} from '@/utilities/fetch/event';
import { submitRegistration } from '@/utilities/fetch/student';
import useWindowSize from '@/utilities/useWindowSize';

const getImageSrcByViewportSize = (width: number) => {
  if (width >= VIEW_PORT_SIZES.md) {
    return '/RegisterCoverPhoto.png';
  }
  return '/RegisterCoverPhoto768.png';
};

const RegistrationForm = ({ formName }: { formName: string }) => {
  const { width } = useWindowSize();
  useEffect(() => {
    const socket = io('ws://localhost:3000');
    socket.on('ticketsLeft', (value) => {
      console.log(value);
    });
  }, []);

  const router = useRouter();

  const eventQuery = useQuery<Event>({
    queryKey: ['events', { formName: formName }],
    queryFn: () => fetchEventByFormName(formName),
  });

  const eventId = eventQuery.isSuccess ? eventQuery.data.id : 1;

  const eventTiersQuery = useQuery<EventTierRegistration[]>({
    queryKey: ['event-tiers', eventId],
    queryFn: () => fetchEventTiersBasedOnEventId(eventId),
  });

  const eventTiers = eventTiersQuery.data || [];

  const supabase = createClientComponentClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [registrationData, setRegistrationData] = useState<{
    email: string;
    eventTierId: number;
    firstName: string;
    is_addu_student: boolean;
    isSubmittedByStudent: boolean;
    lastName: string;
    year_and_course: string;
  }>({
    firstName: '',
    lastName: '',
    year_and_course: '',
    email: '',
    is_addu_student: true,
    isSubmittedByStudent: true,
    eventTierId: eventTiers[0]?.id || 1,
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const selectInputOnChange = (event: SelectChangeEvent<unknown>) => {
    setRegistrationData((prev) => ({
      ...prev,
      [event.target.name]: Number(event.target.value),
    }));
  };

  const toggleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let finalRegistrationData;
    try {
      if (!eventQuery.data) {
        throw new Error('Event not found');
      }

      if (eventQuery.data.requires_payment) {
        if (!selectedFile) throw new Error('No file selected');
        const photoFileName = `${uuidv4()}-${selectedFile.name}`;
        const { error } = await supabase.storage
          .from('payment')
          .upload(photoFileName, selectedFile, {
            upsert: false,
          });

        const { data } = supabase.storage
          .from('payment')
          .getPublicUrl(photoFileName);

        if (error) {
          throw new Error(error.message);
        }

        finalRegistrationData = {
          ...registrationData,
          photo_src: data.publicUrl,
          eventId: eventQuery.data.id,
          event_requires_payment: eventQuery.data.requires_payment,
        };
      } else {
        finalRegistrationData = {
          ...registrationData,
          photo_src: '',
          eventId: eventQuery.data.id,
          event_requires_payment: eventQuery.data.requires_payment,
        };
      }

      const studentData = await submitRegistration(finalRegistrationData);
      toast.success('Registration successful');
      setRegistrationData({
        firstName: '',
        lastName: '',
        year_and_course: '',
        email: '',
        isSubmittedByStudent: true,
        eventTierId: eventTiers[0]?.id || 1,
        is_addu_student: true,
      });
      setSelectedFile(null);
      router.push(`/student?uuid=${studentData.uuid}`);
    } catch (error) {
      toast.error('Error during file upload');
    }
  };

  if (eventQuery.isFetched && eventQuery.data) {
    return (
      <div className="w-full">
        <Image
          src={getImageSrcByViewportSize(width)}
          alt="Cover Photo"
          width={3000}
          height={3000}
          className="w-full"
        />
        <div className="flex flex-col items-center border-y-2 py-5 px-4">
          <h1 className="font-semibold md:text-2xl text-xl text-center">
            {eventQuery.data.title}
          </h1>
          <h1 className="font-semibold md:text-5xl text-4xl px-4">
            Registration Form
          </h1>
        </div>
        <div className="flex border-navyBlue justify-center mt-12">
          <div className="w-[60rem] border-2">
            <RegistrationEventTiersTable eventTiers={eventTiers} />
          </div>
        </div>
        <div className="flex flex-col items-center mt-20">
          <form
            className=" flex flex-col justify-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex md:flex-row flex-col gap-4">
              <TextField
                name="firstName"
                onChange={inputOnChange}
                value={registrationData.firstName}
                label="First Name"
              />

              <TextField
                name="lastName"
                onChange={inputOnChange}
                value={registrationData.lastName}
                label="Last Name"
              />
            </div>

            <div className="w-full flex justify-start items-center gap-4 h-full">
              <Toggle
                value={Boolean(registrationData.is_addu_student)}
                label="Are you an AdDU student?"
                onChange={toggleOnChange}
                name="is_addu_student"
                labelPlacement="start"
              />
              <p className="text-l font-bold">
                {Boolean(registrationData.is_addu_student)
                  ? 'Yes, I am'
                  : 'No, I am not'}
              </p>
            </div>

            <TextField
              name="email"
              onChange={inputOnChange}
              value={registrationData.email}
              label={
                Boolean(registrationData.is_addu_student)
                  ? 'AdDU Email'
                  : 'Personal Email'
              }
              type="email"
            />

            <TextField
              name="year_and_course"
              onChange={inputOnChange}
              value={registrationData.year_and_course}
              label="Year and Course"
            />

            <Select
              value={registrationData.eventTierId}
              onChange={selectInputOnChange}
              name="eventTierId"
            >
              {eventTiersQuery.isSuccess &&
                eventTiers.map((eventTier: EventTierRegistration) => (
                  <MenuItem key={eventTier.id} value={eventTier.id}>
                    {eventTier.name}
                  </MenuItem>
                ))}
            </Select>

            {eventQuery.data.requires_payment && (
              <InputFile
                handleChange={handleChange}
                selectedFile={selectedFile}
                label="Payment Photo"
              />
            )}
            <div className="flex justify-end mt-4">
              <div className="w-[10rem]">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
          R
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default RegistrationForm;
