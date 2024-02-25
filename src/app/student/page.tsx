import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchUser } from '@/utilities/fetch/user';
import { StudentPage } from '@/components/student/StudentPage';


const Page = async () => {
    const queryClient = new QueryClient();

    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const user = await fetchUser(supabase);
    
      await queryClient.prefetchQuery({
        queryKey: ['jwt'],
        queryFn: () => user.accessToken,
      });
    

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <StudentPage />
       
        </HydrationBoundary>
    )
}
export default Page;