import { toast } from 'react-toastify';

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const submitRegistration = async (studentInfo: {
  email: string;
  event_requires_payment: boolean | null;
  eventId: number;
  eventTierId: number;
  firstName: string;
  isSubmittedByStudent: boolean;
  lastName: string;
  photo_src: string;
  year_and_course: string;
}) => {
  const response = await fetch(`${backendUrl}/student/submit-registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentInfo),
  });

  if (!response.ok) {
    throw new Error('Error in submitting registration');
  }

  const responseData = await response.json();
  if (
    responseData.message &&
    responseData.message === 'maxParticipantsReached'
  ) {
    throw new Error('maxParticipantsReached');
  }
  return responseData;
};

export const fetchStudent = async (token: string, uuid: string) => {
  const response = await fetch(`${backendUrl}/student/${uuid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error in fetching student id. Status: ${response.status}`);
  }

  try {
    const responseData = await response.json();
    return { student: responseData, isFound: true };
  } catch (err) {
    return { student: {}, isFound: false };
  }
};

export const fetchStudentOnEvent = async (
  token: string,
  uuid: string,
  eventId: number
) => {
  const response = await fetch(`${backendUrl}/student/${uuid}/${eventId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { student: {}, isFound: false };
  }

  try {
    const responseData = await response.json();
    return { student: responseData, isFound: true };
  } catch (err) {
    return { student: {}, isFound: false };
  }
};
