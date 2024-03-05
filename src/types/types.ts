import type { Dayjs } from 'dayjs';

export type Student = {
  createdAt: string;
  email: string;
  event: Event;
  eventId: number;
  firstName: string;
  id: string;
  lastName: string;
  payment: Payment;
  paymentId: number;
  updatedAt: string;
  uuid: string;
  year_and_course: string;
};

export type Facilitator = {
  email: string;
  name: string;
};

export type Event = {
  createdAt: string;
  date: string;
  description: string;
  form_name: boolean;
  id: number;
  is_active: boolean;
  max_participants: number;
  price: number;
  requires_payment: boolean;
  students: Student[];
  title: string;
  updatedAt: string;
};

export type Payment = {
  createdAt: string;
  id: string;
  photo_src: string;
  status: string;
  updatedAt: string;
};

export type EventDTO = {
  date: Dayjs | null;
  description: string;
  max_participants: number;
  price: string;
  requires_payment: boolean;
  title: string;
};
