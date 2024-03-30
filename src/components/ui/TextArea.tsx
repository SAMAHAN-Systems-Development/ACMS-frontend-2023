import * as React from 'react';

import { TextField as BaseTextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextAreaStyle = styled(BaseTextField)({
  '& label.Mui-focused': {
    color: '#724700',
    fontFamily: 'Work Sans, sans-serif',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    minHeight: '120px',
    display: 'flex',
    alignItems: 'flex-start',
    '&.Mui-focused fieldset': {
      boxSizing: 'border-box',
      borderColor: '#724700',
      borderWidth: '2px',
    },
  },
  '& fieldset': {
    borderColor: '#724700',
    borderWidth: '2px',
    color: '#724700',
  },
  '& input': {
    fontFamily: 'Work Sans, sans-serif',
    color: '#724700',
  },
});

type TextAreaProps = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  id?: string;
  label?: string;
  type?: string;
};

export default function TextArea({
  label,
  id,
  className,
  value,
  onChange,
  name,
  type = 'text',
}: TextAreaProps) {
  return (
    <TextAreaStyle
      id={id}
      label={label}
      className={className}
      multiline
      value={value}
      onChange={onChange}
      name={name}
      type={type}
      fullWidth
    />
  );
}
