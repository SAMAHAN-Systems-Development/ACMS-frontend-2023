const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export const submitRegistration = async (
  token: string,
  studentInfo: {
    email: string;
    eventId: number;
    firstName: string;
    isSubmittedByStudent: boolean;
    photo_src: string;
    year_and_course: string;
  }
) => {
  const response = await fetch(`${backendUrl}/student/submit-registration`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentInfo),
  });

  if (!response.ok) {
    throw new Error('Error in submitting registration');
  }

  return true;
};
