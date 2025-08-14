import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
export default function SideBar() {
  const location = useLocation();
  const [ismobile, setIsMobile] = useState(true);
  const [_sidebar, _SetSideBar] = useState(true)
  const sidebarItems = [
    { label: "Home", icon: "bi bi-house-door", path: "/" },
    {
      label: "Study Materials",
      icon: "bi bi-journal-bookmark",
      path: "/studymaterial",
    },
    { label: "My Profile", icon: "bi bi-person-circle", path: "/profile" },
  ];
  const sidebarItemsI = [
    {  icon: "bi bi-house-door", path: "/" },
    {
    
      icon: "bi bi-journal-bookmark",
      path: "/studymaterial",
    },
    { icon: "bi bi-person-circle",
       path: "/profile" },
  ];
   const AdminProps = [
    { label: "Overview", icon: "bi bi-house-door", path: "/Admin/Overview" },
    {
      label: "User Management",
      icon: "bi bi-people",
      path: "/Admin/User-Management",
    },
    {
      label: "Material Review",
      icon: "bi bi-file-earmark-spreadsheet",
      path: "/Admin/MaterialReview",
    },
  ];
   const AdminPropsI = [
    {  icon: "bi bi-house-door", path: "/Admin/Overview" },
    {
      
      icon: "bi bi-people",
      path: "/Admin/User-Management",
    },
    {
   
      icon: "bi bi-file-earmark-spreadsheet",
      path: "/Admin/MaterialReview",
    },
  ];

  return (
    <>
  <div className="agent-sidebar-toggle">   
    <div className="side1">
      {ismobile ? (   
       <div className={"agent-sidebar"}>
          <div>
            <ul className="agent-sidebar__nav-list">
              {sidebarItems.map((item) => (
                <li key={item.label} className="agent-sidebar__nav-item">
                  <Link
                    to={item.path}
                    className={[
                      "agent-sidebar__link",
                      item.path === "/" && location.pathname === "/"
                        ? "agent-sidebar__link--active"
                        : item.path !== "/" &&
                          location.pathname.startsWith(item.path)
                        ? "agent-sidebar__link--active"
                        : "",
                    ].join(" ")}
                  >
                    <i
                      className={item.icon}
                      style={{ marginRight: "10px" }}
                    ></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              <p
                style={{
                  padding: "0.5rem 1rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Admin Dashboard
              </p>
              {AdminProps.map((item) => (
                <li key={item.label} className="agent-sidebar__nav-item">
                  <Link
                    to={item.path}
                    className={[
                      "agent-sidebar__link",
                      location.pathname === item.path
                        ? "agent-sidebar__link--active"
                        : "",
                    ].join(" ")}
                  >
                    <i
                      className={item.icon}
                      style={{ marginRight: "10px" }}
                    ></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="agent-sidebar__bottom">
            <Link
              to="/agent/add-material"
              className={[
                "agent-sidebar__link",
                location.pathname === "/agent/add-material"
                  ? "agent-sidebar__link--active"
                  : "",
              ].join(" ")}
            >
              <i className="bi bi-plus"></i>Add Material
            </Link>
          </div>
       </div>   
    )
    :
    (
    <div>
  <div className={"agent-sidebarI"}>
          <div>
            <ul className="agent-sidebar__nav-list">
              {sidebarItemsI.map((item) => (
                <li key={item.path}  className="agent-sidebar__nav-item">
                  <Link
                    to={item.path}
                    className={[
                      "agent-sidebar__link",
                      item.path === "/" && location.pathname === "/"
                        ? "agent-sidebar__link--active"
                        : item.path !== "/" &&
                          location.pathname.startsWith(item.path)
                        ? "agent-sidebar__link--active"
                        : "",
                    ].join(" ")}
                  >
                    <i
                      className={item.icon}
                      style={{ marginRight: "10px" }}
                    ></i>
                
                  </Link>
                </li>
              ))}
            </ul>
            <ul>
              
              {AdminPropsI.map((item) => (
                <li key={item.path} className="agent-sidebar__nav-item">
                  <Link
                    to={item.path}
                    className={[
                      "agent-sidebar__link",
                      location.pathname === item.path
                        ? "agent-sidebar__link--active"
                        : "",
                    ].join(" ")}
                  >
                    <i
                      className={item.icon}
                      style={{ marginRight: "10px" }}
                    ></i>
                 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
  </div>
    </div>
    )
    }
    </div>
       <div className="side2">
          { ismobile  ? 
          (
        <div onClick={()=>{setIsMobile(false)}} className="arrow1">
     <b><i  className="bi bi-chevron-left bold-icon"></i></b> 
        </div>
          ):(
          <div onClick={()=>{setIsMobile(true)}} className="arrow2">
         <i className="bi bi-chevron-right"></i>
          </div>
          )}
          <div>
          </div>
          </div>
     </div>
    </>
  );
}
