import { QueryClient } from '@tanstack/react-query';

// import RegistrationForm from '@/components/register/MadayawRegistrationForm';
import RegistrationForm from '@/components/register/RegistrationForm';
import StarSearchRegistrationForm from '@/components/register/StarSearchRegistrationForm';
import { fetchEventByFormName } from '@/utilities/fetch/event';

const Page = async ({ params }: { params: { formName: string } }) => {
  const queryClient = new QueryClient();
  const formName = params.formName;

  await queryClient.prefetchQuery({
    queryKey: ['events', { formName: formName }],
    queryFn: () => fetchEventByFormName(formName),
  });

  if (formName === 'star-search-2024') {
    return <StarSearchRegistrationForm formName={formName} />;
  }

  return <RegistrationForm formName={formName} />;
};

export default Page;
