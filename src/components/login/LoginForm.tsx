'use client';
import { useState } from 'react';
import Image from 'next/image';

import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';

const LoginForm = () => {
  const [fieldValues, setFieldValues] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const fieldOnChange = (event: React.ChangeEvent) => {
    console.log(event);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="flex flex-row gap-2 w-full border-navyBlue border-b-2 absolute top-0 py-2 px-2 items-center">
        <Image
          src="/logo.png"
          alt="Logo Picture"
          height={200}
          width={200}
          className="w-[1.5rem]"
        />
        <h1 className="text-xl font-semibold">ACMS</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 border-2 border-navyBlue md:px-24 md:pb-24 md:pt-32 px-12 pb-12 pt-16 rounded-3xl relative mx-8">
        <Image
          src="/logo.png"
          alt="Logo Picture"
          height={200}
          width={200}
          className="absolute md:-inset-y-24 md:w-[12.5rem] w-[8rem] -inset-y-16"
        />
        <h1 className="text-[2rem] font-semibold text-center">LOGIN FORM</h1>
        <form
          className="md:w-[25rem] flex flex-col gap-4"
          action="/auth/login"
          method="post"
        >
          <TextField
            label="Email"
            name="email"
            onChange={fieldOnChange}
            value={fieldValues.email}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            onChange={fieldOnChange}
            value={fieldValues.password}
          />
          <div className="w-full flex justify-end mt-4">
            <div className="w-[10rem]">
              <Button type="submit" onClick={() => {}}>
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
