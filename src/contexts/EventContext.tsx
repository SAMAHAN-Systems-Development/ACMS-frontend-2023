'use client';
import React, { createContext, useContext, useState } from 'react';

type eventContextProps = {
  currentEventEditId: number;
  isEditEventModalOpen: boolean;
  setCurrentEventEditId: React.Dispatch<React.SetStateAction<number>>;
  setIsEditEventModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EventContext = createContext<eventContextProps>({
  isEditEventModalOpen: false,
  setIsEditEventModalOpen: () => {},
  currentEventEditId: 1,
  setCurrentEventEditId: () => {},
});

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [isEditEventModalOpen, setIsEditEventModalOpen] =
    useState<boolean>(false);

  const [currentEventEditId, setCurrentEventEditId] = useState<number>(1);

  return (
    <EventContext.Provider
      value={{
        isEditEventModalOpen,
        setIsEditEventModalOpen,
        currentEventEditId,
        setCurrentEventEditId,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  return useContext(EventContext);
}
