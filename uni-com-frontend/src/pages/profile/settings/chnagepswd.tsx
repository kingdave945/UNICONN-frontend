import { changePassword } from "../../../API";
import { toast } from "react-toastify";
import { useState,  } from "react";
// import { GetEmail } from "../../../UserInfo/fullname";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
  // useEffect(() => {
  //   const emailFromStorage = GetEmail();
  //   setEmail(emailFromStorage);
  // }, []);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [matchPassword, setMatchPassword] = useState(true);
  const rawUser = sessionStorage.getItem("user");
  const userData = rawUser ? JSON.parse(rawUser) : null;
  const tokenKey = userData?.data?.token;
const passwordChecker = (): boolean => {
  if (newPassword !== confirmPassword) {
    setMatchPassword(false);
    return false;
  } else {
    setMatchPassword(true);
    return true;
  }
};
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // if (!tokenKey) {
    //   toast.error("Session expired. Please log in again.");
    //   return;
    // }
      
      if (!passwordChecker()) {
    toast.error("Passwords do not match");
    return;
  }
    // if (tokenKey) {


      try {
         setLoading(true);
         await changePassword({
          oldPassword,
          newPassword,
        });
        toast.success("Password changed successfully.");
      } catch (error: any) {
        console.error("Error changing password:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    
    //  else{
    //   navigate('/login')
    //   toast.error("Session expired. Please log in again.");
    // }
  };
const handlePasswordChange = (e: string) => {
  const value = e;
  const errors = [];

  if (value.length < 8) errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(value)) errors.push("Must contain an uppercase letter");
  if (!/[a-z]/.test(value)) errors.push("Must contain a lowercase letter");
  if (!/[0-9]/.test(value)) errors.push("Must contain a number");
  if (!/[^A-Za-z0-9]/.test(value)) errors.push("Must contain a special character");

  setPasswordErrors(errors);
};

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    handlePasswordChange(newPassword);
  };
  return (
    <>
    <div className="user-profile-info-card">
      <div className="cp-card">
        <h2>Change Password</h2>
        <p>
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      {/* ✅ use a form */}
      <form onSubmit={handleSubmit}>
        <div className="Change-password">
          <div className="my-input-fields">
            <label>Old Password</label>
            <input
              type="password"
              placeholder="Old Password"
              name="oldPassword"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="my-input-fields">
            <label>New Password</label>
            <input
             type={showPassword ? "text" : "password"}
  
              placeholder="New Password"
              name="newPassword"
              required
              value={newPassword}
              onChange={inputChange}
            />
          </div>

          <div className="my-input-fields">
            <label>Confirm New Password</label>
            <input
               type={showPassword ? "text" : "password"}
    
              placeholder="Confirm New Password"
              name="confirmPassword"
              required
              value={confirmPassword}
               onChange={(e) => {setConfirmPassword(e.target.value);
                togglePasswordVisibility;
              }}
            />
          </div>
          {!matchPassword && (
            <span style={{color:'red'}}>Passwords do not match</span>
          )}
       
        </div>
  <div
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                     <span>Show Password</span>
                    ) : (
                       <span>Hide Password</span>
                    )}
                  </div>
        <div className="btn-up">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
       <div className="password-error-panel">
<div className="error-toast-container">
  {passwordErrors.map((error, index) => (
    <div key={index} className="error-toast">
      {error}
    </div>
  ))}
</div>

</div>
    </>
  );
}
