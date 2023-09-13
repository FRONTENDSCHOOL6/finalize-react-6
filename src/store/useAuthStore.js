import pb from '@/api/pocketbase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_LOGOUT_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI;

const userInitState = {
  username: null,
  userId: null,
  token: null,
  email: null,
  isKakao: false
};

export const useAuthStore = create(persist((set, get) => ({
  user: userInitState,

  setUser: (user) => {
    set({ user: user });
  },

  logout: () => {
    const isKakao = get().user.isKakao;

    set({
      user: userInitState,
    });

    if (isKakao === true) {
      location.replace(
        `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_CLIENT_ID}&logout_redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}`
      );
    } else if(isKakao === false) {
      pb.authStore.clear();
    }
  },
}), {
  name: 'user'
}));
