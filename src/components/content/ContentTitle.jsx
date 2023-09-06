export default function ContentTitle({title}) {
  return (
    <div className="flex items-center justify-center bg-blue mx-[30%] h-12 mt-10 rounded-md">
      <h2 className="text-white text-3xl">{title}</h2>
    </div>
  );
}