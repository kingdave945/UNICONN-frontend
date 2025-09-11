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
import { useState } from "react";
import ForgetPassword from "./components/forgotpassword";
import ConfirmEmail from "./components/confirmemal";
import { useNavigate } from "react-router-dom";
import Login from "./loginlogin";
import ResetPassword from "./components/resetpassword";
import RegisterReg from "./registerreg";
import AgentSkeleton from "./components/AgentSkeleton";
import BrowseDepartmentMaterials from "./pages/browsedepartmentmaterials";
import Search from "./pages/search";
import Loader from "./components/Loader";
export default function App() {

  const navigate = useNavigate();
 

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
  const [searchQuery, setSearchQuery] = useState("");
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
              <Route path="settings" element={<Settings />}></Route>
            </Route>
            <Route path="/search" element={<Search
             searchQuery={searchQuery}
              />}/>
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
          <Route path="/diddy" element={<Loader/>}/>
        </Routes>
      </div>
    </>
  );
}
