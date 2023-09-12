export default function NavigationSide({ menu, onClick }) {
  return (
    <li
      onClick={onClick}
      className="text-base text-center font-semibold leading-8 text-darkblue hover:border-b-[3px] hover:border-darkblue cursor-pointer"
    >
      {menu}
    </li>
  );
}
