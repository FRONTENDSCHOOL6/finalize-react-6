import pb from '@/api/pocketbase';
import { useAuthStore } from '@/store/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { setUser } = useAuthStore();

  const handleLogin = async () => {
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

      await pb.collection('user').update(user.record.id, updateUser);

      const updatedUser = await pb.collection('user').getList(1, 1, {
        filter: `username = '${id}'`
      })

      setUser({
        userId: id,
        username: username,
        email: email,
        token: token,
        isKakao: true,
        id: updatedUser.items[0].id
      });

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
        type="button"
        onClick={handleLogin}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14.111cm"
          height="1.764cm"
        >
          <path
            fillRule="evenodd"
            fill="#FEE500"
            d="M6 .009h387.1c4.214 0 6 2.686 6 6v38c0 3.313-1.786 6-6 6H6a6 6 0 01-6-6v-38a6 6 0 016-6z"
          />
          <path
            fillRule="evenodd"
            opacity={0.902}
            d="M25 16.985c-4.971 0-9 3.129-9 6.989 0 2.4 1.558 4.516 3.932 5.775l-.999 3.667c-.088.324.28.582.563.394l4.377-2.904c.37.036.745.057 1.127.057 4.97 0 8.1-3.129 8.1-6.989s-3.13-6.989-8.1-6.989"
          />
          <text fontFamily="AppleGothic" fontSize="15px" x="159px" y="31.83px">
            <tspan fontFamily="SUIT" fill="#191919">
              {'\uCE74\uCE74\uC624 \uB85C\uADF8\uC778'}
            </tspan>
          </text>
        </svg>
      </button>
    </>
  );
}
