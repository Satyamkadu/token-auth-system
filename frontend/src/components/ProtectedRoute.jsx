import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = () => {
  // Check the persistent refresh token, not the volatile access token
  const { refreshToken } = useContext(AuthContext);

  if (!refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;