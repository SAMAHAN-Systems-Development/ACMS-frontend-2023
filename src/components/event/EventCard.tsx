import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PaymentButton from '@/components/payments/PaymentButton';
import type { Event } from '@/types/types';
import { activateEvents, inactivateEvents } from '@/utilities/fetch/event';
import moneyFormatter from '@/utilities/moneyFormatter';

type propTypes = {
  event: Event;
  eventPageType: 'active' | 'inactive';
  page: number;
  hasActivateButton?: boolean;
  hasDeactivateButton?: boolean;
  hasEditButton?: boolean;
  hasScanQrButton?: boolean;
  hasViewButton?: boolean;
};

const EventCard: React.FC<propTypes> = ({
  event,
  eventPageType,
  page,
  hasViewButton,
  hasEditButton,
  hasActivateButton,
  hasDeactivateButton,
  hasScanQrButton,
}) => {
  const router = useRouter();
  const tokenQuery = useQuery<string>({
    queryKey: ['jwt'],
  });

  const token = tokenQuery.data || '';
  const queryClient = useQueryClient();

  const deactivateEventsMutation = useMutation({
    mutationFn: async () => {
      await inactivateEvents(token, event.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['events', eventPageType, { page }],
        exact: true,
      });
      toast.success('Event deactivated successfully');
    },
  });

  const activateEventsMutation = useMutation({
    mutationFn: async () => {
      await activateEvents(token, event.id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['events', eventPageType, { page }],
        exact: true,
      });
      toast.success('Event activated successfully');
    },
  });
  const descriptionLength = event.title.length > 50 ? 100 : 150;

  const editedDescription =
    event.description.length > descriptionLength
      ? event.description.slice(0, descriptionLength) + '...'
      : event.description;

  const viewButtonOnClick = () => {
    router.push(`/event/view/${event.id}`);
  };

  const editButtonOnClick = () => {
    router.push(`/event/edit/${event.id}`);
  };

  const deactivateButtonAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    deactivateEventsMutation.mutate();
  };

  const activateButtonAction = (event: React.MouseEvent) => {
    event.stopPropagation();
    activateEventsMutation.mutate();
  };

  const scanQrButtonAction = () => {
    router.push(`/event/qr-scan/${event.id}`);
  };

  return (
    <div className="relative md:w-[25rem] w-[22rem] md:h-[22rem] h-auto rounded-xl border-blue border-2 shadow-[2px_0px_4px_0px_rgba(0,0,0,0.25),0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col p-4 gap-4 justify-between h-full">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between items-center md:mb-4">
            <h2 className="font-bold text-lg sm:text-xl">{event.title}</h2>
            <h2 className="font-bold text-l text-right">
              {moneyFormatter(event.price)}
            </h2>
          </div>
          <div className="flex flex-col">
            <p className="text-sm sm:text-md">
              Crowd Limit:{' '}
              <span className="font-bold">{event.max_participants}</span>
            </p>
            <p className="text-sm sm:text-md">
              Students Registered:{' '}
              <span className="font-bold">{event.students.length}</span>
            </p>
          </div>

          <p className="text-sm sm:text-md">{editedDescription}</p>
        </div>
        <div className="flex gap-4">
          {hasScanQrButton && (
            <PaymentButton onClick={scanQrButtonAction}>Scan QR</PaymentButton>
          )}
          {hasViewButton && (
            <PaymentButton onClick={viewButtonOnClick}>View</PaymentButton>
          )}
          {hasEditButton && (
            <PaymentButton onClick={editButtonOnClick}>Edit</PaymentButton>
          )}
          {hasActivateButton && (
            <PaymentButton onClick={activateButtonAction}>
              Activate
            </PaymentButton>
          )}
          {hasDeactivateButton && (
            <PaymentButton onClick={deactivateButtonAction}>
              Deactivate
            </PaymentButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
