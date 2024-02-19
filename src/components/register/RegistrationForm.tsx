/* eslint-disable linebreak-style */
'use client';
import React from 'react';
import Image from 'next/image';

import * as Form from '@radix-ui/react-form';

import InputFile from '@/components/ui/InputFile';

interface RegistrationFormProps {
  eventName: string;
  requiresPayment: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  eventName,
  requiresPayment,
}) => {
  return (
    <div className="flex flex-col justify-center">
      <Image
        src="/registrationBackground.jpg"
        alt="Registration Background"
        fill
      />
      <div className=" flex flex-col items-center border-y-2 py-5">
        <h1 className="font-semibold text-2xl">{eventName}</h1>
        <h1 className="font-semibold text-5xl">Registration Form</h1>
      </div>
      <div className="flex flex-col items-center mt-20">
        <Form.Root className="FormRoot">
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
                type="password"
                required
              />
            </Form.Control>
          </Form.Field>

          {requiresPayment && (
            <Form.Field className="FormField flex flex-col mt-4" name="payment">
              <Form.Label className="FormLabel font-semibold">
                Payment
              </Form.Label>
              <Form.Message
                className="FormMessage text-xs font-light text-red-500"
                match="valueMissing"
              >
                Please enter your Payment
              </Form.Message>
              <Form.Control asChild>
                <input
                  className="Input mt-2 border-2 rounded"
                  type="text"
                  required
                />
              </Form.Control>
            </Form.Field>
          )}
          <InputFile />
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
