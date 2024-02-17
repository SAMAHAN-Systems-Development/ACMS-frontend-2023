import { useState } from 'react';

import { TextField } from '@mui/material';

const InputFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor="file-input"
        className="px-1.5 py-2 font-bold text-[#181842] border-2 border-r-0 border-[#181842] cursor-pointer"
        style={{ backgroundColor: '#C4C4C4' }}
      >
        <input
          type="file"
          accept="*"
          hidden
          id="file-input"
          onChange={handleChange}
        />
        Choose File
      </label>
      <TextField
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
