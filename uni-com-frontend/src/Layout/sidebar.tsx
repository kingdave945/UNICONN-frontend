import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
interface SideBarProps {
  role: string | null;
  isCollapsed: boolean;
}

export default function SideBar({ role, isCollapsed }: SideBarProps) {
  const location = useLocation();
  const commonItems = [
    { label: "Home", icon: "bi bi-house-door", path: "/" },
    { label: "Study Materials", icon: "bi bi-upload", path: "/studymaterial" },
    { label: "My Profile", icon: "bi bi-person-circle", path: "/profile" },
  ];

  const adminItems = [
    { label: "User Management", icon: "bi bi-people", path: "/Admin/Overview" },
    { label: "Material Review", icon: "bi bi-file-earmark-spreadsheet", path: "/Admin/MaterialReview" },
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
          <i className={item.icon}></i>
        
        
          {!isCollapsed &&   <span className="sidebar-label">{item.label}</span>  }
        </Link>
      </li>
    );
  });


  return (
    <div className="toggler">
    <div className={`agent-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <ul className="agent-sidebar__nav-list">
        {renderNavItems(commonItems)}
      </ul>

      {isAdmin && (
        <>
             {isCollapsed ? (
      <hr className="sidebar-divider" />
    ) : (
      <p className="sidebar-section-title">Admin Dashboard</p>
    )}
          <ul className="agent-sidebar__nav-list">{renderNavItems(adminItems)}</ul>
        </>
      )}

     
    </div>
    </div>
  );
}
