import * as React from 'react';

import { styled } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as BaseDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';

const DatePickerStyle = styled(BaseDatePicker)({
  '& label.Mui-focused': {
    color: '#2B2B2B',
    fontFamily: 'Work Sans, sans-serif',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      boxSizing: 'border-box',
      borderColor: '#181842',
      borderWidth: '2px',
    },
  },
  '& fieldset': {
    borderColor: '#181842',
    borderWidth: '2px',
    color: '#181842',
  },
});

type propTypes = {
  label: string;
  name: string;
  onChange: any;
  value: Dayjs | null;
};

const DatePicker: React.FC<propTypes> = ({ label, name, onChange, value }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerStyle
        label={label}
        name={name}
        onChange={onChange}
        value={value}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
