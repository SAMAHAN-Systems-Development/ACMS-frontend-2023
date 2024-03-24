import React from 'react';

import type { EventTierViewEvent } from '@/types/types';
import { VIEW_PORT_SIZES } from '@/utilities/constants';
import moneyFormatter from '@/utilities/moneyFormatter';
import useWindowSize from '@/utilities/useWindowSize';

type propTypes = {
  eventTiers: EventTierViewEvent[];
};

const EventTierTable: React.FC<propTypes> = ({ eventTiers }) => {
  const { width } = useWindowSize();
  const isWidthSmall = width < VIEW_PORT_SIZES.sm;

  return (
    <table className="w-full text-center">
      <thead className="border-b-2">
        <tr>
          <th className="w-[20%] sm:p-2">Tier Name</th>
          <th className="w-[15%] sm:p-2">AdDU Price</th>
          <th className="w-[15%] sm:p-2">Non-AdDU Price</th>
          <th className="w-[15%] sm:p-2">Crowd Limit</th>
          <th className="w-[2 0%] sm:p-2 break-all">
            {isWidthSmall ? 'Registrants' : 'Number Of People Registered'}
          </th>
          <th className="w-[15%] sm:p-2 break-all">
            {isWidthSmall ? 'Tickets Left' : 'Number Of Tickets Left'}
          </th>
        </tr>
      </thead>
      <tbody>
        {eventTiers.map((eventTier: EventTierViewEvent) => (
          <tr
            key={eventTier.id}
            className="even:bg-slate-600 odd:bg-slate-400 border-t-2 hover:bg-blue"
          >
            <td className="p-2">{eventTier.name}</td>
            <td className="p-2">{moneyFormatter(eventTier.adduPrice)}</td>
            <td className="p-2">{moneyFormatter(eventTier.nonAdduPrice)}</td>
            <td className="p-2">{eventTier.crowdLimit}</td>
            <td className="p-2">{eventTier.numberOfPeopleRegistered}</td>
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

export default EventTierTable;
