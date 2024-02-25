import type { Meta } from '@storybook/react';

import FacilitatorHomePage from '@/components/home/FacilitatorHomePage';

const meta: Meta<typeof FacilitatorHomePage> = {
  title: 'Events Facilitator Page',
  component: FacilitatorHomePage,
};

export default meta;

export const Page = () => <FacilitatorHomePage />;
