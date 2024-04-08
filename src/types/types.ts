import type { Dayjs } from 'dayjs';

export type Student = {
  createdAt: string;
  email: string;
  event: EventStudent;
  eventId: number;
  eventTier: EventTierStudent;
  firstName: string;
  id: string;
  id_src: string;
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
  reference_number: string;
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
  earlyBirdAccessDate: string;
  eventTiers: EventTierViewEvent[];
  form_name: string;
  hasEarlyBirdAccess: boolean;
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
  created_at: string;
  crowdLimit: number;
  earlyBirdPrice: number;
  id: number;
  is_active: boolean;
  name: string;
  numberOfPeopleRegistered: number;
  numberOfTicketsLeft: number;
  originalPrice: number;
  updataed_at: string;
};

export type Payment = {
  createdAt: string;
  event: EventPayment;
  eventTier: EventTierPayment;
  id: number;
  photo_src: string;
  required_payment: number;
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
  earlyBirdAccessDate: string;
  form_name: string;
  hasEarlyBirdAccess: boolean;
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
  earlyBirdAccessDate: Dayjs | null;
  eventTiers: EventTierAddEditEventDTO[];
  hasEarlyBirdAccess: boolean;
  requires_payment: boolean;
  title: string;
};

export type EventTierAddEditEventDTO = {
  earlyBirdPrice: number;
  id: number;
  max_participants: number;
  originalPrice: number;
};

export type EventTierRegistration = {
  id: number;
  name: string;
  numberOfTicketsLeft: number;
  price: number;
};
