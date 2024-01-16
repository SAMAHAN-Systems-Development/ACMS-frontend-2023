'use client';

import { useUser } from '@/contexts/UserContext';

const Home = () => {
  const { user }: any = useUser();
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
