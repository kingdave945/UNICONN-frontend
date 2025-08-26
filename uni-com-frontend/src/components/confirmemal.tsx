import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/Interceptor";

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

  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const confirmEmail = async () => {
    if (!userId || !token || hasConfirmed) return;
    setHasConfirmed(true);

    const fixedToken = encodeURIComponent(token.replace(/ /g, "+"));

    try {
      await api.get(`/api/Auth/confirm-email`, {
        params: {
          userId,
          token: fixedToken,
        },
      });

      setMessage("Email confirmed successfully! You can now log in.");
      setStatus("success");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "An error occurred while confirming."
      );
      setStatus("error");
    }
  };

  // 👇 call confirmEmail when userId+token exist
  useEffect(() => {
    if (userId && token && !hasConfirmed) {
      confirmEmail();
    }
  }, [userId, token, hasConfirmed]);

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
    </div>
  );
};

export default ConfirmEmail;
