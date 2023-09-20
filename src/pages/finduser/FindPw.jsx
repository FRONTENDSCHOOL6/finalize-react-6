import { useState } from 'react';
import PageHead from '@/components/PageHead';
import LoginPageContent from '@/components/login/LoginPageContent';
import { SubLogo } from '@/components/Logo';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import LinkItem from '@/components/LinkItem';
import { toast } from 'react-hot-toast';
import pb from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function FindPw() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  // 페이지 이동 처리를 위한 useEffect 추가
  useEffect(() => {
    if (shouldRedirect) {
      navigate('/pwemail');
    }
  }, [shouldRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('user').requestPasswordReset(email);
      toast.success('비밀번호 재설정 메일이 전송되었습니다.');
      setShouldRedirect(true);
    } catch (error) {
      console.error(error);
      toast.error('비밀번호 재설정 메일 전송에 실패하였습니다.');
    }
  };
  return (
    <>
      {/* 헤드 이름 */}
      <PageHead title="Jeju All in One - 비밀번호 찾기" />

      {/* 마크업 */}
      <LoginPageContent>
        <SubLogo />
        <h2 className="text-xl text-darkblue font-bold mb-3">비밀번호 찾기</h2>
        <p>
          회원가입 시 등록하신 이메일 주소로 비밀번호 재설정 링크를 보내드려요.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-8">
          <InputField
            id="id"
            name="id"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <InputField
            id="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">비밀번호 찾기</Button>
        </form>
        <p>
          <LinkItem link="/login" className="font-extrabold text-blue">
            로그인
          </LinkItem>
          으로 돌아가기
        </p>
      </LoginPageContent>
    </>
  );
}