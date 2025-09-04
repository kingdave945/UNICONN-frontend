import { Routes, Route } from "react-router-dom";
import ProtectedRouteUsers from "./components/ProtectedRouteUsers";
import { Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Register from "./register";
import "./App.css";
import { ToastContainer } from "react-toastify";
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
import { useState, useEffect } from "react";
import ForgetPassword from "./components/forgotpassword";
import ConfirmEmail from "./components/confirmemal";
import { useNavigate } from "react-router-dom";
import Login from "./loginlogin";
import ResetPassword from "./components/resetpassword";
import RegisterReg from "./registerreg";
import AgentSkeleton from "./components/AgentSkeleton";
import BrowseDepartmentMaterials from "./pages/browsedepartmentmaterials";
export default function App() {
  const [theme, setTheme] = useState("light");
  const [isPublic, setIsPublic] = useState(false); // false = toggle off, true = toggle on
  const navigate = useNavigate();
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const initial = saved || (prefersLight ? "light" : "dark");
    setTheme(initial);
    document.body.classList.add(initial);
    // Sync toggle with theme
    setIsPublic(initial === "dark"); // on if dark mode
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);

    // Flip the toggle state
    setIsPublic(newTheme === "dark");
  };

  const [role, setRole] = useState<string | null>(
    sessionStorage.getItem("role")
  );

  const handleLogin = (newRole: string) => {
    sessionStorage.setItem("role", newRole);
    setRole(newRole); // updates all children instantly
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("email");
    setRole(null);
    navigate("/login");
  };

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
                  theme={theme}
                  toggleTheme={toggleTheme}
                  setIsPublic={setIsPublic}
                  isPublic={isPublic}
                  handleLogout={handleLogout}
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
              <Route path="settings" element={<Settings />}></Route>
            </Route>
            <Route path="/studymaterial" element={<StudyMaterial />} />
            <Route
              path="/Admin/Overview"
              element={
                // <ProtectedRouteAdmin>
                // </ProtectedRouteAdmin>
                <Overview />
              }
            />
            <Route
              path="/Admin/MaterialReview"
              element={
                // <ProtectedRouteAdmin>
                // </ProtectedRouteAdmin>
                <MaterialReview />
              }
            />
            <Route
              path="/Admin/User-Management"
              element={
                // <ProtectedRouteAdmin>
                // </ProtectedRouteAdmin>
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
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/registerreg" element={<RegisterReg />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}
