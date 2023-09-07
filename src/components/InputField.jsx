export default function InputField({ id, type, placeholder, srOnly='ture' }) {

  return (
    <>
      <input type={type} id={id} name={id} placeholder={placeholder} className="w-[400px] px-5 py-3 border border-sand rounded-lg" />
      <label htmlFor={id} className='sr-only'>{placeholder}</label>
    </>
  );
}

export function CheckField({ id, name, placeholder, className }) {
  return (
    <div className={className ? className : ''}>
      <input type="checkbox" id={id} name={name} placeholder={placeholder} className="mr-2"  />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  )
}