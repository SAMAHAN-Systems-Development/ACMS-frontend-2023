import React from 'react';
import Link from 'next/link';

import PaymentsModal from '@/components/payments/PaymentsModal';
import Button from '@/components/ui/Button';
import * as StudentsTable from '@/components/ui/StudentsTable.client';

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

const getEventData = async (id: string) => {
  const response = await fetch(`${backendUrl}/event/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch event data!');
  }

  return response.json();
};

const getPaymentsData = async (id: string, paymentType: string) => {
  const response = await fetch(`${backendUrl}/payment/${paymentType}`);

  if (!response.ok) {
    throw new Error('Failed to fetch event payments data!');
  }

  return response.json();
};

const EventsPage = async ({ params }: { params: { id: string } }) => {
  const eventData = await getEventData(params.id);
  const acceptedPayments = await getPaymentsData(params.id, 'accepted');
  const declinedPayments = await getPaymentsData(params.id, 'declined');

  return (
    <div className="container mx-auto">
      <div className="w-full lg:w-1/2 my-10">
        <h1 className="text-3xl">{eventData.title}</h1>
        <p className="mb-3 text-xl">{eventData.price}</p>
        <p>{eventData.description}</p>

        <div className="my-3 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <Link href={`/events/${eventData.form_name}/register`}>
            <Button text="View Form" />
          </Link>
          <PaymentsModal type={'accepted'} listOfPayments={acceptedPayments} />
          <PaymentsModal type={'declined'} listOfPayments={declinedPayments} />
        </div>
      </div>

      <div className="my-10">
        <StudentsTable.default list={eventData.students} />
      </div>
    </div>
  );
};

export default EventsPage;
