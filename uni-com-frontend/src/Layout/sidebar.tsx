import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../API/Interceptor";

interface SideBarProps {
  role: string | null;
  isCollapsed: boolean;
  onClose?: () => void; // 🔹 for closing sidebar on click
}

export default function SideBar({ role, isCollapsed, onClose }: SideBarProps) {
  const location = useLocation();
  const [_pendingCount, setPendingCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await api.get("/api/Admin/waiting?page=1&pageSize=1");
        setPendingCount(response.data.data.totalItems);
      } catch (error) {
        console.error("❌ Failed to fetch pending count:", error);
      }
    };

    fetchPendingCount();
  }, []);

  const commonItems = [
    { label: "Home", icon: "bi bi-house-door", path: "/" },
    { label: "Study Materials", icon: "bi bi-upload", path: "/studymaterial" },
    { label: "My Profile", icon: "bi bi-person-circle", path: "/profile" },
  ];

  const adminItems = [
    { label: "User Management", icon: "bi bi-people", path: "/Admin/Overview" },
    {
      label: "Material Review",
      icon: "bi bi-file-earmark-spreadsheet",
      path: "/Admin/MaterialReview",
    },
  ];

  const isAdmin = role === "Admin";

  const renderNavItems = (items: any[]) =>
    items.map((item) => {
      const isProfileRoute = item.path === "/profile";
      const isActive =
        location.pathname === item.path ||
        (isProfileRoute && location.pathname.startsWith("/profile"));

      return (
        <li key={item.path} className="agent-sidebar__nav-item">
          <Link
            to={item.path}
            className={`agent-sidebar__link ${
              isActive ? "agent-sidebar__link--active" : ""
            }`}
            onClick={() => isMobile && onClose?.()} // 🔹 close on link click
          >
            <i className={item.icon}></i>
            {(isMobile || !isCollapsed) && (
              <span className="sidebar-label">{item.label}</span>
            )}
          </Link>
        </li>
      );
    });

  return (
    <>
      {/* Sidebar itself */}
      <div className={`agent-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <ul className="agent-sidebar__nav-list">
         {isMobile && <li className="firstLi">UniConnect</li>}
          {renderNavItems(commonItems)}
        </ul>

        {isAdmin && (
          <>
            {isCollapsed && !isMobile ? (
              <hr className="sidebar-divider" />
            ) : (
              <p className="sidebar-section-title">Admin Dashboard</p>
            )}
            <ul className="agent-sidebar__nav-list">
              {renderNavItems(adminItems)}
            </ul>
          </>
        )}
      </div>

      {/* Overlay for mobile */}
      {isMobile && !isCollapsed && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
    </>
  );
}
