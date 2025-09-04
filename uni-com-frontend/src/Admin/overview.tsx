import "./admin.css";
import api from "../API/Interceptor";
import { useEffect, useState } from "react";
import UserMan from "./usermanagement";
import AgentSkeleton from "../components/AgentSkeleton";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  disabledUsers: number;
}

export default function Overview() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [materialStats, setMaterialStats] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/Admin/stats/users");
        const users = response.data.data || {}; 
        setUserStats({
          totalUsers: users.totalUsers,
          activeUsers: users.activeUsers,
          disabledUsers: users.disabledUsers,
        });
      } catch (error) {
        console.error("❌ Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.get(
          "/api/Admin/materials?page=1&pageSize=100"
        );
        setMaterialStats(response.data.data.totalCount);
      } catch (error) {
        console.error("❌ Failed to fetch materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  return (
    <>
{loading ? (
  <AgentSkeleton />
) : (
  <div className="overview-container">
    <div className="admin-dashboard-title">
      <h2>User Management</h2>
      <br />
    </div>
    <section id="Overview-sec1">
      <ul className="card-platform">
        <li className="cards">
          <h1></h1>
          <h1>
            {userStats ? userStats.totalUsers : 0}
          </h1>
          <p>Total Users</p>
        </li>
        <li className="cards">
          <h1>
            {userStats ? userStats.activeUsers : 0}
          </h1>
          <p>Active Users</p>
        </li>
        <li className="cards">
          <h1>
            {userStats ? userStats.disabledUsers : 0}
          </h1>
          <p>Disabled Users</p>
        </li>
        <li className="cards">
          <h1>
            {materialStats === null ? 0 : materialStats}
          </h1>
          <p>Total Materials</p>
        </li>
      </ul>
    </section>
    <section id="Overview-sec2">
      {userStats && <UserMan userStats={userStats} />}
    </section>
  </div>
)}
</>

  );
}
