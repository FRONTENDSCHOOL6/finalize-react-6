import { func, string } from "prop-types";

export default function Navigation({ menu, logout }) {
  return (
    <>
      <li onClick={logout} className="py-3 cursor-pointer text-base text-center leading-8 hover:text-darkblue hover:border-b-[3px] hover:border-darkblue">
        {menu}
      </li>
    </>
  );
}

Navigation.propTypes = {
  menu: string.isRequired,
  logout: func
}