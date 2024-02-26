'use client';

import { TextField } from '@mui/material';

const InputFile = ({ handleChange, selectedFile }) => {
  return (
    <div className="flex items-center mt-4">
      <label
        htmlFor="file-input"
        className="px-1.5 py-2 font-bold text-[#181842] border-2 border-r-0 border-[#181842] cursor-pointer whitespace-nowrap"
        style={{ backgroundColor: '#C4C4C4' }}
      >
        <input
          type="file"
          accept="*"
          hidden
          id="file-input"
          onChange={(event) => handleChange(event)}
        />
        Choose File
      </label>
      <TextField
        fullWidth
        size="small"
        value={selectedFile ? selectedFile.name : ''}
        InputProps={{
          readOnly: true,
          style: {
            borderRadius: '0px',
            borderWidth: '2px',
          },
        }}
      />
    </div>
  );
};

export default InputFile;
