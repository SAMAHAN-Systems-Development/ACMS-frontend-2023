import React from 'react';

import type { FormData } from '@/components/event/AddEventPage';
import TextField from '@/components/ui/TextField';
import type { EventTierPayment } from '@/types/types';

type propTypes = {
  eventTier: EventTierPayment;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const EventTierField: React.FC<propTypes> = ({
  eventTier,
  formData,
  setFormData,
}) => {
  const handleEventTierFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      eventTiers: formData.eventTiers.map((tier) => {
        if (tier.id === eventTier.id) {
          return {
            ...tier,
            [event.target.name]: Number(event.target.value),
          };
        }
        return tier;
      }),
    });
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-lg font-bold">{eventTier.name}</h3>
      <div className="flex flex-col gap-4">
        <TextField
          label="Crowd Limit"
          name={`max_participants`}
          onChange={handleEventTierFieldChange}
          value={
            formData.eventTiers.find((tier) => tier.id === eventTier.id)
              ?.max_participants || 0
          }
        />

        {Boolean(formData.requires_payment) && (
          <div className="flex gap-4">
            <TextField
              label="AdDU Price"
              name={`adduPrice`}
              onChange={handleEventTierFieldChange}
              value={
                formData.eventTiers.find((tier) => tier.id === eventTier.id)
                  ?.adduPrice || 0
              }
            />
            <TextField
              label="Non-AdDU Price"
              name={`nonAdduPrice`}
              onChange={handleEventTierFieldChange}
              value={
                formData.eventTiers.find((tier) => tier.id === eventTier.id)
                  ?.nonAdduPrice || 0
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTierField;
