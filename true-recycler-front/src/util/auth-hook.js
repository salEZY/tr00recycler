import { useState, useCallback } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [email, setEmail] = useState("");

  const login = useCallback(
    (uid, token, email) => {
      setToken(token);
      setUserId(uid);
      setEmail(email);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userId,
          token: token,
          email: email,
        })
      );
    },
    [userId]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setEmail(null);
    localStorage.removeItem("userData");
  }, []);

  return { token, userId, email, login, logout };
};
