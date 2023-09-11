import NavigationCenter from '@/components/header/NavigationCenter';
import NavigationSide from '@/components/header/NavigationSide';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const [mainHeader, setMainHeader] = useState('');

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(
    () =>
      pathname === '/'
        ? setMainHeader('fixed w-full bg-white/50 z-10')
        : setMainHeader(''),
    [pathname]
  );

  const isActive = ({ isActive }) => {
    console.log(isActive);
    return {
      fontWeight: isActive ? 'bold' : '',
      borderBottom: isActive ? '3px solid black' : '',
    };
  };

  return (
    <header
      className={`h-24 flex flex-row items-center px-8 justify-between min-w-[870px] ${mainHeader}`}
    >
      <h1>
        <NavLink to="/" className="flex items-center">
          <img src="/logo.png" alt="로고" />
          <span className="sr-only">Jeju - All in One</span>
        </NavLink>
      </h1>
      <ul className="flex flex-row items-center gap-8 text-gray-600">
        <NavLink to="content" style={isActive}>
          <NavigationCenter menu="🍊 우리 제주" />
        </NavLink>
        <NavLink to="content/create" style={isActive}>
          <NavigationCenter menu="🏝️ 나만의 제주" />
        </NavLink>
        <NavLink to="weather" style={isActive}>
          <NavigationCenter menu="🌦️ 제주 날씨" />
        </NavLink>
        <NavLink to="traffic" style={isActive}>
          <NavigationCenter menu="🚙 제주 교통" />
        </NavLink>
      </ul>
      <ul className="flex flex-row items-center gap-5">
        {user && user.token ? (
          <>
            <NavLink to="profile" style={isActive}>
              <NavigationSide menu="프로필" />
            </NavLink>
            <NavigationSide menu="로그아웃" onClick={logout} />
          </>
        ) : (
          <>
            <NavLink to="login" style={isActive}>
              <NavigationSide menu="로그인" />
            </NavLink>
            <NavLink to="join" style={isActive}>
              <NavigationSide menu="회원가입" />
            </NavLink>
          </>
        )}
      </ul>
    </header>
  );
}
