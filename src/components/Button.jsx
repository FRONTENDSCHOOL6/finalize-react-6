export default function Button({
  type,
  children,
  txtColor = 'white',
  bgColor = 'bg-blue',
}) {
  return (
    <button
      type={type}
      className={`w-[400px] h-[50px] font-semibold text-${txtColor} ${bgColor} rounded-md`}
    >
      {children}
    </button>
  );
}
