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
      <ul className="flex flex-row items-center gap-8 text-[#717D96]">
        <NavLink to="content">
          <li className="text-base text-center leading-8 hover:border-b-[3px] hover:text-darkblue  hover:border-darkblue">
            🍊 우리 제주
          </li>
        </NavLink>
        <NavLink to="content">
          <li className="text-base text-center leading-8 hover:border-b-[3px] hover:text-darkblue  hover:border-darkblue">
            🏝️ 나만의 제주
          </li>
        </NavLink>
        <NavLink to="weather">
          <li className="text-base text-center leading-8 hover:border-b-[3px] hover:text-darkblue  hover:border-darkblue">
            🌦️ 제주 날씨
          </li>
        </NavLink>
        <NavLink to="traffic">
          <li className="text-base text-center leading-8 hover:border-b-[3px] hover:text-darkblue  hover:border-darkblue">
            🚙 제주 교통
          </li>
        </NavLink>
      </ul>
      <ul className="flex flex-row items-center gap-5">
        {/* 로그인 하면 로그아웃, 내 프로필로 변경하기 */}
        <NavLink to="login">
          <li className="text-base text-center font-semibold leading-8 text-darkblue hover:border-b-[3px] hover:border-darkblue">
            로그인
          </li>
        </NavLink>
        <li className="text-base text-center font-semibold leading-8 text-darkblue hover:border-b-[3px] hover:border-darkblue">
          로그아웃
        </li>
        <NavLink to="join">
          <li className="text-base text-center font-semibold leading-8 text-darkblue hover:border-b-[3px] hover:border-darkblue">
            회원가입
          </li>
        </NavLink>
        <NavLink to="profile">
          <li className="text-base text-center font-semibold leading-8 text-darkblue hover:border-b-[3px] hover:border-darkblue">
            프로필
          </li>
        </NavLink>
      </ul>
    </header>
  );
}
