import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { QueryClient } from '@tanstack/react-query';

import RegistrationForm from '@/components/register/RegistrationForm';
import { fetchEventByFormName } from '@/utilities/fetch/event';
import { fetchUser } from '@/utilities/fetch/user';

const Page = async ({
  params,
}: {
  params: { formName: string };
  requiresPayment: Boolean;
}) => {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  const formName = params.formName;

  await queryClient.prefetchQuery({
    queryKey: ['events', { formName: formName }],
    queryFn: () => fetchEventByFormName(user.accessToken, formName),
  });

  await queryClient.prefetchQuery({
    queryKey: ['jwt'],
    queryFn: () => user.accessToken,
  });

  return <RegistrationForm formName={formName} />;
};

export default Page;
