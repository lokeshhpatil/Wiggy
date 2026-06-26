import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseAppData } from "../context/AppContext";

const ProtectedRoute = () => {
  const { isAuth, user, loading } = UseAppData();
  const location = useLocation();
  if (loading) return null;

  if (!isAuth) {
    return <Navigate to={"/login"} replace />;
  }
  console.log("user:", user);
  console.log("role:", user?.role);
  console.log("loading:", loading);

  if (!user?.role && location.pathname !== "/select-role") {
    return <Navigate to={"/select-role"} replace />;
  }
  if (user?.role === null && location.pathname !== "/select-role") {
    return <Navigate to="/select-role" replace />;
  }

  if (user?.role && location.pathname === "/select-role") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
