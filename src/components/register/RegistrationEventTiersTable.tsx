import React from 'react';

import dayjs from 'dayjs';

import type { EventTierRegistration } from '@/types/types';
import moneyFormatter from '@/utilities/moneyFormatter';

type propTypes = {
  eventTiers: EventTierRegistration[];
};

const getTicketsLeft = (eventTier: EventTierRegistration) => {
  switch (eventTier.name) {
    case 'VVIP':
      return 4;
    case 'Gold':
      return 60;
    case 'Silver':
      return 27;
    default:
      return eventTier.numberOfTicketsLeft;
  }
};

const RegistrationEventTiersTable: React.FC<propTypes> = ({ eventTiers }) => {
  const eventTierWithTicketsLeftTemp = eventTiers.map((eventTier) => {
    return {
      ...eventTier,
      numberOfTicketsLeft: getTicketsLeft(eventTier),
    };
  });
  const timeToCompareTo = dayjs('2024-04-08T13:00:00');
  const timeNow = dayjs();
  const hourDifference = timeNow.diff(timeToCompareTo, 'hour');
  const ticketsToDeduct = hourDifference * 1;

  const eventTierWithTicketsLeftDeducted = eventTierWithTicketsLeftTemp.map(
    (eventTier) => {
      if (
        eventTier.name === 'Bronze' ||
        eventTier.name === 'Gen Ad' ||
        eventTier.name === 'VVIP'
      ) {
        return {
          ...eventTier,
        };
      }
      const ticketLeft = eventTier.numberOfTicketsLeft - ticketsToDeduct;
      return {
        ...eventTier,
        numberOfTicketsLeft: ticketLeft > 0 ? ticketLeft : 0,
      };
    }
  );

  const eventTiersSorted = eventTierWithTicketsLeftDeducted.sort(
    (et1, et2) => et2.price - et1.price
  );

  return (
    <table className="w-full text-center">
      <thead className="border-b-2 border-brown">
        <tr>
          <th className="w-[30%] p-2 text-brown">Tier Name</th>
          <th className="w-[40%] p-2 text-brown">Price</th>
          <th className="w-[40%] p-2 text-brown">Number of tickets left</th>
        </tr>
      </thead>
      <tbody>
        {eventTiersSorted.map((eventTier: EventTierRegistration) => (
          <tr
            key={eventTier.id}
            className="border-t-2 border-brown hover:bg-lightBrown"
          >
            <td className="p-2 text-brown">{eventTier.name}</td>
            <td className="p-2 text-brown">
              {moneyFormatter(eventTier.price)}
            </td>
            <td className="p-2 text-brown">{eventTier.numberOfTicketsLeft}</td>
          </tr>
        ))}
        {eventTiers.length === 0 && (
          <tr>
            <td colSpan={4} className="text-center py-5">
              <p className="me-0">No tiers found</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RegistrationEventTiersTable;
