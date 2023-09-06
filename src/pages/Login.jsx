import InputField from "@/components/InputField";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import LinkItem from "@/components/LinkItem";
import { Helmet } from "react-helmet-async";

export default function Login() {
  return (
    <>
      {/* 헤드 이름 */}
      <Helmet>
        <title>Jeju All in One - 로그인 </title>
      </Helmet>

      {/* 마크업 */}
      <div className="flex flex-col items-center justify-center my-20">
        <Logo />
        <form className="flex flex-col gap-3">
          <InputField id="id" type="text" placeholder="아이디" />
          <InputField id="password" type="password" placeholder="비밀번호" />
          <Button>로그인</Button>
          <a href="/">
            <Button txtColor="black" bgColor="KakaoYellow">카카오로 로그인</Button>
          </a>
        </form>
        <div className="m-8">
          <LinkItem link="/findid">아이디 찾기</LinkItem>
          &nbsp;|&nbsp;
          <LinkItem link="/findpw">비밀번호 찾기</LinkItem>
        </div>
        <p>
          아직 회원이 아니신가요?&nbsp;
          <LinkItem link="/join" className="font-extrabold text-blue">회원가입 하기</LinkItem>
        </p>
      </div>
    </>
  )
}


