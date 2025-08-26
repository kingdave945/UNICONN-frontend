import { resetPassword } from "../../../API";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { GetEmail } from "../../../UserInfo/fullname";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailFromStorage = GetEmail();
    setEmail(emailFromStorage);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword({
        email,
        oldPassword,
        newPassword,
      });
      toast.success("Password reset successfully.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
      console.error("Reset error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
              type="password"
              placeholder="New Password"
              name="newPassword"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="my-input-fields">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="btn-up">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
