/* eslint-disable linebreak-style */
import RegistrationForm from '@/components/register/RegistrationForm';

const Page = async () => {
  return <RegistrationForm eventName={'test event'} requiresPayment={false} />;
};

export default Page;
