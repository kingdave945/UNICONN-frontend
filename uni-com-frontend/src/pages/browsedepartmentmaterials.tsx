import { useEffect, useState } from "react";
import { GetLevel, GetDepartment } from "../UserInfo/fullname";
import { getSuggestedMaterialsResult } from "../API";
import Actions from "./actions";
import "./browsedept.css";
export default function BrowseDepartmentMaterials() {
  const level = GetLevel(); // from route
  const [materials, setMaterials] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { items, totalItems } = await getSuggestedMaterialsResult({
          level,
          pageNumber: page,
          pageSize: 10,
        });

        setMaterials(items);
        setTotalItems(totalItems);
      } catch (error) {
        console.error("❌ Failed to fetch materials:", error);
      }
    };

    fetchMaterials();
  }, [level, page]);

  const totalPages = Math.ceil(totalItems / 10);

  return (
    <div className="browsedeptmat">
      <h2>
        Materials for {level} Level {GetDepartment()}{" "}
      </h2>

      <table className="table-study-materials">
        <thead>
          <tr>
            <th>Title</th>
            <th>Uploader</th>
            <th>Date</th>
            <th>Time</th>
            <th>Course Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.uploadedBy}</td>
              <td>{new Date(item.uploadedAt).toLocaleDateString()}</td>
              <td>{new Date(item.uploadedAt).toLocaleTimeString()}</td>
              <td>{item.course}</td>
              <td><Actions/></td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
