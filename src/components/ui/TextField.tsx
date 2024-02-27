import * as React from 'react';

import { TextField as BaseTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextFieldStyle = styled(BaseTextField)({
  '& label.Mui-focused': {
    color: '#2B2B2B',
    fontFamily: 'Work Sans, sans-serif',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    '&.Mui-focused fieldset': {
      boxSizing: 'border-box',
      borderColor: '#181842',
      borderWidth: '2px',
    },

    '& fieldset': {
      borderColor: '#181842',
      borderWidth: '2px',
      color: '#181842',
    },
  },
  '& input': {
    fontWeight: 'bold',
    fontFamily: 'Work Sans, sans-serif',
    color: '#181842',
  },
});

type TextFieldProps = {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent) => void;
  value: string;
  className?: string;
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
}: TextFieldProps) {
  return (
    <TextFieldStyle
      id={id}
      label={label}
      type={type}
      onChange={onChange}
      className={className}
      name={name}
      size="small"
      fullWidth
      sx={{ borderColor: '#181842' }}
    />
  );
}
