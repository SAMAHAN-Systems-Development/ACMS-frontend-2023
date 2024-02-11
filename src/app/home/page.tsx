'use client';

import FacilitatorHomePage from '@/components/home/FacilitatorHomePage';
import { useUser } from '@/contexts/UserContext';

const Home = () => {
  const { user }: any = useUser();

  if (user.userType === 'facilitator') {
    return <FacilitatorHomePage />;
  }

  return (
    <form>
      <p>{user?.userType}</p>
      <button formAction="/auth/logout" formMethod="post">
        Logout
      </button>
    </form>
  );
};

export default Home;
