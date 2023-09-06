import { NavLink } from 'react-router-dom';

export default function NavigationCenter() {
  return (
    <ul className="flex flex-row items-center gap-8 text-gray-600">
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
  );
}
