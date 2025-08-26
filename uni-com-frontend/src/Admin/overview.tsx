import "./admin.css";
import api from "../API/Interceptor";
import { useEffect, useState } from "react";
import UserMan from "./usermanagement";
interface UserStats {
  totalUsers: number;
  activeUsers: number;
  disabledUsers: number;
}

export default function Overview() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    disabledUsers: 0,
  });
  const [materialStats, setMaterialStats] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/Admin/stats/users");
        const users = response.data.data || []; 
        setUserStats({
          totalUsers: users.totalUsers,
          activeUsers: users.activeUsers,
          disabledUsers: users.disabledUsers,
        });
      } catch (error) {
        console.error("❌ Failed to fetch users:", error);
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
        // const materials = response.data.data || [];
        setMaterialStats(response.data.data.totalCount); // ✅ store count, not array
      } catch (error) {
        console.error("❌ Failed to fetch materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div className="overview-container">
      <div className="admin-dashboard-title">
        <h2>User Management</h2>
        <br />
      </div>
      <section id="Overview-sec1">
        <ul className="card-platform">
          <li className="cards">
            <h1>{userStats.totalUsers}</h1>
            <p>Total Users</p>
          </li>
          <li className="cards">
            <h1>{userStats.activeUsers}</h1>
            <p>Active Users</p>
          </li>
          <li className="cards">
            <h1>{userStats.disabledUsers}</h1>
            <p>Disabled Users</p>
          </li>
          <li className="cards">
            <h1>{materialStats}</h1>
            <p>Total Materials</p>
          </li>
        </ul>
      </section>
      <section id="Overview-sec2">
        <UserMan 
        userStats={userStats}
        />
      </section>
    </div>
  );
}
