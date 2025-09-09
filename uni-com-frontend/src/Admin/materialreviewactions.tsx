import type { Material } from "./materialreview";
import { Approve, Reject } from "../API";
import { toast } from "react-toastify";
import { useState } from "react";
interface Actions {
  item: Material;
}
export default function MaterialReviewActions({ item }: Actions) {
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
    try {
      setLoading(true);
      await Reject({ id: item.id });
      toast.success("Material rejected ✅");
    } catch (err) {
      toast.error("Failed to reject ❌");
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div
        className="mat-action-features"
        style={{
          cursor: "pointer",
        }}
      >
        <div>
          {loading ? (
            <span className="AdminMaterialloader"></span>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }} title="Approve">
              <div className="approve-btn" onClick={handleApprove}>
                <i className="bi bi-check2"></i>
            
              </div>
              <div onClick={handleReject} className="reject-btn" title="Reject" >
                <i className="bi bi-x"></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
