import pb from '@/api/pocketbase';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import LinkItem from '@/components/LinkItem';
import { SubLogo } from '@/components/Logo';
import PageHead from '@/components/PageHead';
import LoginPageContent from '@/components/login/LoginPageContent';
import { useVerification } from '@/hooks/useVerification';
import debounce from '@/utils/debounce';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FindId() {
  const [formEmail, setFormEmail] = useState('');
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [isUser, setIsUser] = useState(false);

  const handleInput = debounce((e) => {
    setFormEmail(e.target.value);
  });

  const { data: isVerification } = useVerification(userId);
  console.log('isVerification', isVerification);

  const sendEmailVerification = async (email) => {
    try {
      const response = await pb.collection('user').requestVerification(email);

      if (response) {
        // toast('이메일 검증을 위한 이메일을 보냈습니다. 메일함을 확인하세요.', {
        //   position: 'top-center',
        //   icon: '❗',
        //   ariaProps: {
        //     role: 'alert',
        //     'aria-live': 'polite',
        //   },
        //   duration: 1500,
        // });
        // 유효한 유저인지, 아닌지 처리
        try {
          const records = await pb.collection('user').getList(1, 1, {
            filter: `email = '${email}'`,
          });
          setIsUser(true);
          setUserId(records.items[0].id);
          setUserName(records.items[0].username);
          // 유저 정보 가져오는 에러 처리
        } catch (error) {
          console.error(error);
          setIsUser(false);
        }
        setFormEmail('');
      }
      // 메일 보내는 에러 처리
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageHead title="Jeju All in One - 아이디 찾기" />

      <LoginPageContent>
        <SubLogo />
        {isVerification === undefined && !isUser ? (
          <div className="flex flex-col mx-auto">
            <h2 className="text-xl text-darkblue text-center font-bold mb-3">
              아이디 찾기
            </h2>
            <p className="text-center mx-5">
              회원가입 시 등록한 이메일 주소가 유효한 지 검증이 필요합니다.
            </p>
            <div className="flex flex-col gap-3 my-8 mx-5">
              <label htmlFor="email" className="sr-only">
                이메일 검증
              </label>
              <InputField
                id="email"
                name="email"
                placeholder="이메일"
                onChange={handleInput}
              />

              <Button
                type="button"
                onClick={() => sendEmailVerification(formEmail)}
              >
                이메일 검증
              </Button>
            </div>
          </div>
        ) : // 이메일이 전송됐고, 에러가 생긴다면(유저가 아니거나, 검증이 안됐거나)
        isVerification === false ? (
          <div className="flex flex-col gap-3 m-8 justify-center items-center">
            <p>인증이 완료되지 않았거나 이메일이 유효하지 않습니다.</p>
            <p>인증하셨다면 조금만 기다려주십시오.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 m-8 justify-center items-center">
            <p>유효한 이메일입니다.</p>
            <p>
              아이디는{' '}
              <span className="text-blue font-extrabold">{userName}</span>{' '}
              입니다
            </p>
          </div>
        )}
        <p className="mx-auto">
          <LinkItem link="/login" className="font-extrabold text-blue">
            로그인
          </LinkItem>
          으로 돌아가기
        </p>
      </LoginPageContent>
    </>
  );
}
