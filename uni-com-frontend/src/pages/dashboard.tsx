
import './dashboard.css';

export default function Dashboard() {
  const suggested = [
    {
      title: "Advanced Calculus Lecture Notes",
      uploader: "Dr. Emily White",
      tags: ["Calculus", "Math", "Lecture"],
    },
    {
      title: "Introduction to Python for Engineers",
      uploader: "Prof. Alex Kim",
      tags: ["Python", "Programming", "Engineering"],
    },
    {
      title: "Organic Chemistry Lab Manual",
      uploader: "Dr. Sophia Lee",
      tags: ["Chemistry", "Lab", "Organic"],
    },
    {
      title: "Linear Algebra Problem Set Solutions",
      uploader: "TA John Doe",
      tags: ["Linear Algebra", "Math", "Solutions"],
    },
  ];

  const topMaterials = [
    {
      title: "Discrete Mathematics Study Guide",
      uploader: "Alice Johnson",
      date: "2024-03-10",
      tags: ["Math", "Computer Science", "Study Guide"],
    },
    {
      title: "Thermodynamics Final Exam Prep",
      uploader: "Bob Williams",
      date: "2024-03-08",
      tags: ["Physics", "Engineering", "Exam Prep"],
    },
    {
      title: "Macroeconomics Current Events Analysis",
      uploader: "Charlie Brown",
      date: "2024-03-05",
      tags: ["Economics", "Current Affairs"],
    },
    {
      title: "Object-Oriented Programming Concepts",
      uploader: "Diana Miller",
      date: "2024-03-02",
      tags: ["Computer Science", "Programming", "OOP"],
    },
    {
      title: "World History: Renaissance Period Overview",
      uploader: "Eve Davis",
      date: "2024-02-28",
      tags: ["History", "Arts", "Lecture Notes"],
    },
  ];

  return (
    <div className="dashboard">
      <h2>Welcome back, Sarah Chen!</h2>

      {/* Suggested Materials */}
      <div className="section">
        <h3>My Department: Suggested Materials</h3>
        <div className="card-container">
          {suggested.map((item, index) => (
            <div className="material-card" key={index}>
              <div className="thumbnail"></div>
              <div className="info">
                <strong>{item.title}</strong>
                <p className="uploader">Uploaded by {item.uploader}</p>
                <div className="tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-buttons">
                  <button>View Details</button>
                  <button>Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Materials Table */}
      <div className="section">
        <div className="table-header">
          <h3>Top Study Materials</h3>
          <button className="browse-btn">Browse All Materials</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Material Name</th>
              <th>Uploader</th>
              <th>Date Uploaded</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {topMaterials.map((material, i) => (
              <tr key={i}>
                <td>{material.title}</td>
                <td>{material.uploader}</td>
                <td>{material.date}</td>
                <td className='tags'>
                  {material.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Browse by Department */}
      <div className="section">
        <h3>Browse by Department</h3>
        <select>
          <option>Select a Department</option>
          <option>Computer Science</option>
          <option>Engineering</option>
          <option>Mathematics</option>
        </select>
        <p>Select a department to explore relevant study materials.</p>
        <button className="view-all">View All Departments</button>
      </div>
    </div>
  );
}
