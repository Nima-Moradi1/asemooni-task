import { create } from "zustand";
import Cookies from 'js-cookie';
import { persist } from 'zustand/middleware';


type AuthState = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};
type UserState = {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
  clearUser: () => void;
};
type UserProps = {
  firstName: string;
  lastName: string;
  phoneNumber : string,
  email: string;
  password:string,
  image : string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token:string) => {
        Cookies.set('token', token, { expires: 7 , path: "/" });
        set({ token });
      },
      clearToken: () => {
        Cookies.remove('token');
        set({ token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);