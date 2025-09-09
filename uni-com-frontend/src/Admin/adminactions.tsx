import api from "../API/Interceptor";
import { useState } from "react";
import { toast } from "react-toastify";
interface AdminActionProps {
  user: {
    id: number;
    email: string;
    fullName: string;
  };
}
export default function AdminActions({ user }: AdminActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<"warn" | "suspend" | "ban" | null>(null);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      let endpoint = "";
      let payload: any = { search: user.email };
      switch (actionType) {
        case "warn":
          endpoint = "/api/Admin/users/warn";
          payload.message = message;
          break;
        case "suspend":
          endpoint = "/api/Admin/users/suspend";
          payload.reason = reason;
          payload.days = days;
          break;
        case "ban":
          endpoint = "/api/Admin/users/ban";
          payload.reason = message;
          break;
        default:
          toast.error("Invalid action");
          setLoading(false);
          return;
      }
      const response = await api.post(endpoint, payload);
      toast.success(`${actionType} successful`);
      console.log(`${actionType} response:`, response.data);
      setIsOpen(false);
      setMessage("");
      setReason("");
      setDays("");
    } catch (error) {
      toast.error(`Error trying to ${actionType}`);
      console.error(`Error ${actionType}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="admin-action-features" style={{ fontSize: "14px" }}>
        {/* Warn button */}
        <div
          className="features-admin"
          onClick={() => {
            setActionType("warn");
            setIsOpen(true);
          }}
          title="warn"
        >
          <i className="bi bi-exclamation-triangle"></i>
        </div>

        {/* Suspend button */}
        <div
          className="features-admin"
          onClick={() => {
            setActionType("suspend");
            setIsOpen(true);
          }}
          title="suspend"
        >
          <i className="bi bi-stop-fill"></i>
        </div>

        {/* Ban button */}
        <div
          className="features-admin"
          onClick={() => {
            setActionType("ban");
            setIsOpen(true);
          }}
          title="ban"
        >
          <i className="bi bi-ban"></i>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                &times;
              </button>

              {actionType === "warn" && (
                <div className="action-input">
                  <h3>Warn {user.fullName.toUpperCase()}</h3>
                  <input
                    type="text"
                    placeholder="Enter warning message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              )}

              {actionType === "suspend" && (
                <div className="action-input">
                  <h3>Suspend {user.email}</h3>
                  <input
                    type="text"
                    placeholder="Enter reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Enter duration (days)"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                </div>
              )}

              {actionType === "ban" && (
                <div className="action-input">
                  <h3>Ban {user.email}</h3>
                  <input
                    type="text"
                    placeholder="Enter ban message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              )}

              <button
                className="login-btn"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span className="loginloader"></span>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
