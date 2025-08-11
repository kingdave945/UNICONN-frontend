export default function Materials() {
  const materials = [
    {
      title: 'Algorithms & Data Structures Notes',
      department: 'Computer Science',
      courseCode: 'CSC401',
      date: '2024-03-10',
    },
    {
      title: 'Operating Systems Lecture Slides',
      department: 'Computer Science',
      courseCode: 'CSC403',
      date: '2024-02-28',
    },
    {
      title: 'Database Management Systems Practice Questions',
      department: 'Computer Science',
      courseCode: 'CSC305',
      date: '2024-01-20',
    },
    {
      title: 'Software Engineering Project Guidelines',
      department: 'Computer Science',
      courseCode: 'CSC412',
      date: '2023-11-05',
    },
    {
      title: 'Introduction to AI – Study Guide',
      department: 'Computer Science',
      courseCode: 'CSC408',
      date: '2023-10-15',
    },
  ];
    return (    
<div className="materials-container">
      <h3>My Materials</h3>
      <table className="materials-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Course Code</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.department}</td>
              <td>{item.courseCode}</td>
              <td>{item.date}</td>
              <td>
                <i className="bi bi-pencil-square action-icon"></i>
                <i className="bi bi-trash action-icon danger"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

)}


