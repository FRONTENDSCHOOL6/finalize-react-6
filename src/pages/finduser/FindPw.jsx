import { SubLogo } from "@/components/Logo";
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import LinkItem from "@/components/LinkItem";
import PageHead from "@/components/PageHead";
import LoginPageContent from "@/components/LoginPageContent";

export default function FindId() {
  return (
    <>
      {/* 헤드 이름 */}
      <PageHead title="Jeju All in One - 비밀번호 찾기" />

      {/* 마크업 */}
      <LoginPageContent>
        <SubLogo />
        <h2 className="text-xl text-darkblue font-bold mb-3">비밀번호 찾기</h2>
        <p>회원가입 시 등록하신 이메일 주소로 비밀번호 재설정 링크를 보내드려요.</p>
        <form action="" className="flex flex-col gap-3 m-8">
          <InputField id="id" name="id" placeholder="아이디" />
          <InputField id="email" name="email" placeholder="이메일" />
          <Button>비밀번호 찾기</Button>
        </form>
        <p>
          <LinkItem link="/login" className="font-extrabold text-blue">로그인</LinkItem>
          으로 돌아가기
        </p>
      </LoginPageContent>
    </>
  )
}