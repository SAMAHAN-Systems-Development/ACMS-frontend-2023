const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

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
