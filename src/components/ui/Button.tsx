import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  type?: string;
}

const Button: React.FC<Props> = ({
  children,
  type = 'primary',
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 text-slate-50 font-semibold rounded-lg  
        ${
          type === 'primary' && !isDisabled
            ? 'bg-navyBlue text-white'
            : isDisabled
            ? 'bg-blue text-white border-none cursor-not-allowed disabled'
            : 'bg-white text-navyBlue border-solid border-navyBlue border-2'
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
