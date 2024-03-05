'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';

import { fetchUser } from '@/utilities/fetch/user';

function Navigation() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(supabase),
  });

  const { userType } = userQuery.data || {
    email: '',
    userType: 'student',
    accessToken: '',
  };

  const homeInfo = {
    label: 'Home',
    action: () => {
      router.push('/home');
    },
  };

  const eventsInfo = {
    label: 'Events',
    action: () => {
      router.push('/event/active');
    },
  };

  const navItems = userType === 'admin' ? [homeInfo, eventsInfo] : [homeInfo];

  if (userQuery.isFetched) {
    return (
      <nav className="w-full flex items-center border-b-2 justify-between">
        <div className="flex items-center px-2 gap-2">
          <Image
            src="/logo.png"
            alt="Logo Picture"
            height={200}
            width={200}
            className="w-[1.5rem]"
          />
          <h1 className="text-xl font-semibold">ACMS</h1>
        </div>
        <ul className="flex items-center">
          {navItems.map((item) => (
            <li
              className="color-navyBlue font-bold border-l-2 hover:bg-blue"
              key={item.label}
            >
              <button
                className="float-left block relative w-full h-full py-2 px-4"
                onClick={item.action}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="color-navyBlue font-bold border-l-2 hover:bg-blue">
            <form>
              <button
                className="float-left block relative w-full h-full py-2 px-4"
                formAction="/auth/logout"
                formMethod="post"
              >
                Logout
              </button>
            </form>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="w-full flex items-center border-b-2 justify-between">
      <div className="flex items-center px-2 gap-2">
        <Image
          src="/logo.png"
          alt="Logo Picture"
          height={200}
          width={200}
          className="w-[1.5rem]"
        />
        <h1 className="text-xl font-semibold">ACMS</h1>
      </div>
      <ul className="flex items-center">
        <li className="color-#181842 font-bold border-l-2 p-2">
          <form>
            <button formAction="/auth/logout" formMethod="post">
              Logout
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
