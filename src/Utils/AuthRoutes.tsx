import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const AuthRoutes = () => {
  const { token } = useAuth();

  let auth: { token: boolean } = { token: token ? false : true };

  return auth.token ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AuthRoutes;
