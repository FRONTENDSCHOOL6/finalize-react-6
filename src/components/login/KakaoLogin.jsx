export default function KakaoLogin() {
  const REST_API_KEY = '31f2b1ab7dcd9129cde0a0f768e39c1f';
  const REDIRECT_URI = 'http://localhost:3000/auth';

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <button
        className="w-[400px] h-[50px] font-semibold text-black bg-KakaoYellow rounded-md"
        onClick={handleLogin}
      >
        카카오로 로그인
      </button>
    </>
  );
}
