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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        email,
        token,
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
          <form onSubmit={handleSubmit}>
            <div className="login-input">
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                required
              />
            </div>
            <div className="login-input">
              <input
                type="password"
                placeholder="Enter your new password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <span className="loader"></span> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
