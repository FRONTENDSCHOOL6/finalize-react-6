import { NavLink } from 'react-router-dom';

export default function NavigationSide() {
  return (
    <ul className="flex flex-row items-center gap-5">
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
  );
}
