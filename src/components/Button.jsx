export default function Button({ children, onClick, txtColor="white", bgColor="blue" }) {
  return (
    <button 
      // onClick={onClick} 
      className={`w-[400px] h-[50px] font-semibold text-${txtColor} bg-${bgColor} rounded-md`}>
        {children}
    </button>
  )
}
