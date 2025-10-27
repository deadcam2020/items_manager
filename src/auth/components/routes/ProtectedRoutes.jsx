// src/auth/components/routes/ProtectedRoutes.jsx
import { useAuthStore } from "@/auth/store/auth.store";
import { Navigate } from "react-router-dom";

export const AuthenticatedRoute = ({ children }) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />;

  return children;
};

export const NotAuthenticatedRoute = ({ children }) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "authenticated") return <Navigate to="/" />;

  return children;
};

export const AdminRoute = ({ children }) => {
  const { authStatus, isAdmin } = useAuthStore();

  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated") return <Navigate to="/auth/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};
