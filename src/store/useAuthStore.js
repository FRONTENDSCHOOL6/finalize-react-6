import pb from '@/api/pocketbase';
import { create } from 'zustand';

// 로그인을 통해 토큰을 받고,
// 그 토큰을 담아 get() 요청을 보내
// 서버의 인가(authorization)를 완료하면
// 내 정보를 담은 객체를 받을 수 있다.

// 스토어에 저장할 상태와,
// 상태를 수정할 수 있는 action을 같은 스토어 내에서 정의

const userInitState = {
  username: '',
  userId: '',
  token: '',
  email: '',
};

export const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) => {
    set({ user: user });
  },

  logout: () => {
    set({
      user: userInitState,
    });
    pb.authStore.clear();
  },
}));
