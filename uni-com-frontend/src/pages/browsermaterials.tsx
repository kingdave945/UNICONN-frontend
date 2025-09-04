import { useNavigate } from "react-router-dom";
import { GetLevel , GetDepartment } from "../UserInfo/fullname";
export default function BrowseDepartments() {
  const navigate = useNavigate()
  return (
    <div className="browser-materials-suggested">
      <div className="browse-dept">
        <h3>Explore More From Your Department</h3>
        <p>View all study materials available for Level {GetLevel()} {GetDepartment()} </p>
        <button
        onClick={()=>{navigate('/Browse-Department-Materials')}}>Explore Materials</button>
      </div>
    </div>
  );
};


