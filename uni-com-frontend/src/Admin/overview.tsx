import './admin.css';
import api from '../API/Interceptor';
import { useEffect, useState } from 'react';
import UserMan from './usermanagement';
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

 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/Admin/users?page=1&pageSize=100"); // adjust pageSize if needed
        const users = response.data.users;

        setUserStats({
          totalUsers: response.data.totalCount,
          activeUsers: users.filter((u: any) => u.isActive).length,
          disabledUsers: users.filter((u: any) => !u.isActive).length,
        });
      } catch (error) {
        console.error("❌ Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='overview-container'>
      <div className='admin-dashboard-title'>
        <h2>User Management</h2>
        <br />
      </div>

      {/* ===== CARDS SECTION ===== */}
      <section id='Overview-sec1'>
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
          
        </ul>
      </section>

      {/* ===== RECENT UPLOADS SECTION ===== */}
      <section id='Overview-sec2'>
       
        <UserMan />
      </section>
    </div>
  );
}
