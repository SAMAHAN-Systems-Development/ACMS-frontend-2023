import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <p className="text-3xl font-bold text-goldenBrown">ACMS is loading</p>
      <span className="loading loading-dots loading-lg w-[3rem] text-goldenBrown" />
    </div>
  );
};

export default Loading;
