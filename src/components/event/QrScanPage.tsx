'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Html5QrcodeScanner } from 'html5-qrcode';

import type { Event } from '@/types/types';
import { fetchEventData } from '@/utilities/fetch/event';

type propTypes = {
  eventId: string;
};

const QrScanPage: React.FC<propTypes> = ({ eventId }) => {
  const router = useRouter();
  // const reactRouter = useReactRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const eventDataQuery = useQuery<Event>({
    queryKey: ['events', eventId],
    queryFn: () => fetchEventData(token, eventId),
  });

  const eventData = eventDataQuery.data || { title: '' };
  const eventTitle = eventData.title;

  const onScanError = () => {
    // console.error(errorMessage);
  };

  useEffect(() => {
    const onScanSuccess = (decodedText: string) => {
      router.push(`/student?uuid=${decodedText}&eventId=${eventId}`);
    };

    const scanQrButtonAction = async () => {
      const config = { fps: 30, qrbox: { width: 300, height: 300 } };
      const scanner = new Html5QrcodeScanner('qr-reader', config, false);
      scanner.render(onScanSuccess, onScanError);
    };

    void scanQrButtonAction();
  }, [eventId, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white p-8">
      <div className="flex flex-col items-center justify-center p-8 w-full">
        <h1 className="text-3xl font-bold">{eventTitle}</h1>
        <div
          className="border-2 border-black rounded-md w-full max-w-[50rem] h-[40rem]"
          id="qr-reader"
        />
      </div>
    </div>
  );
};

export default QrScanPage;
