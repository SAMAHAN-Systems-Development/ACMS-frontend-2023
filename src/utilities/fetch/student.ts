const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const submitRegistration = async (studentInfo: {
  email: string;
  event_requires_payment: boolean | null;
  eventId: number;
  eventTierId: number;
  firstName: string;
  id_src: string;
  isSubmittedByStudent: boolean;
  lastName: string;
  payment_reference_number: string;
  photo_src: string;
  required_payment: number;
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
  if (responseData.message) {
    if (responseData.message === 'maxParticipantsReached') {
      throw new Error('maxParticipantsReached');
    }

    if (responseData.message === 'emailIsExisting') {
      throw new Error('emailIsExisting');
    }
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
  eventId: number,
  isForScanning: boolean
) => {
  const response = await fetch(
    `${backendUrl}/student/${uuid}/${eventId}?isForScanning=${isForScanning}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

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
