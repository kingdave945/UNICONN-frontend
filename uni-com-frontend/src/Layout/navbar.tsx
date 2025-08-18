import './navbar.css'
import { Link, useNavigate,  } from "react-router-dom";
 interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  setIsPublic: (value: boolean) => void;
  isPublic: boolean;
}
export default function NavBar({theme:_theme,toggleTheme,setIsPublic:_setIsPublic, isPublic}:NavbarProps) {
  const navigate = useNavigate();
  const UsToken = sessionStorage.getItem("Ustoken");
  const AdToken = sessionStorage.getItem("Adtoken");
  console.log('ADMIN TOKEN:', AdToken);
  console.log('USER TOKEN:', UsToken);
  const isLoggedIn = !!(UsToken || AdToken);
    const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.removeItem("Ustoken");
    sessionStorage.removeItem("Adtoken");
    navigate("/");
  };
  return (
    <nav className="nav">
      <div className="nav-link">
        <div>
          <h3
            className="dream-home"
            onClick={() => navigate("/")}
            style={{cursor:"pointer"}}
          >
           <span> U.C</span>
          </h3>
        </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/studymaterial">Study Materials</Link>
              <Link to="/profile">My Profile</Link>
             {isLoggedIn ? (
  <div className="nav-auth-links">
    <button
      onClick={handleLogout}
      style={{
        background: "none",
        border: "none",
        color: "#1e1e46",
        fontFamily: "Work Sans, sans-serif",
        cursor: "pointer"
      }}
    >
      Log Out
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
   <div
  className={`toggle-switch ${isPublic ? 'on' : 'off'}`}
  onClick={toggleTheme}
>
  <div className="toggle-thumb"></div>
</div>

      </div>
    </nav>
  );
}

;
