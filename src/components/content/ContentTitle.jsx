export default function ContentTitle({title}) {
  return (
    <div className="flex py-2 items-center justify-center border-2 border-lightsand bg-blue mx-[30%] h-16 mt-10 rounded-md">
      <h2 className="text-white text-3xl">{title}</h2>
    </div>
  );
}