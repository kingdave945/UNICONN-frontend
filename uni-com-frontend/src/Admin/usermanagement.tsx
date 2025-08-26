import AdminActions from "./adminactions";
import { useState } from "react";
import api from "../API/Interceptor";
import Status from "./status";
export default function UserMan() {
  const defaultUsers = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      joinedDate: "2025-01-01",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      joinedDate: "2025-02-15",
    },
    {
      id: 3,
      fullName: "Bob Johnson",
      email: "bob@example.com",
      joinedDate: "2025-03-20",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const response = await api.get(`/api/Admin/users/search?query=${value}`);
      const usersArray = response.data.data || [];
      console.log("LET US SEE DATA", usersArray);
      setSuggestions(usersArray);
    } catch (err) {
      console.error("Error fetching data:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <section id="Overview-sec2">
        <div className="user-man-holder-cont"></div>
      </section>
      <section id="Overview-sec2">
        <div className="recent-uploads">
          <div className="user-man-input">
            <i className="bi bi-search"></i>
            <input
              type="text"
              value={query}
              onChange={handleInput}
              style={{ padding: "10px" }}
              placeholder="Search user by name or email"
            />
          </div>
          <table>
            <thead style={{ backgroundColor: "#fff" }}>
              <tr>
                <th>User info</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "center", color: "gray" }}
                  >
                    Loading...
                  </td>
                </tr>
              ) : suggestions.length > 0 ? (
                suggestions.map((item, index) => (
                  <tr key={index}>
                    <td className="td-userman1">
                      <span>
                        {item.fullName || `${item.firstName} ${item.lastName}`}
                      </span>
                      <span>{item.email}</span>
                    </td>
                    <td>
                      <Status />
                    </td>
                    <td>
                      <span>{item.joinedDate}</span>
                    </td>
                    <td>
                      <AdminActions user={item} />
                    </td>
                  </tr>
                ))
              ) : suggestions.length === 0 ? (
                defaultUsers.map((item, index) => (
                  <tr key={index}>
                    <td className="td-userman1">
                      <span>{item.fullName}</span>
                      <span>{item.email}</span>
                    </td>
                    <td>
                      <Status />
                    </td>
                    <td>
                      <span>{item.joinedDate}</span>
                    </td>
                    <td>
                      <AdminActions user={item} />
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
