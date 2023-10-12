import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  let auth: { isAdmin: boolean } = { isAdmin: user.isAdmin || false };

  return auth.isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoutes;
