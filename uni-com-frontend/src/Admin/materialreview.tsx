import { useState, useEffect } from "react"
import MaterialReviewActions from "./materialreviewactions"
import api from "../API/Interceptor"
import './matreview.css'
import MatSkeleton from "../components/matreviewskeleton"
export interface Material {
  id: number;
  title: string;
  level: string;
  course: string;
  uploader: string;
  uploadedAt: string;
  uploadedBy: string;
   filePath: string;
  // add whatever other fields your API returns
}
export default function MaterialReview(){
const [loading, setLoading] = useState(false);
const [materials, setMaterials] = useState<Material[]>([]);
      useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          "/api/Admin/waiting?page=1&pageSize=100"
        );
        setMaterials(response.data.data.items);
      } catch (error) {
        console.error("❌ Failed to fetch Pending matrerials:", error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);
    return(
        <>
        {loading ? 
        (
<MatSkeleton />
        ) :
        (
        <div className="overview-container">
              <div className="review-material">
       
              </div>
              <div className="recent-uploadsII">
              <div className="material-review">              
              <p>Review and moderate new or flagged study materials</p>
              </div>
              <div>
               <div>
                <ul className="container-mat-review">
                {materials.map((item) => (
                <li key={item.id} className="mat-review">
                  <div className="">
                      <span>{item.title}</span>
                      <span>{item.uploader}</span>
                  </div>
                  <MaterialReviewActions
                  item={item}
                    onActionComplete={(id: number) => {
    setMaterials((prev) => prev.filter((mat) => mat.id !== id));
  }}
                  />
                </li>
                ))}
                </ul>
              
              </div>
              </div>
              </div>
        </div>
        )}

        </>
    )
}