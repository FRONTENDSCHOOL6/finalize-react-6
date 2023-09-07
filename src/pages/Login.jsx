import pb from '@/api/pocketbase';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import LinkItem from '@/components/LinkItem';
import Logo from '@/components/Logo';
import KakaoLogin from '@/components/login/KakaoLogin';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation(); // location { pathname, search, hash, state = {  } }

  const [formState, setFormState] = useState({
    userId: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { userId, password } = formState;

    try {
      const response = await pb
        .collection('user')
        .authWithPassword(userId, password);

      setIsLogin(true);
      // 자동으로 localstorage에 저장
      // const { nickname, email } = response.record;
      // const userToken = response.token;

      // sessionStorage.setItem('userToken', userToken);

      if (!state) {
        navigate('/');
      } else {
        const { wishLocationPath } = state;
        navigate(wishLocationPath === '/login' ? '/' : wishLocationPath, { replace: true });
      }
    } catch (error) {
      setIsLogin(false);
      console.log('로그인 실패\n', error);
    }
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  return (
    <>
      {/* 헤드 이름 */}
      <Helmet>
        <title>Jeju All in One - 로그인 </title>
      </Helmet>

      {/* 마크업 */}
      <div className="flex flex-col items-center justify-center my-20">
        <Logo />
        <form className="flex flex-col gap-3" onSubmit={handleLogin}>
          <InputField
            name="userId"
            type="text"
            placeholder="아이디"
            defaultValue={formState.userId}
            onChange={handleInput}
          />
          <InputField
            name="password"
            type="password"
            placeholder="비밀번호"
            defaultValue={formState.password}
            onChange={handleInput}
          />

          {isLogin === false ? (
            <div className="text-center text-red-600 my-2">
              아이디 혹은 비밀번호를 잘못 입력했습니다.
            </div>
          ) : (
            ''
          )}

          <Button type="submit" txtColor="white" bgColor="bg-blue">로그인</Button>
          <KakaoLogin />
        </form>
        <div className="m-8">
          <LinkItem link="/findid">아이디 찾기</LinkItem>
          &nbsp;|&nbsp;
          <LinkItem link="/findpw">비밀번호 찾기</LinkItem>
        </div>
        <p>
          아직 회원이 아니신가요?&nbsp;
          <LinkItem link="/join" className="font-extrabold text-blue">
            회원가입 하기
          </LinkItem>
        </p>
      </div>
    </>
  );
}