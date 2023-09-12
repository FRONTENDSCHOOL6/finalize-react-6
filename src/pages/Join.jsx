import pb from '@/api/pocketbase';
import Button from '@/components/Button';
import InputField, { CheckField } from '@/components/InputField';
import LinkItem from '@/components/LinkItem';
import LoginPageContent from '@/components/login/LoginPageContent';
import Logo from '@/components/Logo';
import PageHead from '@/components/PageHead';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    username: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();

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
            type="text"
            name="email"
            placeholder="이메일"
            onChange={handleDebounceInput}
          />

          {/* 약관 동의 */}
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
