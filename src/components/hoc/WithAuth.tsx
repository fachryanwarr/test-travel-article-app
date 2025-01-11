import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../../lib/cookies";
import { DANGER_TOAST, showToast } from "../../lib/toast";

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requireAuth: boolean
) => {
  return (props: P) => {
    const token = getToken();

    if (requireAuth) {
      if (!token) {
        showToast("Login terlebih dulu!", DANGER_TOAST);
        return <Navigate to="/auth/login" />;
      }
    } else {
      if (token) return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
