import "./dashboard.css";
import { useState, useEffect } from "react";
import { GetFullName } from "../UserInfo/fullname";
import SuggestedMaterials from "./suggestedmaterials";
import Skeleton from "../components/Skeleton";
// import { getUserStats } from "../API/dashboard"; // 👉 Example future API
import { StudentInfoMaterials, FetchStudyMaterials } from "../API";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Stats state (mock now, real API later)
  const [stats, setStats] = useState(
    {
    totalMaterials: 0,
     
  }
);
  const [departmentMaterials, setDepartmentMaterials] = useState(
    {
      departmentMaterials: 0,
    }
  );

  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 24) return "Good evening";
    return "Hello";
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await StudentInfoMaterials({ pageNumber: 1, pageSize: 10 });
        console.log("📊 Dashboard stats response:", response.data.totalItems);
      setStats({
        totalMaterials: response.data.totalItems 
      });
      } catch (error) {
        console.error("❌ Failed to load dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDepartmentMaterials = async () => {
      try {
        const response = await FetchStudyMaterials();
        console.log("📊 Department materials response:", response);
        const materials = response.data.items;

      setDepartmentMaterials({
        departmentMaterials: materials.length
      });
      }
        catch (error) {
        console.error("❌ Failed to load department materials:", error);
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    };

    fetchDepartmentMaterials();
  }
, []);


  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="dashboard">
          <h2>
            {getGreeting()}, {GetFullName()}
          </h2>
          <h3>Your Stats</h3>
          <section id="Overview-sec1">
            <ul className="dashboard-card-platform">
              <li className="dashboard-cards">
                <h1>{stats.totalMaterials}</h1>
                <p>Total Materials Uploaded</p>
              </li>
              
              <li className="dashboard-cards">
                <h1>{departmentMaterials.departmentMaterials}</h1>
                <p>Department Materials</p>
              </li>
            </ul>

            <h3 style={{ marginTop: "1rem" }}> Suggested Materials</h3>
          </section>

          <div className="container__content">
            <SuggestedMaterials />
           
          </div>

          {/* Top Materials Table */}
     
        </div>
      )}
    </>
  );
}
