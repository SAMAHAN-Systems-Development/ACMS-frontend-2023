'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import * as qrcode from 'qrcode';

import type { Student } from '@/types/types';
import { fetchStudent, fetchStudentOnEvent } from '@/utilities/fetch/student';

export const StudentPage = () => {
  const [QrCodeElem, setQrCodeElem] = useState<string>('');
  const searchParams = useSearchParams();
  const uuid = searchParams.get('uuid') || '';
  const eventId = searchParams.get('eventId');
  const hasEventId = eventId !== null;
  const router = useRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';

  const studentQuery = useQuery<{ isFound: boolean; student: Student }>({
    queryKey: ['student', { uuid: uuid }],
    queryFn: () =>
      hasEventId
        ? fetchStudentOnEvent(token, uuid, Number(eventId))
        : fetchStudent(token, uuid),
  });
  const backButtonAction = () => {
    router.back();
  };

  useEffect(() => {
    const loadQrCode = async () => {
      const qrCode = await qrcode.toDataURL(uuid, {
        scale: 10,
      });
      setQrCodeElem(qrCode);
    };

    void loadQrCode();
  }, [uuid]);

  if (!studentQuery.data) return;
  const { student, isFound } = studentQuery.data;

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center">
      <button onClick={backButtonAction}>Back</button>
      <div className="w-full h-full flex items-center justify-center">
        {isFound ? (
          <div className="lg:w-4/12 md:w-6/12 w-8/12 flex flex-row items-center justify-center text-center gap-8 border-navyBlue border-solid border-2 rounded-3xl p-12">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="font-bold">{student.event.title}</div>
              <div>
                <Image
                  src={QrCodeElem}
                  alt="qr-code"
                  width={300}
                  height={300}
                />
              </div>
              <div className="font-bold">{student.uuid}</div>
              <div>{student.firstName + ' ' + student.lastName}</div>
              <div>{student.year_and_course}</div>
            </div>
            <div>
              <Image
                src={student.payment.photo_src}
                alt="qr-code"
                width={200}
                height={200}
              />
            </div>
          </div>
        ) : (
          <div className="lg:w-4/12 md:w-6/12 w-8/12 text-navyBlue flex flex-col items-center justify-center text-center gap-2 border-navyBlue border-solid border-2 rounded-lg p-5 ">
            <div className="font-bold">
              <Image
                src="/ErrorIcon.svg"
                alt="Error Icon SVG"
                width={200}
                height={200}
              />
            </div>
            <div className="font-bold">STUDENT NOT FOUND</div>
          </div>
        )}
      </div>
    </div>
  );
};
