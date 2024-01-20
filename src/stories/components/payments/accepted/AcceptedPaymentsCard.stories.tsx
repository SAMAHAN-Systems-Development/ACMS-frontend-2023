import type { Meta, StoryObj } from '@storybook/react';

import PaymentsCard from '@/components/payments/PaymentsCard';

const meta: Meta<typeof PaymentsCard> = {
  title: 'payments/accepted/AcceptedPaymentsCard',
  component: PaymentsCard,
};

export default meta;
type Story = StoryObj<typeof PaymentsCard>;

export const Checked: Story = {
  render: () => (
    <PaymentsCard
      eventPrice="100"
      eventTitle="Code in the Dark"
      onCheckedAction={() => {}}
      restoreButtonAction={() => {}}
      studentName="Jay Tan"
      paymentPhotoUrl="/placeholderImage.jpg"
      checked={true}
    />
  ),
};

export const NotChecked: Story = {
  render: () => (
    <PaymentsCard
      eventPrice="100"
      eventTitle="Code in the Dark"
      onCheckedAction={() => {}}
      restoreButtonAction={() => {}}
      studentName="Jay Tan"
      paymentPhotoUrl="/placeholderImage.jpg"
      checked={false}
    />
  ),
};
