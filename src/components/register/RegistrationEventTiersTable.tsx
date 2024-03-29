import React from 'react';

import type { EventTierRegistration } from '@/types/types';
import moneyFormatter from '@/utilities/moneyFormatter';

type propTypes = {
  eventTiers: EventTierRegistration[];
};

const RegistrationEventTiersTable: React.FC<propTypes> = ({ eventTiers }) => {
  const eventTiersSorted = eventTiers.sort((et1, et2) => et2.price - et1.price);

  return (
    <table className="w-full text-center">
      <thead className="border-b-2">
        <tr>
          <th className="w-[20%] p-2">Tier Name</th>
          <th className="w-[15%] p-2">Price</th>
          <th className="w-[15%] p-2">Number of tickets left</th>
        </tr>
      </thead>
      <tbody>
        {eventTiersSorted.map((eventTier: EventTierRegistration) => (
          <tr
            key={eventTier.id}
            className="even:bg-slate-600 odd:bg-slate-400 border-t-2 hover:bg-blue"
          >
            <td className="p-2">{eventTier.name}</td>
            <td className="p-2">{moneyFormatter(eventTier.price)}</td>
            <td className="p-2">{eventTier.numberOfTicketsLeft}</td>
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
