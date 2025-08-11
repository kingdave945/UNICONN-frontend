
import './profile.css';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
export default function Profile() {
  const navigate = useNavigate();
const location = useLocation();
  return (
    <div className="profile-container">
      {/* User Info */}
      <div className="profile-card">
        <div className="avatar-circle">
          <i className="bi bi-person-fill"></i>
          <div className="avatar-camera">
            <i className="bi bi-camera"></i>
          </div>
        </div>
        <div className="profile-info">
          <h2>Aisha Adeniyi</h2>
          <p className="level">Computer Science - 400 Level</p>
          <p className="joined">Joined: January 15, 2022</p>
          <p className="bio">
            Passionate computer science student with a keen interest in artificial intelligence and data structures. Always eager to learn and share knowledge with peers. Committed to building a strong academic community.
          </p>
        </div>
        <button className="edit-btn">
          <i className="bi bi-gear"></i> Edit Profile
        </button>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button className={location.pathname === '/profile/materials' ? 'active' : location.pathname !== "/profile/materials" && location.pathname.startsWith("/profile/materials")
        ? "active"
        : ""} onClick={() => navigate('/profile/materials')}>
          My Materials
        </button>
        <button className={location.pathname === '/profile/favorites' ? 'active' : ''} onClick={() => { navigate('/profile/favorites');

         }}>
          Favorites
        </button>
        <button className={location.pathname === '/profile/settings' ? 'active' : location.pathname !== "/profile/settings" && location.pathname.startsWith("/profile/settings")
        ? "active"
        : ""} onClick={() => navigate('/profile/settings')}>
          Settings
        </button>
      </div>
      <Outlet/>
    </div>
  );
}
