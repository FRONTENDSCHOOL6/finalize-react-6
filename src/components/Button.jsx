import { string, node, func, object } from 'prop-types';

export default function Button({
  type,
  children,
  txtColor = 'white',
  bgColor = 'bg-blue',
  onClick
}) {
  return (
    <button
      type={type}
      className={`w-[400px] h-[50px] font-semibold text-${txtColor} ${bgColor} rounded-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: string,
  children: node.isRequired,
  txtColor: string,
  bgColor: string,
  onClick: func
};
