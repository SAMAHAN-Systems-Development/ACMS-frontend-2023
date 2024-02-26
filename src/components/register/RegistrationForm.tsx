/* eslint-disable linebreak-style */
'use client';
import React, { useState } from 'react';

import * as Form from '@radix-ui/react-form';
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

  const handleChange = async (event: any) => {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://acms-backend-2023.onrender.com';
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcWxveHB5a25xY2NyZXR6b3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMDI1NjgsImV4cCI6MjAxNzg3ODU2OH0.s4upzMGDuRJ4l-kRK0HMCB6_iSy1ZKATYnzBW2dnoWA';
    const supabase = createClient(supabaseUrl, supabaseKey);
    setSelectedFile(event.target.files[0]);

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
    <div className="flex flex-col justify-center">
      <div className=" flex flex-col items-center border-y-2 py-5">
        <h1 className="font-semibold text-2xl">{eventName}</h1>
        <h1 className="font-semibold text-5xl">Registration Form</h1>
      </div>
      <div className="flex flex-col items-center mt-20">
        <Form.Root
          className="FormRoot"
          action="/student/submit-registration"
          method="post"
        >
          <div className="flex flex-row gap-4">
            <Form.Field className="FormField flex flex-col" name="firstName">
              <Form.Label className="FormLabel font-semibold">
                First Name
              </Form.Label>
              <Form.Message
                className="FormMessage text-xs font-light text-red-500"
                match="valueMissing"
              >
                Please enter your First Name
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="Input mt-2 border-2 rounded"
                  type="text"
                  required
                />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField flex flex-col" name="lastName">
              <Form.Label className="FormLabel font-semibold">
                Last Name
              </Form.Label>
              <Form.Message
                className="FormMessage text-xs font-light text-red-500"
                match="valueMissing"
              >
                Please enter your Last Name
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="Input mt-2 border-2 rounded"
                  type="text"
                  required
                />
              </Form.Control>
            </Form.Field>
          </div>

          <Form.Field className="FormField flex flex-col mt-4" name="email">
            <Form.Label className="FormLabel font-semibold">
              AdDU Email
            </Form.Label>
            <Form.Message
              className="FormMessage text-xs font-light text-red-500"
              match="valueMissing"
            >
              Please enter your AdDU Email
            </Form.Message>
            <Form.Control asChild>
              <input
                className="Input mt-2 border-2 rounded"
                type="text"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field
            className="FormField flex flex-col mt-4"
            name="yearAndCourse"
          >
            <Form.Label className="FormLabel font-semibold">
              Year and Course
            </Form.Label>
            <Form.Message
              className="FormMessage text-xs font-light text-red-500"
              match="valueMissing"
            >
              Please enter your Year and Course
            </Form.Message>
            <Form.Control asChild>
              <input
                className="Input mt-2 border-2 rounded"
                type="text"
                required
              />
            </Form.Control>
          </Form.Field>

          {requiresPayment && (
            <InputFile
              handleChange={handleChange}
              selectedFile={selectedFile}
            />
          )}

          <div className="flex justify-end mt-8">
            <Form.Submit asChild>
              <button className="Button px-20 py-1 rounded bg-[#181842] text-white mt-4">
                Submit
              </button>
            </Form.Submit>
          </div>
        </Form.Root>
      </div>
    </div>
  );
};

export default RegistrationForm;
