import { useEffect, useState } from "react";
import { getSuggestedMaterials } from "../API";
import { GetLevel } from "../UserInfo/fullname";
import './dashboard.css'
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
  useEffect(() => {
const handleGetter = async () => {
  try {
    setLoading(true)
    const materials = await getSuggestedMaterials({
      level,
      pageNumber: 1,
      pageSize: 4,
    });

    setSuggestions(materials); 
    console.log("📘 Suggested materials:", materials);
  } catch (error) {
    console.error("❌ Failed to fetch suggested materials:", error);
  }
  finally{
    setLoading(false)
  }
};


    handleGetter();
  }, [level]);

  return (
    <div className="suggested-materials">
      {loading ?
      (
         <div className="loader-wrapper">
        <span className="Dashboardloader"></span>
      </div>
      )
      :
      (
              <div>
      <p>Dive into curated resources for your field of study.</p>
      <div className="cards-container">
        {suggestions.map((item) => (
          <div key={item.id} className="material-card">
            <div className="icon-container">
              <i
                className="bi bi-file-earmark-text"
                style={{ fontSize: "1.5rem", marginBottom: "10px", color: "red" }}
              ></i>
              <h4>{item.title}</h4>
            </div>
            <p className="author">Uploaded By {item.uploadedBy}</p>
            <a
              href={`/${item.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </div>
        ))}
      </div>
      </div>
      )}

    </div>
  );
}
