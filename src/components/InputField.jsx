export default function InputField({ id, type, placeholder }) {
  return (
    <>
      <input type={type} id={id} name={id} placeholder={placeholder} className="w-[400px] px-5 py-3 border border-sand rounded-lg" />
      <label htmlFor={id} className="sr-only">{placeholder}</label>
    </>
  );
}