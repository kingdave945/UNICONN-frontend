import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from './assets/b0f745d9-368d-4e8a-b2e0-b936c574a9e4.png';
import { useState } from 'react';
import { loginStudent, loginAdmin, resendconfirmemail } from './API'; // 👈 add resend API
import { toast } from 'react-toastify';


export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const form = { email: `${email}`, password: `${password}` };

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
    } catch (error: any) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "An error occurred while logging in.");
    }
    setLoading(false);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    setResending(true);
    try {
      await resendconfirmemail(email);
      toast.success("Confirmation email resent successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to resend confirmation email.");
    }
    setResending(false);
  };

  return (
    <>
  
      <div className="login-container">
        <div className="login-header">
          <div className="login-img">
            <img src={LoginImage} alt="" />
          </div>
          <div className="login-form">
            <div className="login-form-header">
              <h1>Welcome Back</h1>
              <p>Login to your UniConnect account</p>
            </div>
            <form className="login-form-content" onSubmit={handleSubmit}>
              <div className="login-role">
                <label htmlFor="role">Role:</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Student</option>
                </select>
              </div>
              <div className="login-input">
                <label htmlFor="Email">Email:</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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

              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <p
                  onClick={() => navigate("/forgot-password")}
                  style={{ cursor: "pointer", color: "cornflowerblue" }}
                >
                  Forgot Password?
                </p>
              </div>

              {/* 👇 Resend email confirmation option */}

              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <p
                  onClick={handleResend}
                  style={{ cursor: "pointer", color: "green" }}
                >
                  {resending ? "Resending..." : "Resend confirmation email"}
                </p>
              </div>

              <button className="login-btn" disabled={loading}>
                {loading ? <span className="loginloader"></span> : "Login"}
              </button>
            </form>
            <div className="login-links">
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
