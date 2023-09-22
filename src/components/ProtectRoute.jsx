import { useAuthStore } from '@/store/useAuthStore';
import { element } from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

function ProtectRoute({ children }) {
  const { pathname, search, hash } = useLocation();
  const {token} = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const wishLocationPath = `${pathname}${search}${hash}`;

  useEffect(() => {
    if (!token) {
      import.meta.env.MODE === 'development' && toast.dismiss();

      toast('로그인이 필요합니다.', {
        position: 'top-right',
        icon: '🚨',
        ariaProps: {
          role: 'alert',
          'aria-live': 'polite',
        },
        duration: 1500
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
