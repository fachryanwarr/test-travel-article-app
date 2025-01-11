import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { getToken } from "../lib/cookies";
import sendRequest from "../lib/getApi";
import useAppStore from "../store/useAppStore";
import { User } from "../types/response/authResponse";

type AuthContextType = {
  checkAuth: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const login = useAppStore.useLogin();
  const logout = useAppStore.useLogout();
  const setLoading = useAppStore.useSetLoading()

  const checkAuth = async () => {
    const token = getToken();

    if (token) {
      console.log(1);
      const { isSuccess, data } = await sendRequest<User>("GET", "/users/me");

      if (isSuccess && data) {
        login({ jwt: token, user: data });
      } else {
        logout();
      }
    } else {
      logout();
    }
  };

  useEffect(() => {
    setLoading(true)
    checkAuth();
    setLoading(false)
  }, []);

  return (
    <AuthContext.Provider value={{ checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
