import { EventsFacilitatorPage } from "@/components/events-facilitator/EventsFacilitatorPage";
import { Meta } from "@storybook/react";

const meta: Meta<typeof EventsFacilitatorPage> = {
    title: "Events Facilitator Page",
    component: EventsFacilitatorPage
};

export default meta

export const Page = () => <EventsFacilitatorPage />