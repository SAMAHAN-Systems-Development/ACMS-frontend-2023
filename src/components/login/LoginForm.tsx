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

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setError(null); 
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // If field values is missing or empty
    if (!fieldValues.email){
      setError('Email is required.');
      return;
    }

    if (!validateEmail(fieldValues.email)) {
      setError('Invalid email address.');
      return;
    }

    if (!fieldValues.password) {
      setError('Password is required.');
      return;
    }
    setLoading(true); 

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: fieldValues.email,
          password: fieldValues.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        setLoading(false);
      } else {
        setError(data.message || 'Email and password do not match.');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
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
      <div className="flex flex-col items-center justify-center gap-8 border-2 border-navyBlue md:px-20 md:pb-20 md:pt-28 px-12 pb-12 pt-16 rounded-3xl relative mx-8">
        <Image
          src="/logo.png"
          alt="Logo Picture"
          height={200}
          width={200}
          className="absolute md:-inset-y-[5.3rem] md:w-[11rem] w-[8rem] -inset-y-16"
        />
        <h1 className="text-[2rem] font-semibold text-center">ACMS LOGIN</h1>
        <form
          className="md:w-[25rem] flex flex-col gap-4"
          action="/auth/login"
          method="post"
          onSubmit={handleSubmit}
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="w-full flex justify-end mt-4">
            <div className="w-[8rem]">
              <Button type="submit">
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
