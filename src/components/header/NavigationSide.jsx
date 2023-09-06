import { NavLink } from 'react-router-dom';

export default function NavigationSide({ menu }) {
  return (
    <li className="text-base text-center font-semibold leading-8 text-darkblue hover:border-b-[3px] hover:border-darkblue">
      {menu}
    </li>
  );
}
