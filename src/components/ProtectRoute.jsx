import { useAuthStore } from '@/store/useAuthStore';
import { element } from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

// 아직 로딩 스피너 미구현
function ProtectRoute({ children }) {
  const { pathname, search, hash } = useLocation();
  const {token} = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const wishLocationPath = `${pathname}${search}${hash}`;

  useEffect(() => {
    if (!token) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('로그인 된 사용자만 이용 가능한 페이지입니다.', {
        position: 'top-center',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
      });

      navigate('/login', { state: { wishLocationPath } });
    }
  }, [token, navigate, wishLocationPath]);

  return children;
}

ProtectRoute.propTypes = {
  children: element,
};

export default ProtectRoute;
