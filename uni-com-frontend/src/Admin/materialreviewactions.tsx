import type { Material } from "./materialreview";
import { Approve, Reject } from "../API";
import { toast } from "react-toastify";
import { useState } from "react";
interface Actions {
  item: Material;
  onActionComplete: (id: number) => void; 
}

export default function MaterialReviewActions({ item, onActionComplete }: Actions) {
  const [reason, setReason] = useState("");
  const [reject, setReject] = useState<Material | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setLoading(true);
      await Approve({ id: item.id });
      toast.success("Material approved ✅");

      // ✅ tell parent to remove this item
      onActionComplete(item.id);

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
        id: reject.id,
        reason: reason,
        deleteFile: true
      });
      toast.success("Material rejected ✅");

      // ✅ remove rejected item from parent list
      onActionComplete(reject.id);

      setReject(null); // close modal
      setReason("");   // clear input
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
                onClick={() => setReject(item)}
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
