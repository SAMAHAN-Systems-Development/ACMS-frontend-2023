import React from 'react';

type propTypes = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
};

const PaymentButton: React.FC<propTypes> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 text-sm font-bold text-white bg-navyBlue rounded-md w-max"
    >
      {children}
    </button>
  );
};

export default PaymentButton;
