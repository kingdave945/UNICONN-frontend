import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../API/Interceptor";// adjust if your api file is in another folder

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Confirming your email...");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const navigate = useNavigate();

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  useEffect(() => {
    const confirmEmail = async () => {
      if (!userId || !token || hasConfirmed) return;
      setHasConfirmed(true);

      console.log("UserId being sent:", userId);
      console.log("Token being sent:", token);

      try {
        await api.post("/api/Auth/confirm-email", {
          userId,   // ✅ backend expects userId
          token,    // ✅ send raw decoded token
        });

        setMessage("✅ Email confirmed successfully! Redirecting to login...");
        setStatus("success");

        setTimeout(() => navigate("/login"), 2000);
      } catch (error: any) {
        setMessage(
          error.response?.data?.message ||
            "❌ An error occurred while confirming your email."
        );
        setStatus("error");
      }
    };

    confirmEmail();
  }, [userId, token, hasConfirmed, navigate]);

  return (
    <div className="confirm-email">
      <h2>Email Confirmation</h2>
      <p className={status}>{message}</p>
    </div>
  );
}
