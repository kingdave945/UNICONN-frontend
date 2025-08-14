import "./navBar.css";
import { Link, useNavigate,  } from "react-router-dom";

 interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  setIsPublic: (value: boolean) => void;
  isPublic: boolean;
}
export default function NavBar({theme,toggleTheme,setIsPublic, isPublic}:NavbarProps) {
  const navigate = useNavigate();


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
              <Link to="studymaterial">Study Materials</Link>
              <Link to="profile">My Profile</Link>
              <div className="nav-auth-links">
              <Link to="/login">Login</Link>
              <span>/</span>
              <Link to="/register">Register</Link>
              </div>
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
