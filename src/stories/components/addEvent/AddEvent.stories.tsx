import type { Meta, StoryObj } from "@storybook/react";

import AddEvent from "@/components/addEvent/AddEvent";

const meta: Meta<typeof AddEvent> = {
    title: "Components/Add Event",
    component: AddEvent
}

export default meta
type Story = StoryObj<typeof AddEvent>;

export const Example: Story = {
    render: () => (
        <AddEvent />
    ),
};