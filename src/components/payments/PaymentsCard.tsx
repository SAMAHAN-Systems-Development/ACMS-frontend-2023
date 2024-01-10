import React from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

type propTypes = {
  checked: boolean;
  eventTitle: string;
  onCheckedAction: () => void;
  restoreButtonAction: () => void;
  studentName: string;
  eventPrice?: string;
  paymentPhotoUrl?: string | StaticImageData;
};

const PaymentsCard: React.FC<propTypes> = ({
  eventTitle,
  studentName,
  eventPrice,
  paymentPhotoUrl,
  restoreButtonAction,
  onCheckedAction,
  checked,
}) => {
  return (
    <button className="border-4" onClick={onCheckedAction}>
      <input type="checkbox" checked={checked} />
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="flex items-center justify-center w-full h-20">
          <Image
            className="object-cover w-20 h-20 rounded-full"
            src={paymentPhotoUrl || '/placeholderImage.jpg'}
            alt="Payment Photo"
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="text-lg font-bold text-center">{eventTitle}</div>
          <div className="text-sm text-center">{studentName}</div>
          <div className="text-sm text-center">{eventPrice}</div>
        </div>
        <div className="flex items-center justify-center w-full h-20">
          <button
            className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full"
            onClick={(event) => {
              event.stopPropagation();
              restoreButtonAction();
            }}
          >
            Restore
          </button>
        </div>
      </div>
    </button>
  );
};

export default PaymentsCard;
