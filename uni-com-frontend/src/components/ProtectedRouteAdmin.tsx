// import { Navigate, useLocation } from "react-router-dom";

// type ProtectedRouteProps = {
//   children: React.ReactNode;
// };

// function ProtectedRouteAdmin({ children }: ProtectedRouteProps) {
//   const token = sessionStorage.getItem("Adtoken");
//   const location = useLocation();
//   if (!token) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }
//   return <>{children}</>;
// }

// export default ProtectedRouteAdmin;
