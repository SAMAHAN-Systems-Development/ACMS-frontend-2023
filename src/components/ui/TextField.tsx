import * as React from 'react';

import {TextField as BaseTextField} from '@mui/material';
import { styled } from '@mui/material/styles';

const TextField = styled(BaseTextField)({
  "& label.Mui-focused": {
    color: '#2B2B2B',
    fontWeight: 'bold',
    fontFamily: 'Work Sans, sans-serif',
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: '11px',
    "&.Mui-focused fieldset": {
      boxSizing: 'border-box',
      borderColor: '#181842',
      borderWidth: '2px',
    }
  },
  "& input": {
    fontWeight: 'bold',
    fontFamily: 'Work Sans, sans-serif',
  }
});

type TextFieldProps = {
  className: string,
  id: string,
  label: string
};

export default function CustomizedInputsStyled({ label, id, className }: TextFieldProps) {
  return (
      <TextField
        id={id}
        label={label}
        className={className}
        focused
      />
  );
}
