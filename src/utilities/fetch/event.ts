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
