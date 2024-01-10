import type { Meta, StoryObj } from '@storybook/react';

import PaymentsPage from '@/components/payments/PaymentsPage';
import type Payment from '@/types/Payment';

const meta: Meta<typeof PaymentsPage> = {
  title: 'payments/accepted/Page',
  component: PaymentsPage,
};

export default meta;
type Story = StoryObj<typeof PaymentsPage>;

const listOfAcceptedPayments: Payment[] = [
  {
    id: 'sample-id-1',
    eventPrice: '100',
    eventTitle: 'Codes 1',
    studentName: 'Jay',
    paymentPhotoUrl: '/placeholderImage.jpg',
  },
  {
    id: 'sample-id-2',
    eventPrice: '200',
    eventTitle: 'Codes 2',
    studentName: 'Inhahnn',
    paymentPhotoUrl: '/placeholderImage.jpg',
  },
];

const restoreButtonAction = (ids: string[]) => {
  ids;
};

export const Primary: Story = {
  render: () => (
    <PaymentsPage
      listOfPayments={listOfAcceptedPayments}
      restoreButtonAction={restoreButtonAction}
    />
  ),
};
