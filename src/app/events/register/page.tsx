import RegistrationForm from '@/components/register/RegistrationForm';

const Page = async ({
  params,
  requiresPayment,
}: {
  params: { id: string };
  requiresPayment: Boolean;
}) => {
  return <RegistrationForm id={params.id} requiresPayment={requiresPayment} />;
};

export default Page;
