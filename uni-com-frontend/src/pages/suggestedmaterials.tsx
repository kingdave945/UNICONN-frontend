import { useEffect, useState } from "react";
import { getSuggestedMaterials } from "../API";
import { GetLevel } from "../UserInfo/fullname";
import "./dashboard.css";
import api from "../API/Interceptor";
interface Material {
  id: number;
  title: string;
  description: string;
  filePath: string;
  uploadedAt: string;
  uploadedBy: string;
  course: string;
  level: string;
}

export default function SuggestedMaterials() {
  const level = GetLevel();
  const [suggestions, setSuggestions] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
    const handleGetter = async () => {
      try {
        setLoading(true);
        setError(null);

        const materials = await getSuggestedMaterials({
          level,
          pageNumber: 1,
          pageSize: 4,
        });

        setSuggestions(materials);
        if (!materials || materials.length === 0) {
          setError("No suggested materials found.");
        }

        console.log("📘 Suggested materials:", materials);
      } catch (err) {
        setError("❌ Unable to fetch suggested materials.");
        console.error("❌ Failed to fetch suggested materials:", err);
      } finally {
        setLoading(false);
      }
    };
   useEffect(() => {
    handleGetter();
  }, [level]);

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
    <div className="suggested-materials" >
      {loading ? (
        <div className="loader-wrapper">
          <span className="Dashboardloader"></span>
        </div>
      ) : error ? (
        <div className="loader-wrapper" style={{display:'flex',
          flexDirection:'column', alignItems:'center'
        }}>
        <p className="error-message">{error}</p>
        <div>
          <button onClick={handleGetter}>
           Try Again
          </button>
        </div>
        </div>
         
      ) : (
        <div>
          <p>Dive into curated resources for your field of study.</p>
          <div className="cards-container">
            {suggestions.map((item) => (
              <div key={item.id} className="material-card">
                <div className="icon-container">
                  <i
                    className="bi bi-file-earmark-text"
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "10px",
                      color: "red",
                    }}
                  ></i>
                  <h4>{item.title}</h4>
                </div>
                <p className="author">Uploaded By {item.uploadedBy}</p>
              <span
  onClick={() => handleView(item.id)}
  style={{ cursor: "pointer", color: "blue" }}
>
  {openingId === item.id ? "Opening File..." : "View"}
</span>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
