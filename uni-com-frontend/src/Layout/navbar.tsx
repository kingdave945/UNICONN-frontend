import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { GetFullName } from "../UserInfo/fullname";
import { GetEmail } from "../UserInfo/fullname";
import "../Layout/navbar.css";
interface NavbarProps {

  setIsCollapsed: (value: boolean) => void;
  handleLogout: () => void;

 
  setIsCleared: (value: boolean) => void;

  isCollapsed: boolean;
  role: string | null;
  searchQuery: string;
  setSearchQuery:(value: string)=> void
}
export default function NavBar({
  isCollapsed,
  setIsCollapsed,
  role: _role,
  handleLogout,
  searchQuery,
  setSearchQuery,
  setIsCleared: _setIsCleared,
}: NavbarProps) {
  const navigate = useNavigate();
  const popupRefII = useRef<HTMLUListElement | null>(null);
  const rawUser = sessionStorage.getItem("user");
  const userData = rawUser ? JSON.parse(rawUser) : null;
  const tokenKey = userData?.token;
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popupRefII.current &&
        !popupRefII.current.contains(e.target as Node)
      ) {
        setPopup(false);
      }
    }

    if (popup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popup]);
  
  return (
    <nav className="nav">
      <div className="nav-link">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            className="sidebar-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <i
              className={`bi ${isCollapsed ? "bi bi-list" : "bi bi-list"}`}
            ></i>
          </div>
          <h3
            className="dream-home"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <span>Uniconnect</span>
          </h3>
        </div>

        <div className="nav-search">
          {tokenKey && (
            <>
              <div>
                <div className="navbar-search">
                   <i className="bi bi-search"></i>
                  <input
                   type="search"
                   placeholder="Search Materials..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   />
                 
                </div>
              </div>
              <ul className="nav-user-settings">
                <li
                  className="nav-avatar-circle"
                  onClick={() => setPopup(!popup)}
                >
                  <i className="bi bi-person-fill"></i>
                </li>
                <li className="nav-li-second">
                  <ul ref={popupRefII}>
                    <li>
                      <div className="user-profile-popup">
                        {popup ? (
                          <div>
                            <div className="popup-user-profile">
                              <div className="user-profile-info">
                                <h3>{GetFullName()}</h3>
                                <h4>{GetEmail()}</h4>
                              </div>
                              <div className="user-profile-actions">
                                <div
                                  className="nav-logout"
                                  onClick={() => navigate("/profile/settings")}
                                >
                                  <i className="bi bi-gear"></i>
                                  <p>Settings</p>
                                </div>

                                <div className="nav-logout">
                                  <i className="bi bi-door-open"></i>
                                  <p onClick={handleLogout}>Log Out</p>
                                </div>
                                <div className="nav-logout">
                                  <ul>
                                    <li
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      <i className="bi bi-palette"></i>{" "}
                                      <p>Theme</p>
                                    </li>
                                    {/* <li><ul>
                                <li >Light</li>
                                <li >Dark</li>
                              </ul></li> */}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
