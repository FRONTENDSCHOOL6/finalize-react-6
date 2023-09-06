export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="flex flex-col items-center justify-center m-8">
        <img src="/public/logo.png" alt="logo" className="w-36 mb-3" />
        <h1 className="text-darkblue font-bold text-xl">당신의 제주를<br />우리의 제주로</h1>
      </div>
      <form className="flex flex-col gap-3 mb-4">
        <input type="text" id="id" name="id" placeholder="아이디" className="w-[400px] px-5 py-3 border border-sand rounded-lg" />
        <label htmlFor="id" className="sr-only">아이디</label>
        <input type="password" id="password" name="password" placeholder="비밀번호" className="w-[400px] px-5 py-3 border border-sand rounded-lg mb-2" />
        <label htmlFor="password" className="sr-only">비밀번호</label>
        <button type="submit" className="w-[400px] h-[50px] font-semibold text-white bg-blue rounded-md">로그인</button>
        <a href="/" className="w-[400px] h-[50px] font-semibold bg-KakaoYellow rounded-md flex items-center justify-center">카카오로 로그인</a>
      </form>
      <div className="m-9">
        <a href="/">아이디 찾기</a> 
        &nbsp;|&nbsp;
        <a href="/">비밀번호 찾기</a>
      </div>
      <p>아직 회원이 아니신가요? <a href="/" className="font-extrabold text-blue">회원가입 하기</a></p>
    </div>
  )
}
