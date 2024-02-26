import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';
import * as qrcode from 'qrcode';

import ModalWrapper from '@/components/ui/ModalWrapper';

import { Button } from '@/components/ui/Button';
import type { Student } from '@/types/types';
import { UseMutationResult } from '@tanstack/react-query';

type propTypes = {
  isFound: boolean;
  isStudentModalOpen: boolean;
  setHasScanned: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStudentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  student: Student;
  studentMutation: UseMutationResult<{
    isFound: boolean;
    student: any;
  }>;
};

const StudentViewModal: React.FC<propTypes> = ({
  isStudentModalOpen,
  student,
  isFound,
  setIsStudentModalOpen,
  setHasScanned,
  studentMutation,
}) => {
  const [QrCodeElem, setQrCodeElem] = useState<string>('');

  useEffect(() => {
    const loadQrCode = async () => {
      const qrCode = await qrcode.toDataURL(student.uuid || 'sample', {
        scale: 10,
      });
      setQrCodeElem(qrCode);
    };

    void loadQrCode();
  }, [student.uuid]);

  const scanAgainButtonAction = () => {
    setIsStudentModalOpen(false);
    setHasScanned(false);
  };

  return (
    <Dialog.Root open={isStudentModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 bg-black/30 flex justify-center items-center z-[9999]">
          <Dialog.Content className="w-full h-[40rem] overflow-y-auto rounded bg-white flex justify-center items-center">
            <div className="w-full h-full flex flex-col items-center gap-8 bg-white p-4">
              <Button onClick={scanAgainButtonAction}>Scan Again</Button>
              {studentMutation.isSuccess ? (
                <div className="min-w-full flex items-center justify-center bg-white">
                  {isFound ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center gap-8 border-navyBlue mb-8 border-solid border-2 rounded-3xl p-12">
                      <div className="flex flex-col items-center gap-2">
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
                    <div className="text-navyBlue flex flex-col items-center justify-center text-center gap-2 rounded-lg p-5 ">
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
              ) : (
                <div className="w-full h-full">Loading...</div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StudentViewModal;
