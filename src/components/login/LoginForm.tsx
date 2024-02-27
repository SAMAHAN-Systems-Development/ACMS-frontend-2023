'use client';
import { useState } from 'react';

import * as Form from '@radix-ui/react-form';

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
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 border-2 border-navyBlue px-24 pb-24 pt-32 rounded-3xl">
        <h1 className="text-[2rem] font-semibold">LOGIN FORM</h1>
        <form
          className="w-[25rem] flex flex-col gap-4"
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
