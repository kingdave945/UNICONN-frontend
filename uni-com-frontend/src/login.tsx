import './login.css'
import { Link } from 'react-router-dom';
import LoginImage from './assets/b0f745d9-368d-4e8a-b2e0-b936c574a9e4.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginStudent, loginAdmin } from './API';
import { toast } from 'react-toastify';
import NavBar from './Layout/navbar';
export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = { email: `${email}`, password: `${password}` };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role before logging in.");
      return;
    }
    setLoading(true);
    try {
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);
      switch (role) {
        case "user":
          await loginStudent(form);
          navigate("/");
          break;
        case "admin":
          await loginAdmin(form);
          navigate("/Admin/Overview");
          break;
        default:
          break;
      }
    } 
    catch (error:any) {
     console.log("error", error);
    // alert((error.response?.data?.message || "An error occurred while logging in."));
    toast.error(error.response?.data?.message || "An error occurred while logging in.")
      
    }
    setLoading(false);
  };
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
 
  };

  return (
    <>
      <NavBar
        theme="light"
        toggleTheme={() => {}}
        setIsPublic={() => {}}
        isPublic={false}
      />
    <div className="login-container">
        <div className='login-header'>
     <div className='login-img'>
<img src={LoginImage} alt="" />
     </div>
     <div className='login-form'>
        <div className='login-form-header'>
           <h1>
            Welcome Back
        </h1>  
        <p>
            Login to your UniConnect account
        </p>
        </div>
       <form className='login-form-content' onSubmit={handleSubmit}>
             <div className='login-role'>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              >
              <option value="">Select Role</option>
              <option value="agent">Admin</option>
              {/* <option value="admin">Admin</option> */}
              <option value="user">Student</option>
            </select>
          </div>
          <div className='login-input'>
            <label htmlFor="Email">Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
         <div className="register-input">
                  <label htmlFor="password">Password</label>
                  <div className="password-input">
                    <input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={password}
                      onChange={inputChange}
                      required
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye"></i>
                      ) : (
                        <i className="bi bi-eye-slash"></i>
                      )}
                    </div>
                  </div>
                </div>

          <div style={{textAlign:'right' , marginBottom:'50px'}}>
            <p>Forgot Password ? </p>
          </div>
          <button
className='login-btn'
         disabled={loading} >
            {loading ? <span className="loader"></span> : "Login"}
          </button>
</form>
<div className='login-links'>
<p >
     Dont have an account? <Link to="/register">Register</Link>
     </p>
</div>
</div>
     </div> 
    </div>

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    </>
  );
}