import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;
type StoryType = StoryObj<typeof Button>;

export const Default: StoryType = {
  name: 'Button',
  args: {},
  render: (args) => <Button {...args} />,
};
