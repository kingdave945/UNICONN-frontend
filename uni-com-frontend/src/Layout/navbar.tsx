import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Popup from "./popup";
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
        <div className="titleham" style={{ display: "flex", alignItems: "center", gap: "20px" }}>

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
              <div className="popup-component1">
              <Popup 
              popup={popup}
              setPopup={setPopup}
              popupRefII={popupRefII}
              handleLogout={handleLogout}

              />
              </div>
             
            </>
          )}
        </div>
{/* {tokenKey &&(
  <div className="popup-component2">
              <Popup
                popup={popup}
                setPopup={setPopup}
                popupRefII={popupRefII}
                handleLogout={handleLogout}
              />
            </div>
)}
      */}
      </div>
    </nav>
  );
}
