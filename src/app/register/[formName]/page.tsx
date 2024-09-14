import { QueryClient } from '@tanstack/react-query';

// import RegistrationForm from '@/components/register/MadayawRegistrationForm';
import RegistrationForm from '@/components/register/RegistrationForm';
import { fetchEventByFormName } from '@/utilities/fetch/event';

const Page = async ({ params }: { params: { formName: string } }) => {
  const queryClient = new QueryClient();
  const formName = params.formName;

  await queryClient.prefetchQuery({
    queryKey: ['events', { formName: formName }],
    queryFn: () => fetchEventByFormName(formName),
  });

  return <RegistrationForm formName={formName} />;
};

export default Page;
