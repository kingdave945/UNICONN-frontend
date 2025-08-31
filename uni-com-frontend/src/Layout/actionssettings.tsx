import "./actsettings.css";

interface SideBarProps {

  handleLogout: () => void;
setIsCleared: (value: boolean) => void;
}

export default function ActSettings({ 
  handleLogout,setIsCleared }: SideBarProps) {

  return (
    <div>
      <div className="border-act">
        <div className="quick-set" style={{display:'flex', alignItems:'center', gap:'5rem'}}>
          <h3>Quick Settings</h3>
          <i className="bi bi-x-lg" onClick={()=>setIsCleared(false)}></i>
        </div>
        <div>
          <ul>
            <li>
                 <div className="nav-logout">
                <i className="bi bi-palette"></i>
                <p onClick={handleLogout}>Theme</p>
              </div>
            </li>
            <li>
              <div className="nav-logout">
                <i className="bi bi-door-open"></i>
                <p onClick={handleLogout}>Log Out</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
