import React from 'react';

import {
  Select as BaseSelect,
  type SelectChangeEvent,
  styled,
} from '@mui/material';

const SelectStyle = styled(BaseSelect)({
  '& fieldset': {
    borderColor: '#724700',
    borderWidth: '2px',
    color: '#724700',
  },
  '& input': {
    fontFamily: 'Work Sans, sans-serif',
    color: '#724700',
  },
  '& .MuiSelect-select': {
    color: '#724700',
    fontFamily: 'Work Sans, sans-serif',
  },
});

type propTypes = {
  children: React.ReactNode;
  name: string;
  onChange: (event: SelectChangeEvent<unknown>) => void;
  value: string | number;
};

const Select: React.FC<propTypes> = ({ children, value, onChange, name }) => {
  return (
    <SelectStyle
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      name={name}
    >
      {children}
    </SelectStyle>
  );
};

export default Select;
