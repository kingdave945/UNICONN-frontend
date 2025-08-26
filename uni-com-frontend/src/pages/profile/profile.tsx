
import './profile.css';
import {GetFullName, GetDepartment, GetLevel} from '../../UserInfo/fullname';
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
          <h2>{GetFullName()}</h2>
          <p className="level">{GetDepartment()} - {GetLevel()} Level</p>
          <p className="joined">Joined: January 15, 2022</p>
        </div>
      </div>
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
