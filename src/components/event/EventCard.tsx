import React from 'react';
import { useRouter } from 'next/navigation';

import PaymentButton from '@/components/payments/PaymentButton';

interface EventCardProps {
  eventDescription: string;
  eventId: string;
  eventPrice: string;
  eventTitle: string;
  maxParticipants: number;
  numberOfParticipantsRegistered: number;
  hasActivateButton?: boolean;
  hasDeactivateButton?: boolean;
  hasEditButton?: boolean;
  hasScanQrButton?: boolean;
  hasViewButton?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  eventId,
  eventTitle,
  eventPrice,
  maxParticipants,
  numberOfParticipantsRegistered,
  eventDescription,
  hasViewButton,
  hasEditButton,
  hasActivateButton,
  hasDeactivateButton,
  hasScanQrButton,
}) => {
  const router = useRouter();

  const descriptionLength = eventTitle.length > 50 ? 100 : 150;

  const editedDescription =
    eventDescription.length > descriptionLength
      ? eventDescription.slice(0, descriptionLength) + '...'
      : eventDescription;

  const viewButtonOnClick = () => {
    router.push(`/event/view/${eventId}`);
  };

  const editButtonOnClick = () => {
    router.push(`/event/edit/${eventId}`);
  };

  return (
    <div className="relative w-[29rem] md:h-[22rem] h-auto rounded-xl border-blue border-2 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col p-4 gap-4 justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between md:mb-4">
            <h2 className="font-bold text-lg sm:text-xl">{eventTitle}</h2>
            <h2 className="font-bold text-l">{eventPrice}</h2>
          </div>
          <div className="flex flex-col">
            <p className="text-sm sm:text-md">
              Crowd Limit: <span className="font-bold">{maxParticipants}</span>
            </p>
            <p className="text-sm sm:text-md">
              Students Registered:{' '}
              <span className="font-bold">
                {numberOfParticipantsRegistered}
              </span>
            </p>
          </div>

          <p className="text-sm sm:text-md">{editedDescription}</p>
        </div>
        <div className="flex gap-4">
          {hasScanQrButton && (
            <PaymentButton onClick={() => {}}>Scan Qr</PaymentButton>
          )}
          {hasViewButton && (
            <PaymentButton onClick={viewButtonOnClick}>View</PaymentButton>
          )}
          {hasEditButton && (
            <PaymentButton onClick={editButtonOnClick}>Edit</PaymentButton>
          )}
          {hasActivateButton && (
            <PaymentButton onClick={() => {}}>Activate</PaymentButton>
          )}
          {hasDeactivateButton && (
            <PaymentButton onClick={() => {}}>Deactivate</PaymentButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
