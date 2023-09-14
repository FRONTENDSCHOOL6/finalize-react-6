import Navigation from '@/components/header/Navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export default function Header() {
  const { pathname } = useLocation();
  const [mainHeader, setMainHeader] = useState('');
  const [menuToggle, setMenuToggle] = useState(false);

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
    <header className={`${mainHeader} fixed z-10 h-20 w-full mx-auto`}>
      <nav className="flex items-center h-20 justify-between space-x-4 px-8">
        <h1>
          <NavLink to="/" className="flex items-center">
            <img src="/logo.png" alt="로고" className="w-24" />
            <span className="sr-only">Jeju - All in One</span>
          </NavLink>
        </h1>
        <ul className="hidden mobile:flex mobile:items-center px-4 mx-auto font-semibold font-heading space-x-12 text-gray-600">
          <NavLink
            to="content/list"
            style={isActive}
            className="hover:font-bold"
          >
            <Navigation menu="🍊 우리 제주" />
          </NavLink>
          <NavLink
            to="content/create"
            style={isActive}
            className="hover:font-bold"
          >
            <Navigation menu="🏝️ 나만의 제주" />
          </NavLink>
          <NavLink to="weather" style={isActive} className="hover:font-bold">
            <Navigation menu="🌦️ 제주 날씨" />
          </NavLink>
          <NavLink to="traffic" style={isActive} className="hover:font-bold">
            <Navigation menu="🚙 제주 교통" />
          </NavLink>
        </ul>
        <ul className="hidden mobile:flex items-center space-x-4 font-semibold text-blue">
          {user && user.token ? (
            <>
              <span className="font-bold text-gray-600">
                {user.username} 님
              </span>
              <NavLink to={`profile/${user.id}`} style={isActive}>
                <Navigation menu="프로필" />
              </NavLink>
              <Navigation menu="로그아웃" logout={logout} />
            </>
          ) : (
            <>
              <NavLink to="login" style={isActive}>
                <Navigation menu="로그인" />
              </NavLink>
              <NavLink to="join" style={isActive}>
                <Navigation menu="회원가입" />
              </NavLink>
            </>
          )}
        </ul>

        <div className="mobile:hidden flex items-center" href="#">
          <button onClick={() => setMenuToggle(!menuToggle)}>
            {menuToggle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      <div className={classNames('mobile:hidden', { hidden: !menuToggle })}>
        <ul className={`${mainHeader} mobile:flex justify-center bg-slate-100 py-2 font-semibold font-heading list-none text-gray-600`}>
          <li className={`text-center py-2 ${user.token ? 'block' : 'hidden'}`}>{user.username} 님</li>
          <NavLink
            to="content/list"
            style={isActive}
            className="hover:font-bold"
          >
            <Navigation menu="🍊 우리 제주" />
          </NavLink>
          <NavLink
            to="content/create"
            style={isActive}
            className="hover:font-bold"
          >
            <Navigation menu="🏝️ 나만의 제주" />
          </NavLink>
          <NavLink to="weather" style={isActive} className="hover:font-bold">
            <Navigation menu="🌦️ 제주 날씨" />
          </NavLink>
          <NavLink to="traffic" style={isActive} className="hover:font-bold">
            <Navigation menu="🚙 제주 교통" />
          </NavLink>
          {user && user.token ? (
            <>
              <NavLink to={`profile/${user.id}`} style={isActive}>
                <Navigation menu="프로필" />
              </NavLink>
              <Navigation menu="로그아웃" logout={logout} />
            </>
          ) : (
            <>
              <NavLink to="login" style={isActive}>
                <Navigation menu="로그인" />
              </NavLink>
              <NavLink to="join" style={isActive}>
                <Navigation menu="회원가입" />
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
