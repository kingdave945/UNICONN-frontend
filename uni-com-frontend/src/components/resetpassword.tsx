import { useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../API";
export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const tokenKey = searchParams.get("token");

  const email = searchParams.get("email") || "";
  const token = tokenKey ? tokenKey : "";
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handlePasswordChange = (e: string) => {
    const value = e;
    const errors = [];

    if (value.length < 8) errors.push("Password must be at least 8 characters");
    if (!/[A-Z]/.test(value)) errors.push("Must contain an uppercase letter");
    if (!/[a-z]/.test(value)) errors.push("Must contain a lowercase letter");
    if (!/[0-9]/.test(value)) errors.push("Must contain a number");
    if (!/[^A-Za-z0-9]/.test(value))
      errors.push("Must contain a special character");

    setPasswordErrors(errors);
  };
  const passwordChecker = (): boolean => {
    if (newPassword !== confirmPassword) {
      setMatchPassword(false);
      return false;
    } else {
      setMatchPassword(true);
      return true;
    }
  };
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    handlePasswordChange(newPassword);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const encodedToken = encodeURIComponent(token);
  console.log("Reset payload:", {
  email,
  token: encodedToken,
  newPassword,
});
    if (!passwordChecker()) {
      toast.error("Passwords do not match");
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    if (!newPassword.trim()) {
      toast.error("New password is required.");
      return;
    }
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }
    try {
      await resetPassword({
        email: decodeURIComponent(email),
        token: decodeURIComponent(token),
        newPassword,
      });
      toast.success("Password Has Been Reset Successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="forgotpassword-container">
        <div className="forgotpassword">
          <h4>Reset Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="login-input">
              <input
                type="text"
                placeholder="Email not found"
                name="email"
                value={email}
                disabled
                required
              />
            </div>
            <div className="login-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                name="newPassword"
                value={newPassword}
                onChange={inputChange}
                required
              />
            </div>
            <div className="login-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {!matchPassword && (
              <span style={{ color: "red" }}>Passwords do not match</span>
            )}
            <div
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer", marginBottom: "1rem" }}
            >
              {showPassword ? (
                <span>Show Password</span>
              ) : (
                <span>Hide Password</span>
              )}
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <span className="loader"></span> : "Reset Password"}
            </button>
          </form>
        </div>
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
