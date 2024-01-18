import type { Meta, StoryObj } from '@storybook/react';

import PaymentsCard from '@/components/payments/PendingPaymentsCard';

const meta: Meta<typeof PaymentsCard> = {
  title: 'payments/pending/AcceptedPaymentsCard',
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
      acceptButtonAction={() => {}}
      declineButtonAction={() => {}}
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
      acceptButtonAction={() => {}}
      declineButtonAction={() => {}}
      studentName="Jay Tan"
      paymentPhotoUrl="/placeholderImage.jpg"
      checked={false}
    />
  ),
};
