import type { Meta, StoryObj } from '@storybook/react';

import InactiveEventCard from '@/components/event/EventCard';

const meta: Meta<typeof InactiveEventCard> = {
    title: 'event/inactive/InactiveEventCard',
    component: InactiveEventCard,
};

export default meta;
type Story = StoryObj<typeof InactiveEventCard>;

export const Example: Story = {
    render: () => (
        <InactiveEventCard
            id="1"
            onActivate={() => { }}
            onEdit={() => { }}
            eventTitle="Code in the Dark"
        />
    ),
};
