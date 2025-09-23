// import { GetFullName, GetEmail, GetLevel } from "../../../UserInfo/fullname";
import {
  UpdateProfile,
  UpdateProfileAdmin,
  getStudentProfile,
  getAdminProfile,
} from "../../../API";
import { useState, useEffect } from "react";
import type { StudentProfile } from "../../../API";
export default function ProfileInfo() {
  const [profile, setProfile] = useState<StudentProfile["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const role = sessionStorage.getItem("role"); // or localStorage
        let data;

        if (role === "Admin") {
          data = await getAdminProfile();
        } else if (role === "Student") {
          data = await getStudentProfile();
        } else {
          throw new Error("Unknown role");
        }

        setProfile(data.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState<number | "">("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (profile) {
      setFullName(profile.username);
      setEmail(profile.email);
      setLevel(profile.level);
    }
  }, [profile]);
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (!profile) return;
      const role = sessionStorage.getItem("role"); // or localStorage
      let data;
      if (role === "Admin") {
        data = await UpdateProfileAdmin({
          username: fullName,
          level: level === "" ? 0 : level,
        });
      } else if (role === "Student") {
        data = await UpdateProfile({
          username: fullName,
          level: level === "" ? 0 : level,
        });
      } else {
        throw new Error("Unknown role");
      }

      setProfile(data.data);
      alert("✅ Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("❌ Failed to update profile");
      console.error(err);
    }
    finally{
      setSaving(false);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="user-profile-info-card">
      <div className="cp-card">
        <h2>Update Profile Information</h2>
        <p>Update your accounts's information and email address.</p>
      </div>
      <form>
        <div className="cp-input1">
          <div className="my-input-fields">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className={isEditing ? "editable" : ""}
              placeholder="username"
              name="email"
              value={loading ? "Fetching..." : fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditing}
              required
            />
          </div>
          <div className="my-input-fields">
            <label htmlFor="">Level</label>
            <input
              className={isEditing ? "editable" : ""}
              type="text"
              placeholder="Level"
              name="level"
              value={loading ? "Fetching..." : level}
              onChange={(e) =>
                setLevel(e.target.value === "" ? "" : Number(e.target.value))
              }
              disabled={!isEditing}
              required
            />
          </div>
        </div>
        <div className="cp-input1">
          <div className="my-input-fields2">
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="email"
              name="email"
              value={loading ? "Fetching..." : email}
              disabled
              required
            />
          </div>
        </div>
      </form>
      <div className="btn-actions">
        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        ) : (
          <>
            <button type="submit" onClick={handleUpdate}>
              {!saving ? "Save" : "Saving..."}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
