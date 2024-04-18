'use client';
import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Html5QrcodeScanner } from 'html5-qrcode';

import StudentViewModal from '@/components/event/StudentViewModal';
import type { ViewEvent } from '@/types/types';
import { fetchEventData } from '@/utilities/fetch/event';
import { fetchStudentOnEvent } from '@/utilities/fetch/student';

type propTypes = {
  eventId: string;
};

const QrScanPage: React.FC<propTypes> = ({ eventId }) => {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const eventDataQuery = useQuery<ViewEvent>({
    queryKey: ['events', eventId],
    queryFn: () =>
      fetchEventData(token, eventId, {
        studentItems: 10,
        studentPage: 1,
        studentSearchValue: '',
      }),
  });

  const eventData = eventDataQuery.data || { title: '' };
  const eventTitle = eventData.title;

  const studentMutation = useMutation({
    mutationFn: async (uuid: string) => {
      return await fetchStudentOnEvent(token, uuid, Number(eventId));
    },
  });

  const onScanSuccess = async (
    decodedText: string,
    scanner: Html5QrcodeScanner
  ) => {
    if (!hasScanned) {
      studentMutation.mutate(decodedText);
      setIsStudentModalOpen(true);
      setHasScanned(true);
      await scanner.clear();
    }
  };

  useEffect(() => {
    const scanQrButtonAction = async () => {
      const config = { fps: 30, qrbox: { width: 200, height: 200 } };
      const scanner = new Html5QrcodeScanner('qr-reader', config, false);
      scanner.render(
        (decodedText: string) => onScanSuccess(decodedText, scanner),
        () => {}
      );
    };

    void scanQrButtonAction();
  }, [hasScanned]);

  const studentData = studentMutation.data || { student: {}, isFound: false };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold p-8">{eventTitle}</h1>
        <div
          className="border-2 border-black rounded-md w-full max-w-[50rem] h-[40rem]"
          id="qr-reader"
        />
      </div>
      <StudentViewModal
        student={studentData.student}
        isStudentModalOpen={isStudentModalOpen}
        isFound={studentData.isFound}
        setIsStudentModalOpen={setIsStudentModalOpen}
        setHasScanned={setHasScanned}
        studentMutation={studentMutation}
      />
    </div>
  );
};

export default QrScanPage;
