import pb from '@/api/pocketbase';
import InputField from '@/components/InputField';
import LinkItem from '@/components/LinkItem';
import LoginPageContent from '@/components/login/LoginPageContent';
import Logo from '@/components/Logo';
import PageHead from '@/components/PageHead';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Termscheck from '@/components/join/Termscheck';

export default function Join() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [isAgreed, setIsAgreed] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
      alert('약관에 동의해주세요.');
      return;
    }

    const { password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    await pb.collection('user').create({
      ...formState,
      emailVisibility: true,
    });

    navigate('/login');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDebounceInput = debounce(handleInput, 500);

  return (
    <>
      {/* 헤드 이름 */}
      <PageHead title="Jeju All in One - 회원가입" />
      {/* 마크업 */}
      <LoginPageContent>
        <Logo />

        {/* 회원가입 폼 */}
        <form onSubmit={handleRegister} className="flex flex-col gap-3 mb-5">
          <InputField
            id="id"
            type="text"
            name="username"
            placeholder="아이디"
            onChange={handleDebounceInput}
          />
          <InputField
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleDebounceInput}
          />
          <InputField
            id="checkPassword"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={handleDebounceInput}
          />
          <InputField
            id="nickname"
            type="text"
            name="nickname"
            placeholder="닉네임"
            onChange={handleDebounceInput}
          />
          <InputField
            id="email"
            type="email"
            name="email"
            placeholder="이메일"
            onChange={handleDebounceInput}
          />

          {/* 약관 동의 */}
          <Termscheck setIsAgreed={setIsAgreed} />
        </form>

        {/* 로그인 페이지 이동 */}
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
