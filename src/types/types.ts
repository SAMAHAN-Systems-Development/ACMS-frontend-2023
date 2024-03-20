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
  form_name: string;
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
  event: EventPayment;
  eventPrice: number;
  eventTier: EventTierPayment;
  id: number;
  photo_src: string;
  status: string;
  student: StudentPayment;
  updatedAt: string;
};

export type StudentPayment = {
  createdAt: string;
  email: string;
  eventTierOnEventId: number;
  firstName: string;
  id: number;
  lastName: string;
  paymentId: number;
  requires_payment: boolean;
  updatedAt: string;
  uuid: string;
  year_and_course: string;
};

export type EventPayment = {
  createdAt: string;
  date: string;
  desciption: string;
  form_name: string;
  id: number;
  is_active: boolean;
  title: string;
  updatedAt: string;
};

export type EventTierPayment = {
  createdAt: string;
  id: number;
  is_active: boolean;
  name: string;
  updatedAt: string;
};

export type EventDTO = {
  date: Dayjs | null;
  description: string;
  max_participants: number;
  price: number;
  requires_payment: boolean;
  title: string;
};
