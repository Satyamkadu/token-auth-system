import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

  const [sessionId, setSessionId] = useState(
    localStorage.getItem("sessionId")
  );


  const login = (access, refresh, session) => {
    localStorage.setItem("token", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("sessionId", session);

    setToken(access);
    setRefreshToken(refresh);
    setSessionId(session);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionId");

    setToken(null);
    setRefreshToken(null);
    setSessionId(null);

  };

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        sessionId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};