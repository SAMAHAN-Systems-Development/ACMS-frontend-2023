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
      return 98;
    case 'Gold':
      return 358;
    case 'Silver':
      return 135;
    default:
      return eventTier.numberOfTicketsLeft;
  }
};

const RegistrationEventTiersTable: React.FC<propTypes> = ({ eventTiers }) => {
  return (
    <table className="w-full text-center">
      <thead className="border-b-2 border-brown">
        <tr>
          <th className="w-[20%] p-2 text-brown">Tier Name</th>
          <th className="w-[25%] p-2 text-brown">Price</th>
          <th className="w-[25%] p-2 text-brown">Tickets Left</th>
        </tr>
      </thead>
      <tbody>
        {eventTiers.map((eventTier: EventTierRegistration) => (
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
