'use client';

import { useState } from 'react';

import { TextField } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const InputFile = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://acms-backend-2023.onrender.com';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcWxveHB5a25xY2NyZXR6b3l0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzMDI1NjgsImV4cCI6MjAxNzg3ODU2OH0.s4upzMGDuRJ4l-kRK0HMCB6_iSy1ZKATYnzBW2dnoWA';
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = async (event: any) => {
    setSelectedFile(event.target.files[0]);
    try {
      const {} = await supabase.storage.createBucket('payments');
      if (selectedFile) {
        const { data, error } = await supabase.storage
          .from('payments')
          .upload(selectedFile.name, selectedFile);
        if (error) {
          console.error('Error uploading file:', error);
        } else {
          console.log('File uploaded successfully: ', data);
        }
      }
    } catch (error) {
      console.error('Error during file upload:', error);
    }
  };

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
          onChange={handleChange}
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
