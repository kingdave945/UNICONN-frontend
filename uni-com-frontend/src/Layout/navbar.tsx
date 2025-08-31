import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import { GetFullName } from "../UserInfo/fullname";
import { GetEmail } from "../UserInfo/fullname";
import "../Layout/navbar.css";
interface NavbarProps {
  theme: string;
  setIsCollapsed: (value: boolean) => void;
  handleLogout: () => void;
  toggleTheme: () => void;
  setIsPublic: (value: boolean) => void;
  setIsCleared: (value: boolean) => void;
  isPublic: boolean;
  isCollapsed: boolean;
  role: string | null; // Optional role prop for conditional rendering
}
export default function NavBar({
  isCollapsed,
  setIsCollapsed,
  theme: _theme,
  toggleTheme: _toggleTheme,
  setIsPublic: _setIsPublic,
  isPublic: _isPublic,
  role: _role,
  handleLogout,
  setIsCleared
}: NavbarProps) {
  const navigate = useNavigate();
  const popupRefII = useRef<HTMLUListElement | null>(null);
  const rawUser = sessionStorage.getItem("user");
  const userData = rawUser ? JSON.parse(rawUser) : null;
  const tokenKey = userData?.token;
  const [popup, setPopup] = useState(false);
  // const openSearch = () => {
  //   if (iconRef.current) {
  //     const r = iconRef.current.getBoundingClientRect();
  //     setIconPos({
  //       x: r.left + r.width / 2,
  //       y: r.top + r.height / 2,
  //     });
  //   }
  //   setSearchOpen(true);
  // };

  // const handleLogout = () => {
  //   sessionStorage.clear();
  //   sessionStorage.removeItem("Ustoken");
  //   navigate("/");
  // };
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

  // useEffect(() => {
  //   function handleClickOutside(e: MouseEvent) {
  //     if (
  //       popupRef.current &&
  //       !popupRef.current.contains(e.target as Node) &&
  //       !iconRef.current?.contains(e.target as Node)
  //     ) {
  //       setSearchOpen(false);
  //     }
  //   }

  //   if (searchOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [searchOpen]);
  // const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.trim().toLowerCase();
  //   setQuery(value);

  //   if (!value) {
  //     setSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  //     );
  //     const data = await res.json();

  //     if (data.meals) {
  //       setSuggestions(data.meals.slice(0, 5));
  //     } else {
  //       setSuggestions([{ strMeal: "Not Found", idMeal: "0" }]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //   }
  // };

  // const isLoggedIn = role === "Admin";

  return (
    <nav className="nav">
      <div className="nav-link">
        <div  style={{display:'flex', alignItems:'center', gap:'20px'}}>
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

        {/* <div className="nav-links">
          <div>
            {tokenKey ? (
              <div className="search-inputII"   onClick={openSearch}  ref={iconRef}>
                <input
                  type="text"
                  value={query}
                  onChange={handleInput}
                  placeholder="Find..."
                  autoFocus
                />
                <button
                
                  className="nav-search-icon"
                
                  aria-label="Open search"
                  type="button"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            ) : (
              <div className="nav-auth-links">
                <Link to="/login">Login</Link>
                <span>/</span>
                <Link to="/register">Register</Link>
              </div>
            )}
          </div>
        </div> */}

        {/* <AnimatePresence>
          {searchOpen && (
            <>
             
              <motion.div
                className="search-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "black",
                  zIndex: 999,
                }}
              />

              <motion.div
                ref={popupRef}
                className="search-popup"
                initial={{
                  opacity: 0,
                  scale: 0.3,
                  x: iconPos.x - window.innerWidth / 2,
                  y: iconPos.y - window.innerHeight / 2,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.3,
                  x: iconPos.x - window.innerWidth / 2,
                  y: iconPos.y - window.innerHeight / 2,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  position: "fixed",
                  top: "2%",
                  left: "30%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1000,
                }}
              >
                <div className="search-popup-content">
                  <div className="search-input">
                    <input
                      type="text"
                      value={query}
                      onChange={handleInput}
                      placeholder="Search meals..."
                      autoFocus
                    />
                    <button onClick={() => setSearchOpen(false)}>
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                  <div>
                    {suggestions.length > 0 && (
                      <ul className="suggestions">
                        {suggestions.map((meal) => (
                          <li
                            key={meal.idMeal}
                            onClick={() =>
                              meal.idMeal !== "0" &&
                              (window.location.href = `https://www.themealdb.com/meal/${meal.idMeal}`)
                            }
                          >
                            {meal.strMeal}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence> */}

        <div className="nav-search">
          {/* <div
            className={`toggle-switch ${isPublic ? "on" : "off"}`}
            onClick={toggleTheme}
          >
            <div className="toggle-thumb"></div>
          </div> */}
          {tokenKey && (
            <>
           <div>
            <span  onClick={() => setIsCleared(true) }>
              <i className='bi bi-gear'></i>
            </span>
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
