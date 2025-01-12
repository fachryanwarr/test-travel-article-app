import Cookies from "universal-cookie";
import { User } from "../types/response/authResponse";

const cookies = new Cookies();

export const getToken = (): string => {
  return cookies.get("@cakratravel/token");
};

export const getUserData = () => {
  return {
    username: cookies.get("@cakratravel/username"),
    email: cookies.get("@cakratravel/email"),
  };
};

export const setToken = (token: string) => {
  cookies.set("@cakratravel/token", token, {
    path: "/",
  });
};

export const setUserData = (user: User) => {
  cookies.set("@cakratravel/username", user.username, {
    path: "/",
  });
  cookies.set("@cakratravel/email", user.email, {
    path: "/",
  });
};

export const removeToken = () => {
  cookies.remove("@cakratravel/token", {
    path: "/",
  });

  cookies.remove("@cakratravel/username", {
    path: "/",
  });
  cookies.remove("@cakratravel/email", {
    path: "/",
  });
};
