import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";
import { removeToken, setToken } from "../lib/cookies";
import { AuthResponse, User } from "../types/response/authResponse";

type AppStoreType = {
  isLoading: boolean;
  user: User | null;
  isAuthenticated: boolean;
  setLoading: (status: boolean) => void;
  setUser: (user: User) => void;
  login: (userLogin: AuthResponse) => void;
  logout: () => void;
};

const useAppStoreBase = create<AppStoreType>((set) => ({
  isLoading: false,
  user: null,
  isAuthenticated: false,
  setLoading: (status) => {
    set(
      produce<AppStoreType>((state) => {
        state.isLoading = status;
      })
    );
  },
  setUser: (user) => {
    set(
      produce<AppStoreType>((state) => {
        state.user = user;
      })
    );
  },
  login: (userResponse) => {
    setToken(userResponse.jwt);
    set(
      produce<AppStoreType>((state) => {
        state.isAuthenticated = true;
        state.user = userResponse.user;
      })
    );
  },
  logout: () => {
    removeToken();
    set(
      produce<AppStoreType>((state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
    );
  },
}));

const useAppStore = createSelectorHooks(useAppStoreBase);

export default useAppStore;
