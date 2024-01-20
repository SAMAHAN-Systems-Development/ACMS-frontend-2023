import type { FC } from 'react';
import React from 'react';

type ButtonProps = {
  text: string;
};

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <div className="bg-red-500 font-bold capitalize w-fit py-2 px-4 rounded-xl">
      {text}
    </div>
  );
};

export default Button;
