'use client';

import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

type ModalWrapperProps = {
  children: React.ReactNode;
};

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 bg-black/30 flex justify-center items-center z-[9999]">
      <Dialog.Content className="w-full h-[50rem] max-w-[80rem] overflow-y-auto rounded bg-white flex justify-center items-center">
        {children}
      </Dialog.Content>
    </Dialog.Overlay>
  );
};

export default ModalWrapper;
