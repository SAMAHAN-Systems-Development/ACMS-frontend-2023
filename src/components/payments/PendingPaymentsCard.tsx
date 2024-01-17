import React from 'react';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

type propTypes = {
  eventTitle: string;
  studentName: string;
  acceptButtonAction?: () => void;
  checked?: boolean;
  declineButtonAction?: () => void;
  eventPrice?: string;
  onCheckedAction?: () => void;
  paymentPhotoUrl?: string | StaticImageData;
};

const PendingPaymentsCard: React.FC<propTypes> = ({
  eventTitle,
  studentName,
  eventPrice,
  paymentPhotoUrl,
  onCheckedAction,
  declineButtonAction,
  acceptButtonAction,
  checked,
}) => {
  return (
    <button
      onClick={() => {
        onCheckedAction && onCheckedAction();
      }}
      className={`w-[23.8125rem] h-[33.1875rem] border-2 rounded-lg drop-shadow-md p-8 ${
        !onCheckedAction ? 'hover:cursor-default' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="grid justify-items-start">
          <div className="text-lg font-bold ">{eventTitle}</div>
          <div className="text-lg ">{studentName}</div>
        </div>
        {onCheckedAction && (
          <div className="flex items-end">
            <input type="checkbox" checked={checked} readOnly />
          </div>
        )}
      </div>
      <div className="py-2">
        <div className="text-md font-bold">{eventPrice}</div>
        <Image
          className="border-2 object-cover"
          src={paymentPhotoUrl || '/placeholderImage.jpg'}
          alt="Payment Photo"
          width={310}
          height={300}
        />
        <p className="flex text-sm mt-2 text-gray-400">Payment Photo</p>
      </div>

      <div className="flex items-center justify-between">
        {acceptButtonAction && (
          <div>
            <button
              className="px-4 py-2 text-sm font-bold text-white bg-[#181842] rounded-md hover:bg-[#99A0B8]"
              onClick={(event) => {
                event.stopPropagation();
                acceptButtonAction();
              }}
            >
              Accept
            </button>
          </div>
        )}
        {declineButtonAction && (
          <div>
            <button
              className="px-4 py-2 text-sm font-bold text-white bg-[#181842] rounded-md hover:bg-[#99A0B8]"
              onClick={(event) => {
                event.stopPropagation();
                declineButtonAction();
              }}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </button>
  );
};

export default PendingPaymentsCard;
