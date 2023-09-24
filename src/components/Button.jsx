import { string, node, func, object } from 'prop-types';

export default function Button({
  width = 'w-full',
  textSize = 'text-base',
  type,
  children,
  txtColor = 'white',
  bgColor = 'bg-blue',
  border,
  hover,
  onClick,
  ...restProps
}) {
  return (
    <button
      type={type}
      className={`${width} max-w-[400px] ${textSize} h-[50px] font-semibold text-${txtColor} ${bgColor} rounded-md ${border} ${hover}`}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  width: string,
  textSize: string,
  type: string,
  children: node.isRequired,
  txtColor: string,
  bgColor: string,
  onClick: func,
  border: string,
  hover: string,
};
