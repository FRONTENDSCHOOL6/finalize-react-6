import Button from '@/components/Button';
import InputField, { CheckField } from '@/components/InputField';
import LinkItem from '@/components/LinkItem';
import LoginPageContent from '@/components/LoginPageContent';
import Logo from '@/components/Logo';
import PageHead from '@/components/PageHead';

export default function Join() {
  

  return (
    <>
      {/* 헤드 이름 */}
      <PageHead>Jeju All in One - 회원가입</PageHead>

      {/* 마크업 */}
      <LoginPageContent>
        <Logo />
        <form action="" className="flex flex-col gap-3 mb-5">
          <InputField id="id" type="text" placeholder="아이디" />
          <InputField id="password" type="text" placeholder="비밀번호" />
          <InputField
            id="checkPassword"
            type="text"
            placeholder="비밀번호 확인"
          />
          <InputField id="nickname" type="text" placeholder="닉네임" />
          <InputField id="email" type="text" placeholder="이메일" />
          <div className="flex flex-col gap-2 my-3">
            <CheckField
              id="checkAll"
              name="checkAll"
              placeholder="전체 약관 동의"
              className="w-[400px] px-5 py-4 bg-gray-200 rounded-md"
            />
            <div className="flex justify-between items-center px-3">
              <CheckField
                id="checkUse"
                name="checkUse"
                placeholder="이용약관 동의"
                className="pt-1"
              />
              <button type="button" className="text-sm">
                약관 보기 &#62;
              </button>
            </div>
            <div className="flex justify-between items-center px-3">
              <CheckField
                id="checkPrivacy"
                name="checkPrivacy"
                placeholder="개인정보 수집 및 이용 동의"
              />
              <button type="button" className="text-sm">
                약관 보기 &#62;
              </button>
            </div>
          </div>
          <Button>가입하기</Button>
        </form>
        <p className="mt-3">
          이미 회원이신가요?&nbsp;
          <LinkItem link="/login" className="font-extrabold text-blue">
            로그인 하기
          </LinkItem>
        </p>
      </LoginPageContent>
    </>
  );
}
