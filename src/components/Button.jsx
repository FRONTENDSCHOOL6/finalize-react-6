import { string, node, func, object } from 'prop-types';

export default function Button({
  wight = 'w-[400px]',
  textSize = 'text-base',
  type,
  children,
  txtColor = 'white',
  bgColor = 'bg-blue',
  onClick,
  ...restProps
}) {
  return (
    <button
      type={type}
      className={`${wight} ${textSize} h-[50px] font-semibold text-${txtColor} ${bgColor} rounded-md`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  wight: string,
  textSize: string,
  type: string,
  children: node.isRequired,
  txtColor: string,
  bgColor: string,
  onClick: func,
};
