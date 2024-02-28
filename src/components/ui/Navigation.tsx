'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

function Navigation() {
  const router = useRouter();

  const userQuery: {
    data?: { accessToken: string; email: string; userType: string };
  } = useQuery({
    queryKey: ['user'],
  });

  const userType = userQuery.data?.userType || 'student';

  const homeInfo = {
    label: 'Home',
    action: () => {
      router.push('/');
    },
  };

  const eventsInfo = {
    label: 'Events',
    action: () => {
      router.push('/event/active');
    },
  };

  const navItems = userType === 'admin' ? [homeInfo, eventsInfo] : [homeInfo];

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
            className="color-#181842 font-bold border-l-2 p-2"
            key={item.label}
          >
            <button onClick={item.action}>{item.label}</button>
          </li>
        ))}
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
