export default function Button({
  children,
  onClick,
  txtColor = 'white',
  bgColor = 'bg-blue',
}) {
  return (
    <button
      // onClick={onClick}
      className={`w-[400px] h-[50px] font-semibold text-${txtColor} ${bgColor} rounded-md`}
    >
      {children}
    </button>
  );
}
