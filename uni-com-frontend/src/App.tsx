import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRouteUsers from "./components/ProtectedRouteUsers";
import Layout from "./Layout/layout";
import Dashboard from "./pages/dashboard";
import StudyMaterial from "./pages/studymaterial";
import Profile from "./pages/profile/profile";
import Materials from "./pages/profile/materials";
import Settings from "./pages/profile/settings/settings";
import Favorites from "./pages/profile/favorites";
import UserMan from "./Admin/usermanagement";
import Overview from "./Admin/overview";
import MaterialReview from "./Admin/materialreview";
import ForgetPassword from "./components/forgotpassword";
import ConfirmEmail from "./components/confirmemal";
import Login from "./loginlogin";
import ResetPassword from "./components/resetpassword";
import RegisterReg from "./registerreg";
import Register from "./register";
import AgentSkeleton from "./components/AgentSkeleton";
import MatSkeleton from "./components/matreviewskeleton";
import BrowseDepartmentMaterials from "./pages/browsedepartmentmaterials";
import Search from "./pages/search";
import Loader from "./components/Loader";
import OfflinePage from "./components/offline"; 
export default function App() {
  const navigate = useNavigate();

  const [role, setRole] = useState<string | null>(
    sessionStorage.getItem("role")
  );

  const handleLogin = (newRole: string) => {
    sessionStorage.setItem("role", newRole);
    setRole(newRole);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
    setRole(null);
    navigate("/login");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  
  if (!isOnline) {
    return <OfflinePage />;
  }

  return (
    <>
      <ToastContainer />
      <div className="applayout">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteUsers>
                <Layout
                  role={role}
                  handleLogout={handleLogout}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </ProtectedRouteUsers>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="/Browse-Department-Materials"
              element={<BrowseDepartmentMaterials />}
            />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<Navigate to="materials" />} />
              <Route path="materials" element={<Materials />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route
              path="/search"
              element={<Search searchQuery={searchQuery} />}
            />
            <Route path="/studymaterial" element={<StudyMaterial />} />
            <Route path="/Admin/Overview" element={<Overview />} />
            <Route path="/Admin/MaterialReview" element={<MaterialReview />} />
            <Route
              path="/Admin/User-Management"
              element={
                <UserMan
                  userStats={{
                    totalUsers: 0,
                    activeUsers: 0,
                    disabledUsers: 0,
                  }}
                />
              }
            />
          </Route>

          <Route path="/skeleton" element={<AgentSkeleton />} />
          <Route path="/mat-skeleton" element={<MatSkeleton />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/registerreg" element={<RegisterReg />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/diddy" element={<Loader />} />
        </Routes>
      </div>
    </>
  );
}
