import * as React from 'react';

import { TextField as BaseTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextFieldStyle = styled(BaseTextField)({
  '& label.Mui-focused': {
    color: '#724700',
    fontFamily: 'Work Sans, sans-serif',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    '&.Mui-focused fieldset': {
      boxSizing: 'border-box',
      borderColor: '#724700',
      borderWidth: '2px',
    },

    '& fieldset': {
      borderColor: '#724700',
      borderWidth: '2px',
      color: '#724700',
    },
  },
  '& input': {
    fontFamily: 'Work Sans, sans-serif',
    color: '#724700',
  },
});

type TextFieldProps = {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  className?: string;
  defaultValue?: string;
  id?: string;
  type?: string;
};

export default function TextField({
  label,
  id,
  className,
  type = 'text',
  onChange,
  name,
  value,
}: TextFieldProps) {
  return (
    <TextFieldStyle
      id={id}
      label={label}
      type={type}
      onChange={onChange}
      value={value}
      className={className}
      name={name}
      size="small"
      fullWidth
    />
  );
}
