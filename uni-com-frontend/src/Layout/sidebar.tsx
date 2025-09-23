import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../API/Interceptor";
interface SideBarProps {
  role: string | null;
  isCollapsed: boolean;
}

export default function SideBar({ role, isCollapsed }: SideBarProps) {
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState(0);

  // 🔹 Fetch pending count when sidebar mounts
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
          >
    <i className={item.icon} style={{ position: "relative" }}>
  {isCollapsed  && (
    item.icon === 'bi bi-file-earmark-spreadsheet' &&(
 <span
      style={{
        position: "absolute",
        top: "-6px",  
        right: "-8px", 
        backgroundColor: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "0.65rem",
        fontWeight: "bold",
      }}
    >
      {pendingCount}
    </span>
    )
   
  )}
</i>

            {!isCollapsed && (
              <span className="sidebar-label" style={{ position: "relative" }}>
                {item.label}
                {item.label === "Material Review" && pendingCount > 0 && (
                  <span
                    style={{
                     position: "absolute",
        top: "-9px",  
        right: "-30px", 
        backgroundColor: "red",
        color: "white",
        borderRadius: "50%",
        padding: "2px 6px",
        fontSize: "0.65rem",
        fontWeight: "bold",
      }}
             
                  
                  >
                    {pendingCount}
                  </span>
                )}
              </span>
            )}
          </Link>
        </li>
      );
    });

  return (
    <div className="toggler">
      <div className={`agent-sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <ul className="agent-sidebar__nav-list">{renderNavItems(commonItems)}</ul>

        {isAdmin && (
          <>
            {isCollapsed ? (
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
    </div>
  );
}
