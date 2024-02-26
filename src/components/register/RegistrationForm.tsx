/* eslint-disable linebreak-style */
'use client';
import React, { useState } from 'react';

import { createClient } from '@supabase/supabase-js';

import InputFile from '@/components/ui/InputFile';

interface RegistrationFormProps {
  eventName: string;
  requiresPayment: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  eventName,
  requiresPayment,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async () => {
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

  return (
    <>
      <div className="flex flex-col items-center border-y-2 py-5">
        <h1 className="font-semibold text-2xl">{eventName}</h1>
        <h1 className="font-semibold text-5xl">Registration Form</h1>
      </div>
      <div className="flex flex-col items-center mt-20">
        <form
          action="/student/submit-registration"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-4">
            <label className="flex flex-col font-semibold mt-4">
              First Name
              <input
                className="mt-2 border-2 rounded"
                type="text"
                name="firstName"
                required
              />
            </label>

            <label className="flex flex-col font-semibold mt-4">
              Last Name
              <input
                className=" mt-2 border-2 rounded"
                type="text"
                name="lastName"
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
              required
            />
          </label>

          <label className="flex flex-col font-semibold mt-4">
            Year and Course
            <input
              className="mt-2 border-2 rounded"
              type="text"
              name="yearAndCourse"
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
            <button className="px-20 py-1 rounded bg-[#181842] text-white mt-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
