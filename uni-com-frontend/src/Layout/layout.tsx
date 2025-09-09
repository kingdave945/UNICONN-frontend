import NavBar from "./navbar";
import SideBar from "./sidebar";
import Footer from "./footer";
import ActSettings from "./actionssettings";
import "./layout.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface SideBarProps {
  role: string | null;
  theme: string;
  handleLogout: () => void;
  toggleTheme: () => void;
  setIsPublic: (value: boolean) => void;
  isPublic: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function Layout({
  role,
  theme: _theme,
  toggleTheme: _toggleTheme,
  setIsPublic: _setIsPublic,
  isPublic: _isPublic,
  role: _role,
  handleLogout,
  searchQuery,
  setSearchQuery,
}: SideBarProps) {
  const [isCleared, setIsCleared] = useState(false);
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      navigate("/search");
    }
  }, [searchQuery]);

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
