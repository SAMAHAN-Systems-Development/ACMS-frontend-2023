import type { AddEditEventDTO } from '@/types/types';

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const fetchEventData = async (
  token: string,
  id: string,
  queryParamsFinal: {
    studentItems: number;
    studentPage: number;
    studentSearchValue: string;
  }
) => {
  const paramsString = Object.keys(queryParamsFinal)
    .map((key: string) => {
      return `${key}=${queryParamsFinal[key as keyof typeof queryParamsFinal]}`;
    })
    .join('&');

  const response = await fetch(`${backendUrl}/event/${id}?${paramsString}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch event data!');
  }

  const responseData = await response.json();

  return responseData;
};

export const fetchActiveEvents = async (token: string, page: number) => {
  const response = await fetch(`${backendUrl}/event/active?page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the active events');
  }

  const responseData = await response.json();
  const { activeEvents, maxPage } = responseData;

  return { events: activeEvents, maxPage };
};

export const fetchInactiveEvents = async (token: string, page: number) => {
  const response = await fetch(`${backendUrl}/event/inactive?page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the inactive events');
  }

  const responseData = await response.json();
  const { inactiveEvents, maxPage } = responseData;

  return { events: inactiveEvents, maxPage };
};

export const fetchAllActiveTitleEvents = async (token: string) => {
  const response = await fetch(`${backendUrl}/event/active/all/title`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the active events');
  }

  const responseData = await response.json();
  const allActiveEvents = responseData;

  return allActiveEvents;
};

export const inactivateEvents = async (token: string, eventId: number) => {
  const response = await fetch(`${backendUrl}/event/inactivate/${eventId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in deactivating events');
  }

  return true;
};

export const activateEvents = async (token: string, eventId: number) => {
  const response = await fetch(`${backendUrl}/event/activate/${eventId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in activating events');
  }

  return true;
};

export const editEvent = async (
  token: string,
  eventId: number,
  event: AddEditEventDTO
) => {
  const response = await fetch(`${backendUrl}/event/${eventId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Error in updating the event');
  }
  const data = await response.json();

  return data;
};

export const addEvent = async (token: string, event: AddEditEventDTO) => {
  const filteredEventTiers = event.eventTiers.filter((eventTier) => {
    return eventTier.max_participants !== 0;
  });

  event.eventTiers = filteredEventTiers;

  const response = await fetch(`${backendUrl}/event`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Error in adding the event');
  }

  const data = await response.json();

  return data;
};

export const fetchEventByFormName = async (formName: string) => {
  const response = await fetch(`${backendUrl}/event/form-name/${formName}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error in fetching the event');
  }
  const data = await response.json();
  return data;
};

export const fetchEventTiers = async (token: string) => {
  const response = await fetch(`${backendUrl}/event-tier`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error in fetching the event tiers');
  }

  const responseData = await response.json();
  const eventTiers = responseData;

  return eventTiers;
};

export const fetchEventTiersBasedOnEventId = async (eventId: number) => {
  const response = await fetch(`${backendUrl}/event-tier/${eventId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error in fetching the event tiers');
  }

  const responseData = await response.json();
  const eventTiers = responseData;

  return eventTiers;
};
