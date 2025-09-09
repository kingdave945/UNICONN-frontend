import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRouteAdmin({ children }: ProtectedRouteProps) {
  const location = useLocation();

  // Get the user object from sessionStorage
  const sessionData = sessionStorage.getItem("user");
  const parsed = sessionData ? JSON.parse(sessionData) : null;

  const token = parsed?.token;
  const roles: string[] = parsed?.user?.roles || [];

  // Check if the user has an admin role (case-insensitive)
  const isAdmin = roles.some((r) => r.toLowerCase() === "admin");

  if (!token || !isAdmin) {
    // Redirect non-admins or unauthenticated users to the home page
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

export default ProtectedRouteAdmin;
 