import { Link } from "react-router-dom";

export default function Header() {
  
  return (
    <header className="w-[1920px] h-[150px] flex flex-row items-center px-5 justify-between mx-auto">
      <img src="/logo.png" alt="로고" className="w-[100px] h-[100px]" />
      <h1 className="sr-only"> 당신의 제주를 우리의 제주로 </h1>
      <ul className="flex flex-row items-center gap-5 p-5">
        <li className="w-[200px] h-[100px] text-xl text-center leading-[100px]">
          <Link href="/">🍊 우리 제주</Link>
        </li>
        <li className="w-[200px] h-[100px] text-xl text-center leading-[100px]">
          <Link href="/">🏝️ 나만의 제주</Link>
        </li>
        <li className="w-[200px] h-[100px] text-xl text-center leading-[100px]">
          <Link href="/">🌦️ 제주 날씨</Link>
        </li>
        <li className="w-[200px] h-[100px] text-xl text-center leading-[100px]">
          <Link href="/">🚙 제주 교통</Link>
        </li>
      </ul>
      <div className="flex flex-row items-center gap-5 p-5">
        <button className="w-[100px] h-[100px] text-xl text-center leading-[100px]">로그인</button>
        <button className="w-[100px] h-[100px] text-xl text-center leading-[100px]">회원가입</button>
      </div>
    </header>
  );
}
