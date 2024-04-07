import React from 'react';

import dayjs from 'dayjs';

import type { EventTierRegistration } from '@/types/types';
import moneyFormatter from '@/utilities/moneyFormatter';

type propTypes = {
  eventTiers: EventTierRegistration[];
};

const ticketsLeftTemp: { [key: string]: { ticketsLeft: number } } = {
  VVIP: {
    ticketsLeft: 31,
  },
  Gold: {
    ticketsLeft: 86,
  },
  Silver: {
    ticketsLeft: 53,
  },
  Bronze: {
    ticketsLeft: 1,
  },
  'Gen Ad': {
    ticketsLeft: 1,
  },
};

const RegistrationEventTiersTable: React.FC<propTypes> = ({ eventTiers }) => {
  const eventTierWithTicketsLeftTemp = eventTiers.map((eventTier) => {
    return {
      ...eventTier,
      numberOfTicketsLeft: ticketsLeftTemp[eventTier.name].ticketsLeft,
    };
  });
  const timeToCompareTo = dayjs('2024-04-07T17:00:00');
  const timeNow = dayjs();
  const hourDifference = timeNow.diff(timeToCompareTo, 'hour');
  const ticketsToDeduct = hourDifference * 3;

  const eventTierWithTicketsLeftDeducted = eventTierWithTicketsLeftTemp.map(
    (eventTier) => {
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
