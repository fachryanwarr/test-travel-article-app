import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => {
  return cookies.get("@cakratravel/token");
};

export const setToken = (token: string) => {
  cookies.set("@cakratravel/token", token, {
    path: "/",
  });
};

export const removeToken = () => {
  cookies.remove("@cakratravel/token", {
    path: "/",
  });
};