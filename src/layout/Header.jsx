import NavigationCenter from '@/components/NavigationCenter';
import NavigationSide from '@/components/NavigationSide';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="h-24 flex flex-row items-center px-8 justify-between">
      <h1>
        <NavLink to="/">
          <img src="/logo.png" alt="로고" />
        </NavLink>
        <span className="sr-only">Jeju All in One</span>
      </h1>
      <NavigationCenter />
      <NavigationSide />
    </header>
  );
}
