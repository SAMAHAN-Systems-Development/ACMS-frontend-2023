import type { Dayjs } from 'dayjs';

export type Student = {
  createdAt: string;
  email: string;
  event: EventStudent;
  eventId: number;
  eventTier: EventTierStudent;
  firstName: string;
  id: string;
  is_addu_student: boolean;
  lastName: string;
  payment: PaymentStudent;
  paymentId: number;
  updatedAt: string;
  uuid: string;
  year_and_course: string;
};

export type PaymentStudent = {
  createdAt: string;
  id: number;
  photo_src: string;
  status: string;
  updatedAt: string;
};

export type EventStudent = {
  createdAt: string;
  date: string;
  description: string;
  form_name: string;
  id: number;
  is_active: boolean;
  requires_payment: boolean;
  title: string;
  updatedAt: string;
};

export type EventTierStudent = {
  createdAt: string;
  id: number;
  is_active: boolean;
  name: string;
  updatedAt: string;
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
  requires_payment: boolean;
  title: string;
  updatedAt: string;
};

export type ViewEvent = {
  date: string;
  description: string;
  eventTiers: EventTierViewEvent[];
  form_name: string;
  id: number;
  is_active: boolean;
  requires_payment: boolean;
  students: StudentViewEvent[];
  title: string;
};

export type StudentViewEvent = {
  email: string;
  eventTier: string;
  firstName: string;
  id: number;
  is_addu_student: boolean;
  lastName: string;
  requires_payment: boolean;
  uuid: string;
  year_and_course: string;
};

export type EventTierViewEvent = {
  adduPrice: number;
  created_at: string;
  crowdLimit: number;
  id: number;
  is_active: boolean;
  name: string;
  nonAdduPrice: number;
  numberOfPeopleRegistered: number;
  numberOfTicketsLeft: number;
  updataed_at: string;
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
  is_addu_student: boolean;
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

export type AddEditEventDTO = {
  date: Dayjs | null;
  description: string;
  eventTiers: EventTierAddEditEventDTO[];
  requires_payment: boolean;
  title: string;
};

export type EventTierAddEditEventDTO = {
  adduPrice: number;
  id: number;
  max_participants: number;
  nonAdduPrice: number;
};

export type EventTierRegistration = {
  adduPrice: number;
  id: number;
  name: string;
  nonAdduPrice: number;
  numberOfTicketsLeft: number;
};
