import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

type propTypes = {
  isModalOpen: boolean;
};

const RegisterLoadingModal: React.FC<propTypes> = ({ isModalOpen }) => {
  return (
    <Dialog.Root open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 bg-black/30 flex justify-center items-center z-[9999]">
          <Dialog.Content className="w-full h-[15rem] max-w-[20rem] overflow-y-auto rounded-md bg-white flex justify-center items-center">
            <div className="w-full h-full flex flex-col items-center gap-8 bg-white p-4">
              <div className="flex flex-col gap-4 items-center h-full pt-4">
                <p className="text-lg font-bold text-center">
                  The Registration is being processed...
                </p>
                <p className="text-center text-md font-normal">
                  Please wait, Thank you.
                </p>
                <svg
                  className="animate-spin h-7 w-7 text-brown text-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RegisterLoadingModal;
