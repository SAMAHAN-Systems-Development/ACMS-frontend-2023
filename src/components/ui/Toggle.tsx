import React from 'react';

import { styled } from '@mui/material/styles';
import type { SwitchProps } from '@mui/material/Switch';
import Switch from '@mui/material/Switch';

type propTypes = {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  labelBesideToggle?: string;
  labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
};

export const Toggle: React.FC<propTypes> = ({
  value,
  onChange,
  label,
  name,
  labelPlacement = 'end',
  labelBesideToggle = '',
}) => {
  const classNamebyLabelPlacement = () => {
    if (labelPlacement === 'start') return 'flex-row items-center';
    if (labelPlacement === 'end') return 'flex-row-reverse items-center';
    if (labelPlacement === 'top') return 'flex-col';
    return 'flex-col-reverse';
  };

  return (
    <div className={`flex ${classNamebyLabelPlacement()} gap-2`}>
      <h3 className="text-md text-brown">{label}</h3>
      <div className="flex gap-2 items-center">
        <IOSSwitch
          checked={value}
          onChange={onChange}
          sx={{ margin: 1 }}
          name={name}
        />
        <h3 className="text-md text-brown font-bold">{labelBesideToggle}</h3>
      </div>
    </div>
  );
};

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#EBEBE4' : '#724700',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#EBEBE4' : '#724700',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
