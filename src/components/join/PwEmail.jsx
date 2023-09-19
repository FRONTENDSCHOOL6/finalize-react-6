import { SubLogo } from '@/components/Logo';
import LinkItem from '@/components/LinkItem';

export default function PwEmail() {
  return (
    <>
      <SubLogo />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl text-darkblue font-bold mb-2">
          메일을 확인해 주세요!
        </h2>
        <p className="text-lg mb-9">
          적어 주신 이메일로 비밀번호 재설정 메일을 전송했습니다.
        </p>
        <p className="text-sa">
          <LinkItem link="/login" className="font-extrabold text-blue">
            로그인
          </LinkItem>
          으로 돌아가기
        </p>
      </div>
    </>
  );
}
