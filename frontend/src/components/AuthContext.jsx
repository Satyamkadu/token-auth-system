import { createContext, useState } from "react";
import { setAxiosToken } from "../api"
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Access token lives ONLY in memory, never in localStorage
  const [token, setToken] = useState(null);
  
  // Refresh token and Session ID can persist in localStorage
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId"));

  const login = (access, refresh, session) => {
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("sessionId", session);
    setAxiosToken(access)
    setToken(access);
    setRefreshToken(refresh);
    setSessionId(session);
  };

  const logout = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionId");
    setAxiosToken(null);
    setToken(null);
    setRefreshToken(null);
    setSessionId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
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