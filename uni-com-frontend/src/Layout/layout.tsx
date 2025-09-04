import NavBar from "./navbar";
import SideBar from "./sidebar";
import Footer from "./footer";
import ActSettings from "./actionssettings";
import "./layout.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SkeletonCard from "../components/SkeletonCard";
interface SideBarProps {
  role: string | null;
  theme: string;
  handleLogout: () => void;
  toggleTheme: () => void;
  setIsPublic: (value: boolean) => void;
  isPublic: boolean;
}

export default function Layout({
  role,
  theme: _theme,
  toggleTheme: _toggleTheme,
  setIsPublic: _setIsPublic,
  isPublic: _isPublic,
  role: _role,
  handleLogout,
}: SideBarProps) {
  //   const [outletloading, setOutletLoading] = useState(true);
  //    useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOutletLoading(false);
  //   },  20 * 60 * 1000)

  //   return () => clearTimeout(timer);
  // }, []);

  const [isCleared, setIsCleared] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="layout">
      <NavBar
        setIsCleared={setIsCleared}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        theme={_theme}
        handleLogout={handleLogout}
        toggleTheme={_toggleTheme}
        setIsPublic={_setIsPublic}
        isPublic={_isPublic}
        role={_role}
      />

      <div className="layout__content">
        <SideBar isCollapsed={isCollapsed} role={role} />
        <main className="layout__main">
          <Outlet />
        </main>
        {isCleared && (
          <ActSettings
            handleLogout={handleLogout}
            setIsCleared={setIsCleared}
          />
        )}

        <Footer />
      </div>
    </div>
  );
}
