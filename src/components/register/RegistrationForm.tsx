'use client';
import type { FormEvent } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { SelectChangeEvent } from '@mui/material';
import { MenuItem } from '@mui/material';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
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
import Checkbox from '@/components/ui/Checkbox';

const getImageSrcByViewportSize = (width: number) => {
  if (width >= VIEW_PORT_SIZES.md) {
    return '/botb/RegisHeader_LG.png';
  }
  if (width >= VIEW_PORT_SIZES.sm) {
    return '/botb/RegisHeader_MD.png';
  }

  return '/botb/RegisHeader_SM.png';
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

  const eventTiers = eventTiersQuery.isSuccess ? eventTiersQuery.data : [];

  const supabase = createClientComponentClient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedIdFile, setSelectedIdFile] = useState<File | null>(null);

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const [registrationData, setRegistrationData] = useState<{
    email: string;
    eventTierId: number;
    firstName: string;
    is_addu_student: boolean;
    isSubmittedByStudent: boolean;
    lastName: string;
    payment_reference_number: string;
    year_and_course: string;
  }>({
    firstName: '',
    lastName: '',
    year_and_course: '',
    email: '',
    is_addu_student: true,
    isSubmittedByStudent: true,
    eventTierId: eventTiers[0]?.id || 1,
    payment_reference_number: '',
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSelectedIdFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedIdFile(event.target.files ? event.target.files[0] : null);
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

    let finalRegistrationData;
    try {
      if (!eventQuery.data) {
        throw new Error('Event not found');
      }

      if (eventQuery.data.requires_payment) {
        if (!selectedFile) {
          toast.error('Please add an payment photo');
          return;
        }
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

        const required_payment =
          eventTiers.find(
            (eventTier) => eventTier.id === registrationData.eventTierId
          )?.price || 0;

        if (!selectedIdFile) {
          toast.error('Please add your Valid Id photo');
          return;
        }

        const idPublicUrl = await uploadPhotoAndGetPublicUrl(
          selectedIdFile,
          photoFileName,
          'valid_id'
        );

        finalRegistrationData = {
          ...registrationData,
          photo_src: data.publicUrl,
          eventId: eventQuery.data.id,
          event_requires_payment: eventQuery.data.requires_payment,
          required_payment: required_payment,
          id_src: idPublicUrl,
        };
      } else {
        finalRegistrationData = {
          ...registrationData,
          photo_src: '',
          eventId: eventQuery.data.id,
          event_requires_payment: eventQuery.data.requires_payment,
          required_payment: 0,
          id_src: '',
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
        payment_reference_number: '',
      });
      setSelectedFile(null);
      router.push(`/student?uuid=${studentData.uuid}`);
    } catch (error) {
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
      console.error(error);

      toast.error('Error in submitting registration');
      return;
    }
  };

  const uploadPhotoAndGetPublicUrl = async (
    file: File,
    fileName: string,
    bucketName: string
  ) => {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        upsert: true,
      });

    const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

    if (error) {
      throw new Error(error.message);
    }

    return data.publicUrl;
  };

  // useEffect(() => {
  //   const socket = io(String(process.env.NEXT_PUBLIC_WS_URL));
  //   socket.on('sendStudentRegisteredSignal', async (wsEventId: number) => {
  //     if (eventId === wsEventId) {
  //       await eventTiersQuery.refetch();
  //     }
  //   });
  // }, [eventId, eventTiersQuery]);

  if (eventQuery.isFetched && eventQuery.data) {
    return (
      <div className="w-full">
        <Image
          src={getImageSrcByViewportSize(width)}
          alt="Cover Photo"
          width={3000}
          height={3000}
          // height={3000}
          className="w-full"
        />
        <div className="flex flex-col items-center border-y-2 py-5 px-4">
          <h1 className="font-semibold md:text-5xl text-4xl px-4 text-center">
            {eventQuery.data.title}
          </h1>
          <h1 className="font-semibold md:text-2xl text-xl text-center">
            Registration Form
          </h1>
        </div>
        <div className="flex xl:flex-row flex-col xl:gap-12 justify-center items-start mt-12">
          <div className="flex justify-center md:mt-0 px-4 xl:w-fit w-full">
            <div className="flex flex-col gap-4 justify-center">
              <div className="flex flex-col gap-2 p-4 border-2 rounded-xl">
                <h2 className=" md:pl-8 mb-2 text-2xl font-bold">
                  This is a Demo Registration Page
                </h2>
                <div className="flex gap-4 md:pl-8 flex-col">
                  <ol>
                    <li>
                      1. Try submitting a registration and you will receive an
                      email with your QR code.
                    </li>
                    <li>
                      2. Using the admin demo account, mark your ticket as
                      verified.
                    </li>
                    <li>
                      3. Using the facilitator demo account, scan the QR in your
                      email to mark your attendance.
                    </li>
                  </ol>
                </div>
              </div>

              <div className={`md:w-[40rem] h-fit border-2  border-brown`}>
                <RegistrationEventTiersTable eventTiers={eventTiers} />
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-8 px-8 xl:pt-0 pt-8 xl:w-fit w-full">
            <div className="flex flex-col gap-8 max-w-[20rem] sm:max-w-[28rem]">
              <div className="flex flex-col gap-2 p-4 border-2 rounded-xl">
                <h2 className=" md:pl-8 mb-2 text-2xl font-bold">
                  Hope you have a nice day!
                </h2>
                <div className="flex gap-4 md:pl-8 md:flex-row flex-col">
                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <h3 className="font-bold">GCash</h3>
                      <p>Juan Dela Cruz</p>
                      <p>0948 193 5598</p>
                    </div>
                    <div>
                      <h3 className="font-bold">BPI</h3>
                      <p>John Doe</p>
                      <p>1234 567 89</p>
                    </div>
                  </div>
                </div>
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
                    id="payment_photo"
                    handleChange={handleChange}
                    selectedFile={selectedFile}
                    label="Payment Photo"
                  />
                )}
                <InputFile
                  handleChange={handleSelectedIdFileChange}
                  selectedFile={selectedIdFile}
                  label="Valid Id"
                  color="brown"
                  textColor="brown"
                  id="id-input"
                />
                <div className="flex items-start gap-3 mt-4">
                  <div className="pt-1">
                    <Checkbox
                      checked={isAgreementChecked}
                      onCheckedAction={(event) => {
                        setIsAgreementChecked(event.target.checked);
                      }}
                    />
                  </div>
                  <p className="text-justify">
                    I hereby acknowledge that all information provided is
                    accurate and final. Furthermore, I understand that the
                    tickets issued are non-refundable.
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="w-[10rem]">
                    <Button
                      type={isAgreementChecked ? 'submit' : 'button'}
                      isDisabled={!isAgreementChecked}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
