import "./dashboard.css";
import Actions from "./actions";
import { useState, useEffect } from "react";
import { GetFullName } from "../UserInfo/fullname";
import SuggestedMaterials from "./suggestedmaterials";
import Skeleton from "../components/Skeleton";
// import { getUserStats } from "../API/dashboard"; // 👉 Example future API

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Stats state (mock now, real API later)
  const [stats, setStats] = useState({
    totalMaterials: 0,
    favourites: 0,
    departmentMaterials: 0,
  });

  const topMaterials = [
    {
      title: "Discrete Mathematics Study Guide",
      uploader: "Alice Johnson",
      date: "2024-03-10",
      tags: ["Study Guide"],
    },
    {
      title: "Thermodynamics Final Exam Prep",
      uploader: "Bob Williams",
      date: "2024-03-08",
      tags: ["Exam Prep"],
    },
    {
      title: "Macroeconomics Current Events Analysis",
      uploader: "Charlie Brown",
      date: "2024-03-05",
      tags: ["Note"],
    },
    {
      title: "Object-Oriented Programming Concepts",
      uploader: "Diana Miller",
      date: "2024-03-02",
      tags: ["Programming"],
    },
    {
      title: "World History: Renaissance Period Overview",
      uploader: "Eve Davis",
      date: "2024-02-28",
      tags: ["Lecture Notes"],
    },
  ];

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
        // 🚧 Replace this with a real API call later
        // const response = await getUserStats();
        // setStats(response.data);

        // Mocking delay
        setTimeout(() => {
          setStats({
            totalMaterials: 12,
            favourites: 5,
            departmentMaterials: 42,
          });
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("❌ Failed to load dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
                <h1>{stats.favourites}</h1>
                <p>Favourites Saved</p>
              </li>
              <li className="dashboard-cards">
                <h1>{stats.departmentMaterials}</h1>
                <p>Department Materials</p>
              </li>
            </ul>

            <h3 style={{ marginTop: "1rem" }}> Suggested Materials</h3>
          </section>

          <div className="container__content">
            <SuggestedMaterials />
           
          </div>

          {/* Top Materials Table */}
          <div className="section">
            <div className="table-header">
              <h3>Top Study Materials</h3>
            </div>
            <table className="table-study-materials">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Uploader</th>
                  <th>Date</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {topMaterials.map((material, i) => (
                  <tr key={i}>
                    <td>{material.title}</td>
                    <td>{material.uploader}</td>
                    <td>{material.date}</td>
                    <td className="tags-table">
                      {material.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td>
                      <Actions />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
