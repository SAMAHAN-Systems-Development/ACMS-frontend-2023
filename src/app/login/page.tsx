'use client'
import React, { useCallback, useEffect, useState } from 'react';
import LoginForm from '@/components/login/LoginForm';
const Page = () => {

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const [Login, setLogin] = useState([]);

  const fetchLogin = useCallback(async () => {
    fetch(`${backendUrl}/login`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setLogin(data);
      })
      .catch((error) => error);
  }, [backendUrl]);

  useEffect(() => {
    void fetchLogin();
  }, [Login]);

  return (
    <LoginForm />
  );




};

export default Page;
