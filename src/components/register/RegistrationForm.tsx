'use client';
import type { FormEvent } from 'react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

import Button from '@/components/ui/Button';
import InputFile from '@/components/ui/InputFile';
import Loading from '@/components/ui/Loading';
import TextField from '@/components/ui/TextField';
import type { Event } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import { fetchEventByFormName } from '@/utilities/fetch/event';
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

  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const router = useRouter();

  const token = tokenQuery.data || '';

  const eventQuery = useQuery<Event>({
    queryKey: ['events', { formName: formName }],
    queryFn: () => fetchEventByFormName(token, formName),
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const supabase = createClient(supabaseUrl, supabaseKey);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [registrationData, setRegistrationData] = useState<{
    email: string;
    firstName: string;
    isSubmittedByStudent: boolean;
    lastName: string;
    year_and_course: string;
  }>({
    firstName: '',
    lastName: '',
    year_and_course: '',
    email: '',
    isSubmittedByStudent: true,
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
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

      if (!eventQuery.data) {
        throw new Error('Event not found');
      }

      if (error) {
        throw new Error(error.message);
      }

      const finalRegistrationData = {
        ...registrationData,
        photo_src: data.publicUrl,
        eventId: eventQuery.data.id,
      };
      const studentData = await submitRegistration(
        token,
        finalRegistrationData
      );
      toast.success('Registration successful');
      setRegistrationData({
        firstName: '',
        lastName: '',
        year_and_course: '',
        email: '',
        isSubmittedByStudent: true,
      });
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
        <div className="flex flex-col items-center border-y-2 py-5">
          <h1 className="font-semibold md:text-2xl text-xl">
            {eventQuery.data.title}
          </h1>
          <h1 className="font-semibold md:text-5xl text-4xl px-4">
            Registration Form
          </h1>
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

            <TextField
              name="email"
              onChange={inputOnChange}
              value={registrationData.email}
              label="AdDU Email"
              type="email"
            />

            <TextField
              name="year_and_course"
              onChange={inputOnChange}
              value={registrationData.year_and_course}
              label="Year and Course"
            />

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
        </div>
      </div>
    );
  }

  return <Loading />;
};

export default RegistrationForm;
