import { useEffect, useRef, useState } from "react";
import api from "../../API/Interceptor";
import { toast } from "react-toastify";
interface AvatarProps {
  width?: number;              // size in px (default 80)
  height?: number;            // height in px (default 80)
  editable?: boolean;         // whether to allow uploads
  className?: string;         // custom styles
}

export default function Avatar({ width =80, height = 80, editable = false, className = "" }: AvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // fetch avatar on mount
const fetchAvatar = async () => {
  try {
    const res = await api.get("/api/ProfilePicture/view");
    setAvatarUrl("https://yimikadavid-001-site1.mtempurl.com" + res.data.profilePictureUrl);
  } catch (err) {
    console.error("Failed to fetch avatar", err);
  }
};


  useEffect(() => {
    fetchAvatar();
  }, []);

  // handle upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file)); // preview instantly

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/api/ProfilePicture/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  toast.success("Profile picture updated ✅");
      await fetchAvatar();  // refresh avatar
      setAvatarPreview(null);
    } catch (err: any) {
   
    const message =
      err.response?.data?.message || err.response?.data || "Upload failed";
    console.error("Upload failed:", message);
    toast.error(message);
  }
  };

  return (
 <div
      className={`avatar-circle ${className}`}
      style={{ width, height }}
    >
      {avatarPreview ? (
        <img
          src={avatarPreview}
          alt="avatar preview"
          className="avatar-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : avatarUrl ? (
        <img
          src={avatarUrl}
          alt="avatar"
          className="avatar-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <i
          className="bi bi-person-fill"
          style={{ fontSize: Math.min(width, height) * 0.6 }}
        ></i>
      )}

      {editable && (
        <>
          <div
            className="avatar-camera"
            onClick={() => fileInputRef.current?.click()}
          >
            <i className="bi bi-camera"></i>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );

}
