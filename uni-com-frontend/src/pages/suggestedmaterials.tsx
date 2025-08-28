export default function SuggestedMaterials() {
  const materials = [
    {
      title: "Introduction to AI Notes",
      author: "Prof. Smith",
      icon: "bi bi-file-earmark-text",
    },
    {
      title: "History of Computer Science Lectures",
      author: "Dr. Anna Lee",
      icon: "bi bi-file-earmark-text",
    },
    {
      title: "Data Structures and Algorithms Summary",
      author: "Jane Doe",
      icon: "bi bi-file-earmark-text",
    },
    {
      title: "Operating Systems - IPC Mechanisms",
      author: "Michael Chen",
      icon: "bi bi-file-earmark-text",
    },
  ];

  return (
    <div className="suggested-materials">
      <h3>My Department - Suggested Materials</h3>
      <p>Dive into curated resources for your field of study.</p>
      <div className="cards-container">
        {materials.map((item, index) => (
          <div key={index} className="material-card">
             <div className="icon-container"> 
            <i
              className={item.icon}
              style={{ fontSize: "1.5rem", marginBottom: "10px", color: "red"}}
            ></i>
               <h4>{item.title}</h4>
            </div>
           
              <p className="author">By {item.author}</p>
              <a href="#">View</a>
           
          </div>
        ))}
      </div>
    </div>
  );
}
