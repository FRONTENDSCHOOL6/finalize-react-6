import { useAuthStore } from '@/store/useAuthStore';
import { element } from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ReplaceRoute({ children }) {
  const { pathname, search, hash } = useLocation();
  const { token } = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const wishLocationPath = `${pathname}${search}${hash}`;

  useEffect(() => {
    if (token) {
      navigate('/', { state: { wishLocationPath } });
    }
  }, [token, navigate, wishLocationPath]);

  return children;
}

ReplaceRoute.propTypes = {
  children: element,
};
