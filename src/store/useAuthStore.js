import pb from '@/api/pocketbase';
import { create } from 'zustand';

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_LOGOUT_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGOUT_REDIRECT_URI;

// 로그인을 통해 토큰을 받고,
// 그 토큰을 담아 get() 요청을 보내
// 서버의 인가(authorization)를 완료하면
// 내 정보를 담은 객체를 받을 수 있다.

// 스토어에 저장할 상태와,
// 상태를 수정할 수 있는 action을 같은 스토어 내에서 정의

const userInitState = {
  username: null,
  userId: null,
  token: null,
  email: null,
  isKakao: false
};

export const useAuthStore = create((set, get) => ({
  user: userInitState,

  setUser: (user) => {
    set({ user: user });
  },

  // login: async (userId, password) => {
  //   await pb.collection('user').authWithPassword(userId, password);
  // },

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
}));
