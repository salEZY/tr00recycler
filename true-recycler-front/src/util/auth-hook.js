import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((user, token, expirationDate) => {
    setToken(token);
    setEmail(user.email);
    setUserId(user.uid);
    setJoined(user.created);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        user: {
          uid: user.uid,
          email: user.email,
          created: user.created,
        },
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setEmail(null);
    setJoined(null);
    setTokenExpirationDate(null);

    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, userId, email, joined, login, logout };
};
