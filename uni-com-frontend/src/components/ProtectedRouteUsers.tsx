import { Navigate, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};
export default function ProtectedRouteUsers({ children }: ProtectedRouteProps) {
    const rawUser = sessionStorage.getItem("user");
    const userData = rawUser ? JSON.parse(rawUser) : null;
    const tokenKey = userData?.token;
console.log('MY TOKEN KEY:',tokenKey )
  const token = tokenKey;
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}


