const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

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
