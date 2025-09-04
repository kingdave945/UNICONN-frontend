import { useEffect, useState } from "react";
import api from "../../API/Interceptor";
import {toast} from 'react-toastify'
import { deleteMaterial, downloadMaterial } from "../../API";

  interface Material {
    id: number;
    title: string;
    description: string;
    course: string;
    level: string;
    tags: string[];
  }

export default function Messages() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/StudyMaterials?pageNumber=${page}&pageSize=10`);
      setMaterials(
        response.data.data.items.map((material: any) => ({
          id: material.id,
          title: material.title,
          description: material.description,
          course: material.course,
          level: material.level,
          tags: material.tags,
        }))
      );
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMaterials();
}, [page]);
const deleteYourMaterial = async (materialId: number) => {
  try {
    await deleteMaterial(materialId);
    toast.success("Removed successfully.");
    setMaterials((prev) => prev.filter((item) => item.id !== materialId));
    
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to remove from materials.");
    console.error("Delete error:", error);
  }
};
const downloadYourMaterial = async (materialId: number) => {
  try {
    await downloadMaterial(materialId);
    toast.success("Download in progress...");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to download material.");
    console.error("Download error:", error);
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
            <th>Description</th>
            <th>Course Code</th>
            <th>Level</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : materials.length > 0
               ? 
               (
                materials.map((material, idx) => (
                  <tr key={material.id || idx}>
                    <td>
                      {material.title || "Unknown User"}
                    </td>
                    <td>
                      {material.description}
                    </td>
                    <td>
                      {material.course}
                    </td>
                    <td>
                      {material.level}
                    </td>
                    <td>
                      {material.tags.join(", ")}
                    </td>
                <td>
                <i className="bi bi-download action-icon" 
                onClick={() => downloadYourMaterial(material.id)}></i>
                <i className="bi bi-trash action-icon danger" 
                onClick={() => deleteYourMaterial(material.id)}></i>
              </td>
              </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" , marginLeft:'510px' }}>
                    No messages found.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
          {/* Pagination */}
          <div
            className="Page"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 16,
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              style={{ marginRight: 8 }}
            >
              Previous
            </button>
            <span style={{ alignSelf: "center" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              style={{ marginLeft: 8 }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
