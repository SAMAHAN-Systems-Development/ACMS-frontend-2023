const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const fetchEventData = async (token: string, id: string) => {
  const response = await fetch(`${backendUrl}/event/${id}`, {
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
// const backendUrl =
//   process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

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

export const inactiveEvents = async (token: string, eventIds: number[]) => {
  const response = await fetch(`${backendUrl}/events/inactive`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventIds }),
  });

  if (!response.ok) {
    throw new Error('Error in deactivating events');
  }

  return true;
};

export const activeEvents = async (token: string, eventIds: number[]) => {
  const response = await fetch(`${backendUrl}/events/active`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eventIds }),
  });

  if (!response.ok) {
    throw new Error('Error in activating events');
  }

  return true;
};
