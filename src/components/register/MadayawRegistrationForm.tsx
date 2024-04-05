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

import RegisterLoadingModal from '@/components/register/RegisterLoadingModal';
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

const primaryColor = 'brown';

const getImageSrcByViewportSize = (width: number) => {
  if (width >= VIEW_PORT_SIZES.md) {
    return '/RegisterCoverPhoto-lg.png';
  }
  if (width >= VIEW_PORT_SIZES.sm) {
    return '/RegisterCoverPhoto-md.png';
  }

  return '/RegisterCoverPhoto-sm.png';
};

const RegistrationForm = ({ formName }: { formName: string }) => {
  const { width } = useWindowSize();

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

  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
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

    if (
      registrationData.email === '' ||
      registrationData.firstName === '' ||
      registrationData.lastName === '' ||
      registrationData.year_and_course === ''
    ) {
      toast.error('Please fill up all the fields', { autoClose: 4000 });
      return;
    }

    const validRegex = /@addu.edu.ph\s*$/;
    if (
      registrationData.is_addu_student &&
      !validRegex.test(registrationData.email)
    ) {
      toast.error('Please use your Ateneo email', { autoClose: 4000 });
      return;
    }

    if (
      !registrationData.is_addu_student &&
      validRegex.test(registrationData.email)
    ) {
      toast.error(
        'This email is from Ateneo, please check the "Are you an AdDU student?" checkbox',
        { autoClose: 8000 }
      );
      return;
    }

    let photoFileName = '';

    let finalRegistrationData;
    try {
      if (!eventQuery.data) {
        throw new Error('Event not found');
      }

      photoFileName = `${registrationData.email
        .split('@')[0]
        .replace('.', '-')}_${registrationData.year_and_course.replace(
        ' ',
        ''
      )}_E${eventQuery.data.id}`;

      if (eventQuery.data.requires_payment) {
        if (!selectedFile) {
          toast.error('Please add an payment photo');
          return;
        }
        setIsLoadingModalOpen(true);

        const { error } = await supabase.storage
          .from('payment')
          .upload(photoFileName, selectedFile, {
            upsert: true,
          });

        const { data } = supabase.storage
          .from('payment')
          .getPublicUrl(photoFileName);

        if (error) {
          throw new Error(error.message);
        }

        const required_payment =
          eventTiers.find(
            (eventTier) => eventTier.id === registrationData.eventTierId
          )?.price || 0;

        finalRegistrationData = {
          ...registrationData,
          photo_src: data.publicUrl,
          eventId: eventQuery.data.id,
          event_requires_payment: eventQuery.data.requires_payment,
          required_payment: required_payment,
        };
      } else {
        finalRegistrationData = {
          ...registrationData,
          photo_src: '',
          eventId: eventQuery.data.id,
          event_requires_payment: eventQuery.data.requires_payment,
          required_payment: 0,
        };
      }

      const studentData = await submitRegistration(finalRegistrationData);
      router.push(`/student?uuid=${studentData.uuid}`);
    } catch (error) {
      setIsLoadingModalOpen(false);
      if (error instanceof Error) {
        if (error.message === 'maxParticipantsReached') {
          toast.error('The ticket limit has been reached');
          return;
        }

        if (error.message === 'emailIsExisting') {
          toast.error('The email is used in this event already');
          return;
        }
      }

      toast.error('Error in submitting registration');
      return;
    }
  };

  useEffect(() => {
    const socket = io(String(process.env.NEXT_PUBLIC_WS_URL));
    socket.on('sendStudentRegisteredSignal', async (wsEventId: number) => {
      if (eventId === wsEventId) {
        await eventTiersQuery.refetch();
      }
    });
  }, [eventId, eventTiersQuery]);

  if (eventQuery.isFetched && eventQuery.data) {
    return (
      <>
        <RegisterLoadingModal isModalOpen={isLoadingModalOpen} />
        <div className="w-full flex flex-col pb-12">
          <div className="border-b-4 border-brown">
            <Image
              src={getImageSrcByViewportSize(width)}
              alt="Cover Photo"
              width={3000}
              height={3000}
              className="w-full"
            />
          </div>
          <div className="w-full flex justify-center mt-8 px-8">
            <Image
              src="/RegistrationFormText.png"
              alt="Regitration Form Text"
              width={3000}
              height={3000}
              className="w-[40rem]"
            />
          </div>
          <div className="flex xl:flex-row flex-col xl:gap-12 justify-center items-start mt-12">
            <div className="flex justify-center md:mt-0 px-4 xl:w-fit w-full">
              <div className="flex flex-col gap-4 justify-center">
                <div className="flex flex-col gap-2 p-4 border-2 rounded-xl">
                  <h2 className="text-left pl-8 mb-4 text-2xl font-bold">
                    Payment Methods
                  </h2>
                  <div className="flex gap-8 pl-8 md:flex-row flex-col">
                    <div className="flex flex-col">
                      <h3 className="font-bold">BPI</h3>
                      <p>Account Name: Christine Duat</p>
                      <p>Account Number: 2519268305</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold">GCash</h3>
                      <p>Account Name: Christine D.</p>
                      <p>Mobile Number: 09666495401</p>
                    </div>
                  </div>
                </div>
                <div className={`md:w-[40rem] h-fit border-2  border-brown`}>
                  <RegistrationEventTiersTable eventTiers={eventTiers} />
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-8 px-8 xl:pt-0 pt-8 xl:w-fit w-full">
              <div className="flex flex-col gap-8 max-w-[20rem] sm:max-w-[28rem]">
                <div>
                  <h3
                    className={`text-md text-${primaryColor} font-bold w-full`}
                  >
                    * Please fill the form below with correct information
                  </h3>
                  <h3
                    className={`text-md text-${primaryColor} font-bold w-full`}
                  >
                    * 1 TICKET PER SUBMISSION
                  </h3>
                </div>
                <form
                  className="flex flex-col justify-center gap-4"
                  onSubmit={handleSubmit}
                >
                  <div className="flex md:flex-row flex-col gap-4 w-full">
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

                  <div className="w-full flex justify-start items-center gap-4">
                    <Toggle
                      value={Boolean(registrationData.is_addu_student)}
                      label="Are you an AdDU student?"
                      onChange={toggleOnChange}
                      disabled={true}
                      name="is_addu_student"
                      labelPlacement={
                        width >= VIEW_PORT_SIZES.md ? 'start' : 'top'
                      }
                      labelBesideToggle={
                        Boolean(registrationData.is_addu_student)
                          ? 'Yes, I am'
                          : 'No, I am not'
                      }
                    />
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
                      color="brown"
                      textColor="brown"
                    />
                  )}
                  <div className="flex justify-end mt-4">
                    <div className="w-[10rem]">
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (eventQuery.isFetching) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-2xl font-bold">Event is currently not available</h1>
    </div>
  );
};

export default RegistrationForm;
