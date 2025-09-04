import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { resendconfirmemail } from "./API";
import { toast } from "react-toastify";
import { loginUser } from "./API";
import "./loginlogin.css";
import LoginImg from "./assets/b0f745d9-368d-4e8a-b2e0-b936c574a9e4.png";
interface LoginProps {
  handleLogin: (role: string) => void;
}
export default function Login({ handleLogin }: LoginProps) {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

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
      const form = { email, password };
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);

      switch (role) {
        case "Student":
          await loginUser(role, form);
          navigate("/");
          break;
        case "Admin":
          await loginUser(role, form);
          navigate("/Admin/Overview");
          break;
        default:
          break;
      }
      handleLogin(role);
    } catch (error: any) {
      console.log("error", error);
      toast.error(
        error.response?.data?.message || "An error occurred while logging in."
      );
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
      toast.error(
        err.response?.data?.message || "Failed to resend confirmation email."
      );
      console.error("Resend email error:", err.response);
    }
    setResending(false);
  };
  return (
    <div className="form-page">
      <div className="form-container">
        <div>
          <img src={LoginImg} alt="login" />
        </div>

        <form className="form-box"  onSubmit={handleSubmit}>
          <div className="loginlogin-form-header">
              <h1>Welcome Back</h1>
              <p>Login to your UniConnect account</p>
            </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className="form-group">
            <div>
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
            
          </div>

          <div className="form-group">
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
                <div className="login-links">
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </div>
        </form>
        
      </div>
    </div>
  );
}
