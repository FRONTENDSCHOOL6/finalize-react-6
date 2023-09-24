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

      const updateUser = {
        username: id,
        nickname: username,
        email,
        token,
      };

      await pb.collection('user').update(user.record.id, updateUser);

      const updatedUser = await pb.collection('user').getList(1, 1, {
        filter: `username = '${id}'`,
      });

      setUser({
        userId: id,
        username: username,
        email: email,
        token: token,
        isKakao: true,
        id: updatedUser.items[0].id,
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
        className="w-full max-w-[400px] h-[50px] font-semibold text-black bg-KakaoYellow rounded-md"
        type="button"
        onClick={handleLogin}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1.764cm">
          <path
            fillRule="evenodd"
            opacity="0.902"
            fill="rgb(0, 0, 0)"
            d="M25.000,16.985 C20.029,16.985 16.000,20.114 16.000,23.974 C16.000,26.374 17.558,28.490 19.932,29.749 L18.933,33.416 C18.845,33.740 19.213,33.998 19.496,33.810 L23.873,30.906 C24.243,30.942 24.618,30.963 25.000,30.963 C29.970,30.963 33.1000,27.834 33.1000,23.974 C33.1000,20.114 29.970,16.985 25.000,16.985 "
          />
          <text
            kerning="auto"
            fontFamily="AppleGothic"
            fill="rgb(0, 0, 0)"
            fontSize="15px"
            x="38%"
            y="31.8px"
          >
            <tspan
              fontSize="15px"
              fontFamily="SUIT"
              fontWeight="bold"
              fill="#191919"
            >
              &#52852;&#52852;&#50724;&#32;&#47196;&#44536;&#51064;
            </tspan>
          </text>
        </svg>
      </button>
    </>
  );
}
