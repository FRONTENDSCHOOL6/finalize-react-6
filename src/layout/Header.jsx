import NavigationCenter from '@/components/header/NavigationCenter';
import NavigationSide from '@/components/header/NavigationSide';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  const [mainHeader, setMainHeader] = useState('');

  useEffect(
    () =>
      pathname === '/'
        ? setMainHeader('fixed w-full bg-white/50 z-10')
        : setMainHeader(''),
    [pathname]
  );

  return (
    <header
      className={`h-24 flex flex-row items-center px-8 justify-between min-w-[870px] ${mainHeader}`}
    >
      <h1>
        <NavLink to="/">
          <img src="/logo.png" alt="로고" />
        </NavLink>
        <span className="sr-only">Jeju All in One</span>
      </h1>
      <ul className="flex flex-row items-center gap-8 text-gray-600">
        <NavLink to="content">
          <NavigationCenter menu="🍊 우리 제주" />
        </NavLink>
        <NavLink to="content">
          <NavigationCenter menu="🏝️ 나만의 제주" />
        </NavLink>
        <NavLink to="weather">
          <NavigationCenter menu="🌦️ 제주 날씨" />
        </NavLink>
        <NavLink to="traffic">
          <NavigationCenter menu="🚙 제주 교통" />
        </NavLink>
      </ul>
      <ul className="flex flex-row items-center gap-5">
        <NavLink to="login">
          <NavigationSide menu="로그인" />
        </NavLink>
        <NavigationSide menu="로그아웃" />
        <NavLink to="join">
          <NavigationSide menu="회원가입" />
        </NavLink>
        <NavLink to="profile">
          <NavigationSide menu="프로필" />
        </NavLink>
      </ul>
    </header>
  );
}
