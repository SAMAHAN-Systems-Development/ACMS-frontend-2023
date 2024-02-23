import * as React from 'react';

import {TextField as BaseTextField} from '@mui/material';
import { styled } from '@mui/material/styles';

const TextArea = styled(BaseTextField)({
  "& label.Mui-focused": {
    color: '#2B2B2B',
    fontWeight: 'bold',
    fontFamily: 'Work Sans, sans-serif',
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: '11px',
    minHeight: '120px',
    display: 'flex',
    alignItems: 'flex-start',
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

type TextAreaProps = {
  className: string,
  id: string,
  label: string
};

export default function CustomizedInputsStyled({ label, id, className }: TextAreaProps) {
  return (
      <TextArea
        id={id}
        label={label}
        className={className}
        focused
        multiline
      />
  );
}