import Avatar from "../pages/profile/avatar";
import { GetFullName } from "../UserInfo/fullname";
import { GetEmail } from "../UserInfo/fullname";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  popup: boolean;
  setPopup: (value: boolean) => void;
  popupRefII: React.RefObject<HTMLUListElement | null>;
  handleLogout: () => void;
}
export default function Popup({
  popup,
  setPopup,
  popupRefII,
  handleLogout,
}: NavbarProps) {
  const navigate = useNavigate();
  return (
    <>
      <ul className="nav-user-settings" ref={popupRefII}>
  <li
    className="nav-li-first"
    onClick={(e) => {
      e.stopPropagation();
      setPopup(!popup);
    }}
  >
    <Avatar height={50} width={50} />
  </li>
  <li className="nav-li-second">
    {popup && (
      <div className="user-profile-popup">
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

            <div className="nav-logout" onClick={handleLogout}>
              <i className="bi bi-door-open"></i>
              <p>Log Out</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </li>
</ul>

    </>
  );
}
