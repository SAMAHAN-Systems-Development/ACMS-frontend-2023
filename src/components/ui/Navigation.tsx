'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();
  const isEventsPage = pathname.includes('/event');
  const navItems = isEventsPage
    ? ['Home', 'Logout']
    : ['Home', 'Events', 'Logout'];

  return (
    <nav className="flex items-center border-2 justify-between">
      <div className="flex items-center p-2">
        <div className="h-6 w-6 bg-[#181842] rounded-full mr-2" />
        <span className="text-lg color-#181842 font-bold">ACMS</span>
      </div>
      <ul className="flex items-center">
        {navItems.map((item) => (
          <li className="color-#181842 font-bold border-l-2 p-2" key={item}>
            <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
