'use client';

type propTypes = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  selectedFile: File | null;
};

const InputFile: React.FC<propTypes> = ({
  handleChange,
  selectedFile,
  label,
}) => {
  return (
    <div>
      <p className="font-medium text-navyBlue">{label}</p>
      <div className="flex items-center border-2 rounded border-[#181842] h-[2.3rem]">
        <div className="flex items-center bg-[#C4C4C4] h-full border-[#181842] border-r-2">
          <label
            htmlFor="file-input"
            className="font-bold text-[#181842] cursor-pointer whitespace-nowrap p-2"
          >
            <input
              type="file"
              accept="*"
              hidden
              id="file-input"
              onChange={(event) => handleChange(event)}
              className="w-full h-full"
            />
            Choose File
          </label>
        </div>
        <input
          className="flex-grow h-full px-4"
          value={selectedFile ? selectedFile.name : ''}
          disabled
        />
      </div>
    </div>
  );
};

export default InputFile;
