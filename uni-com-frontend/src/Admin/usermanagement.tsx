import AdminActions from "./adminactions";
export default function UserMan() {
  const Users = [
    {
      username: "Grace",
      useremail: "grace@gmail.com",
    },
  ];
  return (
    <>
      <div className="admin-dashboard">
        <section id="Overview-sec2">
          <h3>User Management</h3>
          <div className="recent-uploads">
            <div className="Uploads-recent">
              <h4>User Management</h4>
              <p>Search and manage platform users.</p>
            </div>
            <div className="user-man-holder-cont">
            <div className="user-man-input">
              <input
               type="text"
               placeholder="Search by name or email" />
            </div>
            <div className="user-man-container">
              <div className="user-man">
                {Users.map((item, index) => (
                  <ul key={index}>
                    <li className="user-man">
                      <span> {item.username}</span>
                      <span>{item.useremail}</span>
                    </li>
                  </ul>
                ))}
              </div>
              <div>
                <AdminActions />
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
