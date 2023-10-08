import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const PrivateRoutes = () => {
  const { token } = useAuth();

  let auth: { token: boolean } = { token: token ? true : false };
  
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
