import React from 'react';

const Checkbox = ({
  checked,
  onCheckedAction,
}: {
  checked: boolean;
  onCheckedAction: () => void;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id="some_id"
        checked={checked}
        onChange={onCheckedAction}
        className="relative peer shrink-0 appearance-none w-5 h-5 border-2 border-blue-500 rounded-md bg-white mt-1 checked:bg-navyBlue checked:border-0 cursor-pointer"
      />
      <svg
        className="absolute w-5 h-5 mt-1 hidden peer-checked:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

export default Checkbox;
