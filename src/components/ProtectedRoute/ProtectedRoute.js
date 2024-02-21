import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("jwt_token");
  const role = Cookies.get("role");

  console.log(role,allowedRoles,token,"console")

  return role === allowedRoles && token !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to="/company-user-login" />
    // <Outlet />
  )
};

export default ProtectedRoute;
