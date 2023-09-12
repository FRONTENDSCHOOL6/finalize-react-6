import { oneOf, string } from 'prop-types';
import { useId } from 'react';

export default function InputField({
  name = null,
  type = 'text',
  placeholder,
  ...restProps
}) {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="w-[400px] px-5 py-3 border border-sand rounded-lg"
        {...restProps}
      />
    </>
  );
}

export function CheckField({ id, name, placeholder, className }) {
  return (
    <div className={className ? className : ''}>
      <input
        type="checkbox"
        id={id}
        name={name}
        placeholder={placeholder}
        className="mr-3 transform scale-150"
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
}

InputField.propTypes = {
  type: oneOf(['text', 'password']),
  name: string.isRequired,
  placeholder: string.isRequired,
};

CheckField.propTypes = {
  name: string.isRequired,
  id: string.isRequired,
  placeholder: string.isRequired,
  className: string,
};
