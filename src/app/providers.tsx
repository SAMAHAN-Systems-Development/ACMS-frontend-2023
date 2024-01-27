'use client';

import { useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </QueryClientProvider>
  );
}
