import { createContext } from "react";

export const Auth = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  email: "",
  login: () => {},
  logout: () => {},
});
