import { useEffect, useState } from "react";
import {
  getStudentMaterials,
  getAdminMaterials,
  deleteMaterial,
} from "../../API";
import { toast } from "react-toastify";
import api from "../../API/Interceptor";
interface Material {
  id: number;
  title: string;
  course: string;
  level: string;
  approvedByAdmin: boolean;
  uploadedAt: string;
}

export default function Messages() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const role = sessionStorage.getItem("role");
        let data;
        if (role === "Admin") {
          data = await getAdminMaterials();
        } else if (role === "Student") {
          data = await getStudentMaterials();
        } else {
          throw new Error("Unknown role");
        }
        setMaterials(data.data);
      } catch (err: any) {
        console.error("Error fetching materials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const deleteYourMaterial = async (materialId: number) => {
    setRemovingIds((prev) => [...prev, materialId]);
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      await deleteMaterial(materialId);
      toast.success("Removed successfully.");
      setMaterials((prev) => prev.filter((item) => item.id !== materialId));
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to remove from materials."
      );
    } finally {
      setRemovingIds((prev) => prev.filter((id) => id !== materialId));
    }
  };
const [openingId, setOpeningId] = useState<number | null>(null);

const handleView = async (id: number) => {
  try {
    setOpeningId(id);
    const res = await api.get(`/api/StudyMaterials/download/${id}`, {
      responseType: "blob",
    });

    const file = new Blob([res.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  } catch (err: any) {
    console.error("Failed to view file:", err);
    alert(err.response?.data?.message || "Could not open file");
  } finally {
    setOpeningId(null);
  }
};
  return (
    <div className="limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <table className="materials-table">
            <thead>
              <tr>
                <th>Title</th>

                <th>Course Code</th>
                <th>Level</th>
                <th>Status</th>
                <th>Uploaded At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : materials.length > 0 ? (
                materials.map((material) => (
                  <tr
                    key={material.id}
                    className={
                      removingIds.includes(material.id) ? "removing" : ""
                    }
                  >
                    <td>{material.title}</td>
                    <td>{material.course}</td>
                    <td>{material.level}</td>
                    <td>
                      {material.approvedByAdmin ? (
                        <div
                          style={{
                            color: "white",
                            backgroundColor: "green",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "0.3rem",
                            width: "fit-content",
                          }}
                        >
                          Approved
                        </div>
                      ) : (
                        <div
                          style={{
                            color: "white",
                            backgroundColor: "orange",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "0.3rem",
                            width: "fit-content",
                          }}
                        >
                          Pending
                        </div>
                      )}
                    </td>

                    <td>
                      {" "}
                      {new Date(material.uploadedAt).toLocaleDateString()}
                    </td>
                    <td style={{ display: "flex", gap: "1rem" }}>
                      <div style={{ color: "blue" }} title="View" onClick={() => handleView(material.id)}>
                       {openingId === material.id ?  <i className="bi bi-eye"></i> :  <i className="bi bi-eye"></i>}
                      </div>
                      <i
                        className="bi bi-trash action-icon danger"
                        onClick={() => deleteYourMaterial(material.id)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No materials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
