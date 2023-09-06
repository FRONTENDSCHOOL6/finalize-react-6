import { NavLink } from 'react-router-dom';

export default function NavigationCenter({ menu }) {
  return (
    <>
      <li className="text-base text-center leading-8 hover:border-b-[3px] hover:text-darkblue  hover:border-darkblue">
        {menu}
      </li>
    </>
  );
}
