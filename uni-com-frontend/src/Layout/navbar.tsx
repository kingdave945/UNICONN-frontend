import "./navBar.css";
import { Link, useNavigate,  } from "react-router-dom";
import { useState, useEffect } from "react";
 interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}
export default function NavBar({theme,toggleTheme}:NavbarProps) {
  const navigate = useNavigate();

  const [isPublic, setIsPublic] = useState(true);


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
            className={`toggle-switch ${isPublic ? 'off' : 'on'}`}
            onClick={() =>{ 
            setIsPublic(!isPublic);
            toggleTheme()
            }}
          >
            <div className="toggle-thumb"></div>
          </div>
      </div>
    </nav>
  );
}

;
