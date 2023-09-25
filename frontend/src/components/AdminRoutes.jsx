import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default AdminRoutes;
