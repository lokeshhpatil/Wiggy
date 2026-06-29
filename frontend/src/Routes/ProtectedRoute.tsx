import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseAppData } from "../context/AppContext";

type Role = "user" | "restaurant" | "rider" | "admin";

const ProtectedRoute = () => {
  const { isAuth, user, loading } = UseAppData();
  const location = useLocation();

  // Show nothing while checking auth status
  if (loading) return null;

  // 1. Not authenticated → go to login
  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 2. Authenticated but no role selected → go to role selection
  if (!user?.role && location.pathname !== "/select-role") {
    return <Navigate to="/select-role" replace />;
  }

  // 3. Already has role but trying to access role selection → go to dashboard
  if (user?.role && location.pathname === "/select-role") {
    return <Navigate to="/" replace />;
  }

  // 4. Role-based redirects
  if (user?.role) {
    const roleRoutes: Partial<Record<Role, string>> = {
      restaurant: "/restaurant",
      user: "/",
      rider: "/rider-dashboard",
      admin: "/admin",
    };

    const targetPath = roleRoutes[user.role as Role];

    // Only redirect if user is not already on their role-specific path
    // This prevents redirect loops
    if (targetPath && !location.pathname.startsWith(targetPath)) {
      // Allow access to other shared routes (like settings, profile, etc.)
      const sharedRoutes = ["/settings", "/profile", "/notifications"];
      const isSharedRoute = sharedRoutes.some((route) =>
        location.pathname.startsWith(route),
      );

      if (!isSharedRoute) {
        return <Navigate to={targetPath} replace />;
      }
    }
  }

  // 5. Authorized → render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
