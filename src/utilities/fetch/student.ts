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
  let responseData = null
  try{
    responseData = await response.json();

  }catch(err){
    return {student: responseData, isFound:false }
  }

  return { student: responseData, isFound:true };
};
