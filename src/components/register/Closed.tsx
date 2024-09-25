'use client';
import React from 'react';
import Image from 'next/image';

import { VIEW_PORT_SIZES } from '@/utilities/constants';
import useWindowSize from '@/utilities/useWindowSize';

const getImageSrcByViewportSize = (width: number) => {
  if (width >= VIEW_PORT_SIZES.md) {
    return '/botb/RegisHeader_LG.png';
  }
  if (width >= VIEW_PORT_SIZES.sm) {
    return '/botb/RegisHeader_MD.png';
  }

  return '/botb/RegisHeader_SM.png';
};

const Closed = () => {
  const { width } = useWindowSize();

  return (
    <div className="w-full">
      <Image
        src={getImageSrcByViewportSize(width)}
        alt="Cover Photo"
        width={3000}
        height={3000}
        className="w-full"
      />
      <div className="flex flex-col items-center border-y-2 py-5 px-4">
        <h1 className="font-semibold md:text-5xl text-4xl px-4 text-center">
          Battle of the Bands 2024
        </h1>
        <h1 className="font-semibold md:text-2xl text-xl text-center">
          Registration Form
        </h1>
      </div>
      <div className="flex xl:flex-row flex-col xl:gap-12 justify-center items-start mt-12">
        <div className="flex justify-center md:mt-0 px-4 xl:w-fit w-full">
          <div className="flex flex-col gap-4 justify-center">
            <div className="flex flex-col gap-2 p-4 border-2 rounded-xl">
              <h2 className=" md:pl-8 mb-2 text-2xl font-bold">
                The online ticket selling has been closed. F2F Ticket Selling
                will be held at Arrupe Hall 10AM onwards.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closed;
