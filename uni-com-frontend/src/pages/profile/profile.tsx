
import './profile.css';
import { getStudentProfile, getAdminProfile} from '../../API';
import type { StudentProfile } from '../../API';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
export default function Profile() {
  const navigate = useNavigate();
const location = useLocation();
 const [profile, setProfile] = useState<StudentProfile["data"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [_error, setError] = useState<string | null>(null);
  const role = sessionStorage.getItem("role"); // or localStorage
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const role = sessionStorage.getItem("role"); // or localStorage
        let data;

        if (role === "Admin") {
          data = await getAdminProfile();
        } else if (role === "Student") {
          data = await getStudentProfile();
        } else {
          throw new Error("Unknown role");
        }

        setProfile(data.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const [fullName, setFullName] = useState("");
  const [_email, setEmail] = useState("");
  const [level, setLevel] = useState<number | "">("");
  const [date, setDate] = useState<string | "">("");
  const [department, setDepartment] = useState<string | "">("");

  useEffect(() => {
  if (profile) {
    setFullName(profile.fullName);
    setEmail(profile.email);
    setLevel(profile.level);

    const jd = role === "Admin" ? profile.registeredAt : profile.dateJoined;
    if (jd) {
      const parsed = new Date(jd);
      setDate(!isNaN(parsed.getTime()) ? parsed.toLocaleDateString() : "");
    } else {
      setDate("");
    }

    setDepartment(profile.department);
  }
}, [profile, role]);
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
          <h2>{loading ? "Fetching..." : fullName}</h2>
          <p className="level">{loading ? "Fetching..." : `${department} - ${level} Level`}</p>
          <p className="joined">{loading ? "Fetching..." : `Joined: ${date}`}</p>
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
