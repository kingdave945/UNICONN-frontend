import type { Material } from "./materialreview";
import { Approve, Reject } from "../API";
import { toast } from "react-toastify";
import { useState } from "react";

interface Actions {
  item: Material;
}

export default function MaterialReviewActions({ item }: Actions) {
  const [reason, setReason] = useState("");
  const [reject, setReject] = useState<Material | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setLoading(true);
      await Approve({ id: item.id });
      toast.success("Material approved ✅");
    } catch (err) {
      toast.error("Failed to approve ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!reject) return; // safety check

    try {
      setLoading(true);
      await Reject({
        id: reject.id,          // ✅ use the reject state, not props
        reason: reason,
        deleteFile: true
      });
      toast.success("Material rejected ✅");
      setReject(null); // close modal after success
      setReason("");   // clear reason field
    } catch (err) {
      toast.error("Failed to reject ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mat-action-features" style={{ cursor: "pointer" }}>
        <div>
          {loading ? (
            <span className="AdminMaterialloader"></span>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }} title="Approve">
              <div className="approve-btn" onClick={handleApprove}>
                <i className="bi bi-check2"></i>
              </div>
              <div
                onClick={() => setReject(item)} // ✅ set full item
                className="reject-btn"
                title="Reject"
              >
                <i className="bi bi-x"></i>
              </div>
            </div>
          )}
        </div>
      </div>

      {reject && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="close-btn" onClick={() => setReject(null)}>
              &times;
            </button>

            <input
              type="text"
              placeholder="Enter reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button
              className="login-btn"
              disabled={loading}
              onClick={handleReject}
            >
              {loading ? <span className="loginloader"></span> : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
