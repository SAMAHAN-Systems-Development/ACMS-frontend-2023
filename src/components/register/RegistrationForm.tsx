/* eslint-disable linebreak-style */
'use client';
import type { FormEvent } from 'react';
import React, { useState } from 'react';

import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import InputFile from '@/components/ui/InputFile';
import { fetchEventData } from '@/utilities/fetch/event';
import { submitRegistration } from '@/utilities/fetch/student';

const RegistrationForm = ({
  id,
  requiresPayment,
}: {
  id: string;
  requiresPayment: Boolean;
}) => {
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });
  const token = tokenQuery.data || '';

  const eventData = useQuery({
    queryKey: ['event'],
    queryFn: () => fetchEventData(token, id),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [registrationData, setRegistrationData] = useState<{
    email: string;
    eventId: number;
    firstName: string;
    isSubmittedByStudent: boolean;
    lastName: string;
    photo_src: string;
    year_and_course: string;
  }>({
    firstName: '',
    lastName: '',
    year_and_course: '',
    email: '',
    isSubmittedByStudent: true,
    photo_src: selectedFile?.name || '',
    eventId: eventData.data.title,
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://acms-backend-2023.onrender.com';
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcWxveHB5a25xY2NyZXR6b3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMDI1NjgsImV4cCI6MjAxNzg3ODU2OH0.s4upzMGDuRJ4l-kRK0HMCB6_iSy1ZKATYnzBW2dnoWA';
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
      if (selectedFile) {
        const { data, error } = await supabase.storage
          .from('payment')
          .upload(selectedFile.name, selectedFile);
        if (error) {
          console.error('Error uploading file:', error);
        } else {
          console.log('File uploaded successfully: ', data);
        }
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitRegistration(token, registrationData);
  };

  return (
    <>
      <div className="flex flex-col items-center border-y-2 py-5">
        <h1 className="font-semibold text-2xl">{eventData.data.title}</h1>
        <h1 className="font-semibold text-5xl">Registration Form</h1>
      </div>
      <div className="flex flex-col items-center mt-20">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4">
            <label className="flex flex-col font-semibold mt-4">
              First Name
              <input
                className="mt-2 border-2 rounded"
                type="text"
                name="firstName"
                onChange={inputOnChange}
                value={registrationData.firstName}
                required
              />
            </label>

            <label className="flex flex-col font-semibold mt-4">
              Last Name
              <input
                className=" mt-2 border-2 rounded"
                type="text"
                name="lastName"
                onChange={inputOnChange}
                value={registrationData.lastName}
                required
              />
            </label>
          </div>

          <label className="flex flex-col font-semibold mt-4">
            AdDU Email
            <input
              className="mt-2 border-2 rounded"
              type="text"
              name="email"
              onChange={inputOnChange}
              value={registrationData.email}
              required
            />
          </label>

          <label className="flex flex-col font-semibold mt-4">
            Year and Course
            <input
              className="mt-2 border-2 rounded"
              type="text"
              name="year_and_course"
              onChange={inputOnChange}
              value={registrationData.year_and_course}
              required
            />
          </label>

          {requiresPayment && (
            <InputFile
              handleChange={handleChange}
              selectedFile={selectedFile}
            />
          )}

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-20 py-1 rounded bg-[#181842] text-white mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
