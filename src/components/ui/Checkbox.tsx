import type { ChangeEvent } from 'react';
import React from 'react';

const Checkbox = ({
  checked,
  onCheckedAction,
}: {
  checked: boolean;
  onCheckedAction: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheckedAction}
        className="checkbox w-5 h-5 rounded-md   border-blue border-2 checked:border-0 [--chkbg:theme(colors.navyBlue)] [--chkfg:theme(colors.white)]"
      />
    </div>
  );
};

export default Checkbox;
