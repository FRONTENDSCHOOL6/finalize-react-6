import pb from '@/api/pocketbase';
import InputField from '@/components/InputField';
import LinkItem from '@/components/LinkItem';
import LoginPageContent from '@/components/login/LoginPageContent';
import Logo from '@/components/Logo';
import PageHead from '@/components/PageHead';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Termscheck from '@/components/join/Termscheck';
import { toast } from 'react-hot-toast';
import { ClientResponseError } from 'pocketbase';
import { emailReg, idReg, pwReg } from '@/utils/validation';
import Button from '@/components/Button';

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value.replace(/(\s+)/g, ''),
    });
  };

  const handleIdDuplication = async () => {
    const id = formState.username;

    if (id === '') toast.error('입력된 값이 없습니다.');
    else {
      try {
        const records = await pb.collection('user').getList(1, 1, {
          filter: `username = '${id}'`,
        });
        if (records.items.length > 0) {
          toast.error('아이디가 중복됩니다.');
        } else {
          toast.success('사용 가능한 아이디입니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEmailDuplication = async () => {
    const email = formState.email;
    if (email === '') toast.error('입력된 값이 없습니다.');
    else {
      try {
        const records = await pb.collection('user').getList(1, 1, {
          filter: `email = '${email}'`,
        });
        if (records.items.length > 0) {
          toast.error('이메일이 중복됩니다.');
        } else {
          toast.success('사용 가능한 이메일입니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNicknameDuplication = async () => {
    const nickname = formState.nickname;

    if (nickname === '') toast.error('입력된 값이 없습니다.');
    else {
      try {
        const records = await pb.collection('user').getList(1, 1, {
          filter: `nickname = '${nickname}'`,
        });
        if (records.items.length > 0) {
          toast.error('닉네임이 중복됩니다.');
        } else {
          toast.success('사용 가능한 닉네임입니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { username, nickname, email, password, passwordConfirm } =
        formState;

      const newUser = {
        email: email,
        emailVisibility: true,
        username: username,
        nickname: nickname,
        password: password,
        passwordConfirm: passwordConfirm,
      };

      if (!username) {
        toast.error('아이디는 필수 입력 값입니다.');
        return;
      }

      if (!email) {
        toast.error('이메일은 필수 입력 값입니다.');
        return;
      }

      if (!nickname) {
        toast.error('닉네임은 필수 입력 값입니다.');
        return;
      }

      if (!password) {
        toast.error('비밀번호는 필수 입력 값입니다.');
        return;
      }

      if (nickname.length < 2 || nickname.length > 10) {
        toast.error('닉네임은 2자 이상, 10자 이하로 입력해주세요.');
        return;
      }

      if (nickname.includes(' ')) {
        toast.error('닉네임에는 공백이 포함될 수 없습니다.');
        return;
      }

      if (!idReg(username)) {
        toast.error('아이디 형식이 잘못되었습니다.');
        return;
      }

      if (!pwReg(password)) {
        toast.error('비밀번호 형식이 잘못되었습니다.');
        return;
      }

      if (!emailReg(email)) {
        toast.error('이메일 형식이 잘못되었습니다.');
        return;
      }

      if (password !== passwordConfirm) {
        toast.error('비밀번호가 일치하지 않습니다.');
        return;
      }

      if (!isAgreed) {
        toast.error('약관에 동의해주세요.');
        return;
      }

      const record = await pb.collection('user').create(newUser);

      if (record?.id) {
        toast.success('회원가입이 완료됐습니다.');
        navigate('/login');
      } else {
        toast.error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      if (!(error instanceof ClientResponseError)) {
        console.error('회원가입 실패:', error);
        toast.error('회원가입에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <PageHead title="Jeju All in One - 회원가입" />
      <LoginPageContent>
        <Logo />

        {/* 회원가입 폼 */}
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-3 mb-5 items-center mx-5"
        >
          <div className="w-full flex gap-2 justify-center max-w-[400px]">
            <InputField
              id="id"
              type="text"
              name="username"
              placeholder="아이디"
              value={formState.username}
              onChange={handleInput}
            />
            <Button
              onClick={handleIdDuplication}
              type="button"
              textSize="text-xs"
              width="w-[80px]"
              txtColor="darkblue"
              bgColor="bg-transparent"
              border="border-2 border-blue"
              hover="hover:text-white hover:bg-blue"
            >
              중복 확인
            </Button>
          </div>
          <div className="w-full flex gap-2 justify-center max-w-[400px]">
            <InputField
              id="nickname"
              type="text"
              name="nickname"
              placeholder="닉네임 (공백 없이 2~10자)"
              value={formState.nickname}
              onChange={handleInput}
              maxLength={10}
            />
            <Button
              onClick={handleNicknameDuplication}
              type="button"
              textSize="text-xs"
              width="w-[80px]"
              txtColor="darkblue"
              bgColor="bg-transparent"
              border="border-2 border-blue"
              hover="hover:text-white hover:bg-blue"
            >
              중복 확인
            </Button>
          </div>
          <div className="w-full flex gap-2 justify-center max-w-[400px]">
            <InputField
              id="email"
              type="text"
              name="email"
              placeholder="이메일"
              value={formState.email}
              onChange={handleInput}
              maxLength={50}
            />
            <Button
              onClick={handleEmailDuplication}
              type="button"
              textSize="text-xs"
              width="w-[80px]"
              txtColor="darkblue"
              bgColor="bg-transparent"
              border="border-2 border-blue"
              hover="hover:text-white hover:bg-blue"
            >
              중복 확인
            </Button>
          </div>
          <InputField
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleInput}
          />
          <p className="text-gray-400">
            특수문자 포함 최소 8자 이상, 16자 이하로 만들어 주세요.
          </p>
          <InputField
            id="checkPassword"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            onChange={handleInput}
          />
          {/* 약관 동의 */}
          <Termscheck setIsAgreed={setIsAgreed} />
        </form>

        {/* 로그인 페이지 이동 */}
        <p className="mt-3 mr-10 text-center">
          이미 회원이신가요?&nbsp;
          <LinkItem link="/login" className="font-extrabold text-blue">
            로그인 하기
          </LinkItem>
        </p>
      </LoginPageContent>
    </>
  );
}
