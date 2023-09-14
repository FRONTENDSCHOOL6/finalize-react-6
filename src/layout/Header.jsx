import NavigationCenter from '@/components/header/NavigationCenter';
import NavigationSide from '@/components/header/NavigationSide';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const [mainHeader, setMainHeader] = useState('');

  const { user, logout } = useAuthStore();

  useEffect(
    () =>
      pathname === '/'
        ? setMainHeader('bg-white/50')
        : setMainHeader('bg-white/90'),
    [pathname]
  );

  const isActive = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : '',
      borderBottom: isActive ? '3px solid black' : '',
    };
  };

  return (
    <header
      className={`h-20 flex flex-row items-center px-8 justify-between min-w-[870px] fixed w-full z-10 ${mainHeader}`}
    >
      <h1>
        <NavLink to="/" className="flex items-center">
          <img src="/logo.png" alt="로고" className="w-24" />
          <span className="sr-only">Jeju - All in One</span>
        </NavLink>
      </h1>
      <ul className="flex flex-row items-center gap-8 text-gray-600">
        <NavLink to="content/list" style={isActive} className="hover:font-bold">
          <NavigationCenter menu="🍊 우리 제주" />
        </NavLink>
        <NavLink
          to="content/create"
          style={isActive}
          className="hover:font-bold"
        >
          <NavigationCenter menu="🏝️ 나만의 제주" />
        </NavLink>
        <NavLink to="weather" style={isActive} className="hover:font-bold">
          <NavigationCenter menu="🌦️ 제주 날씨" />
        </NavLink>
        <NavLink to="traffic" style={isActive} className="hover:font-bold">
          <NavigationCenter menu="🚙 제주 교통" />
        </NavLink>
      </ul>
      <ul className="flex flex-row items-center gap-5">
        {user && user.token ? (
          <>
          <span className='font-bold text-gray-600'>{user.username} 님</span>
            <NavLink to={`profile/${user.id}`} style={isActive}>
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
