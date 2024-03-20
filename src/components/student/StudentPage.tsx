'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import * as qrcode from 'qrcode';

import Button from '@/components/ui/Button';
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
    <div className="w-full min-h-full flex flex-col items-center justify-center gap-8">
      <div className="w-full max-w-[50rem] overflow-y-auto rounded bg-white flex flex-col justify-center items-center m-4">
        <div className="flex items-center justify-center bg-white">
          {isFound ? (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center text-center gap-8 border-navyBlue mb-8 border-solid border-2 rounded-3xl md:p-12 p-4">
              <div className="flex flex-col items-center gap-2">
                <div className="text-3xl font-bold">{`${student.eventTier.name}`}</div>
                <div className="font-bold">{`(${student.event.title})`}</div>
                <div>
                  <Image
                    src={QrCodeElem}
                    alt="qr-code"
                    width={250}
                    height={250}
                  />
                </div>
                <div className="font-bold">{student.uuid}</div>
                <div>{student.firstName + ' ' + student.lastName}</div>
                <div>
                  {student.is_addu_student
                    ? '(AdDU Student)'
                    : '(Non-AdDU Student)'}
                </div>
                <div>{student.year_and_course}</div>
              </div>
              {student.payment.photo_src && (
                <div>
                  <Image
                    src={student.payment.photo_src}
                    alt="qr-code"
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-navyBlue flex flex-col items-center justify-center text-center gap-2 rounded-lg p-5">
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
        <div className="w-[10rem]">
          <Button onClick={backButtonAction}>Back</Button>
        </div>
      </div>
    </div>
  );
};
