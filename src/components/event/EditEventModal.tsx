import React, { useEffect } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import TextField from '@/components/ui/TextField';
import type { EventDTO } from '@/types/types';
import DatePicker from '@/components/ui/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

type propTypes = {
  event: EventDTO;
  isModalOpen: boolean;
  setIstModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditEventModal: React.FC<propTypes> = ({
  isModalOpen,
  setIstModalOpen,
  event,
}) => {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    date: dayjs(),
    price: '',
    max_participants: 0,
    requires_payment: false,
  });

  // useEffect(() => {
  //   setFormData({
  //     title: event.title,
  //     description: event.description,
  //     date: event.date,
  //     price: event.price,
  //     max_participants: event.max_participants,
  //     requires_payment: event.requires_payment,
  //   });
  // }, [event]);

  const formDataOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const dateOnChange = (date: Dayjs) => {
    console.log(date);
    // setFormData({ ...formData, date });
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <Dialog.Root open={isModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 right-0 bottom-0 left-0 bg-black/30 flex justify-center items-center z-[0]">
          <Dialog.Content className="w-full h-[40rem] max-w-[50rem] overflow-y-auto rounded bg-white flex justify-center items-center">
            <div className="w-full h-full flex flex-col items-center gap-8 bg-white p-4">
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                  label="Event Title"
                  name="title"
                  value={formData.title}
                  onChange={formDataOnChange}
                />
                <TextArea
                  label="Event Description"
                  name="description"
                  value={formData.description}
                  onChange={formDataOnChange}
                />
                <DatePicker
                  value={formData.date}
                  onChange={dateOnChange}
                  label="Event Date"
                  name="date"
                />
                <TextField
                  label="Crowd Limit"
                  name="max_participants"
                  type="number"
                  value={formData.max_participants}
                  onChange={formDataOnChange}
                />
                <Button
                  onClick={() => {
                    setIstModalOpen(false);
                  }}
                >
                  Close
                </Button>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditEventModal;
