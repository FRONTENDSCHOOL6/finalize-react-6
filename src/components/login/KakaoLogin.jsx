import pb from '@/api/pocketbase';
import { useAuthStore } from '@/store/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { setUser } = useAuthStore();

  const handleLogin = async (e) => {
    // e.preventDefault();

    try {
      const user = await pb
        .collection('user')
        .authWithOAuth2({ provider: 'kakao' });

      const { id, username, email, accessToken: token } = user.meta;
      console.log(user.meta);

      const updateUser = {
        username: id,
        nickname: username,
        email,
        token,
      };

      setUser({
        userId: id,
        username: username,
        email: email,
        token: token,
        isKakao: true
      });

      await pb.collection('user').update(user.record.id, updateUser);

      if (!state) {
        navigate('/');
      } else {
        const { wishLocationPath } = state;
        navigate(wishLocationPath === '/login' ? '/' : wishLocationPath, {
          replace: true,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <>
      <button
        className="w-[400px] h-[50px] font-semibold text-black bg-KakaoYellow rounded-md"
        type='button'
        onClick={handleLogin}
      >
        카카오로 로그인
      </button>
    </>
  );
}
