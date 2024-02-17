const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export const fetchEventData = async (token: string, id: string) => {
  const response = await fetch(`${backendUrl}/event/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch event data!");
  }

  const responseData = await response.json();

  return responseData;
};
const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export const fetchActiveEvents = async (token: string, page: number) => {
  const response = await fetch(`${backendUrl}/event/active?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error in fetching the active events");
  }

  const responseData = await response.json();
  const { activeEvents, maxPage } = responseData;

  return { events: activeEvents, maxPage };
};

export const fetchAllActiveTitleEvents = async (token: string) => {
  const response = await fetch(`${backendUrl}/event/active/all/title`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error in fetching the active events");
  }

  const responseData = await response.json();
  const allActiveEvents = responseData;

  return allActiveEvents;
};
