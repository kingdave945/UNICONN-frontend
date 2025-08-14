import React, { useEffect, useState } from "react";
import NavBar from "../Layout/navbar";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { resendconfirmemail } from '../API/index';
import api from '../API/Interceptor'
const statusIcons: Record<string, React.ReactElement> = {
  loading: <span style={{ fontSize: 40 }}>⏳</span>,
  success: <span style={{ fontSize: 40, color: "#4BB543" }}>✔️</span>,
  error: <span style={{ fontSize: 40, color: "#D8000C" }}>❌</span>,
};

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Confirming your email...");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [timer, setTimer] = useState(0);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const email =
    searchParams.get("email") || sessionStorage.getItem("email") || "";
  const token = searchParams.get("token");
const navigate = useNavigate();
  const confirmEmail = async () => {
    if (!email || !token || hasConfirmed) return;
    setHasConfirmed(true);

   const fixedToken = encodeURIComponent(token.replace(/ /g, "+"));

  console.log("Fixed token:", fixedToken);

  try {
    await api.post(
      "/api/Auth/confirm-email",
      {
        email,
        token: fixedToken,
      }
    );
      setMessage("Email confirmed successfully! You can now log in.");
      setStatus("success");
      navigate("/login");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "An error occurred while confirming."
      );
      setStatus("error");
    }
  };

  // Call confirmEmail directly in render if email and token are present and not yet confirmed

useEffect(() => {
  if (email && token && !hasConfirmed) {
    confirmEmail();
  }
}, [email, token, hasConfirmed]);

  const handleClick = () => {
    resendconfirmemail(email);
    setTimer(30); // 30 seconds cooldown
  };

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <>
      <NavBar
        theme="light" // or your current theme value
        toggleTheme={() => {}} // provide your toggleTheme function
        setIsPublic={() => {}} // provide your setIsPublic function
        isPublic={false} // or your current isPublic value
      />
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        margin: "40px auto",
        maxWidth: 400,
        padding: 32,
      }}
    >
      {email && !token ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <p style={{ marginBottom: 12, fontSize: 16 }}>
            Send email to <span style={{ fontWeight: 600 }}>{email}</span>
          </p>
          <button
            onClick={handleClick}
            disabled={timer > 0}
            style={{
              padding: "10px 24px",
              background: timer > 0 ? "#ccc" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: timer > 0 ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              marginBottom: 8,
            }}
          >
            {timer > 0 ? `Resend Email (${timer}s)` : "Resend Email"}
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>{statusIcons[status]}</div>
          <h2
            style={{
              textAlign: "center",
              color:
                status === "success"
                  ? "#4BB543"
                  : status === "error"
                  ? "#D8000C"
                  : "#333",
            }}
          >
            {message}
          </h2>
        </>
      )}
    </div>
   </>
  )
};

export default ConfirmEmail;
