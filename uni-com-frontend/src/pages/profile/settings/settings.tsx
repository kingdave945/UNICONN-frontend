// import { Link} from "react-router-dom";
import "../settings/settings.css";
// import { useNavigate } from "react-router-dom";
import ProfileInfo from "./updateprofileinfo";
import ChangePassword from "./chnagepswd";
import Delete from "./Delete";
export default function Settings() {
  return (
    <>
 
    <ProfileInfo/>
    <ChangePassword/>
    <Delete/>

    </>
  );
}
