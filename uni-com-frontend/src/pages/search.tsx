import { useEffect, useState } from "react";
import { fetchSearchResults } from "../API";
import type { SearchResultItem, SearchResponse } from "../API";
import { useDebounce } from "../Hook/hooks";
import "./search.css";
import api from "../API/Interceptor";
import Loader from "../components/Loader";
import {toast} from 'react-toastify';

interface SearchProps {
  searchQuery: string;
}

export default function Search({ searchQuery }: SearchProps) {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SearchResultItem | null>(
    null
  );
const[loadingDownload,setLoadingDownload]=useState(false);
const[redirect, setRedirect]=useState(false);
  const debouncedQuery = useDebounce(searchQuery, 500);
  useEffect(() => {
    const runSearch = async () => {
      setLoading(true);
      setError(null);
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      try {
        const data: SearchResponse = await fetchSearchResults({
          query: searchQuery,
          pageNumber: 1,
          pageSize: 10,
        });
        setResults(data.data.results);
      } catch (err) {
        console.error("Search failed:", err);
        setError("Something went wrong while searching. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [debouncedQuery]);
const handleView = async (id: number) => {
  try {
    setRedirect(true);
    const res = await api.get(`/api/StudyMaterials/download/${id}`, {
      responseType: "blob", // important!
    });

    const file = new Blob([res.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, "_blank"); // open in a new tab as PDF
  } catch (err: any) {
    console.error("Failed to view file:", err);
    alert(err.response?.data?.message || "Could not open file");
  }
  finally{  
    setRedirect(false);
  }
};

const handleDownload = async (id: number, filename: string) => {
  try {
    setLoadingDownload(true);
    const res = await api.get(`/api/StudyMaterials/download/${id}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename || "file");
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success("Downloaded Successfully");
  } catch (err) {
    console.error("Failed to download file:", err);
  }
  finally{
    setLoadingDownload(false);
  }
};
  return (
    <>
      <div className="p4">
{!debouncedQuery.trim() ? (

  <h2 className="seachResults">Start typing to search for study materials.</h2>
)
:
(
 <>
        {loading ? (
<Loader/>
        ):
        (
          <>
          
          
      
         <h2 className="searchResults">
          Search Results for: "{debouncedQuery}"
        </h2>
     <ul className="searchUL">
          {results.map((item) => (
            <li key={item.id} className="searchLI">
              <div className="results-icon-search">
                <i
                  className="bi bi-file-earmark-text"
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                    color: "red",
                  }}
                ></i>
                <div>
                  <h3 className="">{item.title}</h3>
                  <p className="">Uploaded by {item.uploadedBy}</p>
                </div>
              </div>
              <div>
                <span onClick={() => setSelectedItem(item)}>
                  See More about {item.title}
                </span>
              </div>
            </li>
          ))}
        </ul>
        </>
        )}
            
     
   
           {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && results.length === 0 && <p>No results found.</p>}
 </>
)}


      </div>
      {selectedItem && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="close-btn" onClick={() => setSelectedItem(null)}>
              &times;
            </button>
            <div className="userintfoadvised">
              <h2>{selectedItem.title}</h2>
              <p>
                <strong>Description:</strong> {selectedItem.description}
              </p>
              <p>
                <strong>Course Code:</strong> {selectedItem.course}
              </p>
              <p>
                <strong>Level:</strong> {selectedItem.level}
              </p>
              <p>
                <strong>Uploaded By:</strong> {selectedItem.uploadedBy}
              </p>
              <p>
                <strong>Uploaded At:</strong>{" "}
                {new Date(selectedItem.uploadedAt).toLocaleDateString()}
              </p>
            </div>
             {/* <div className="actions" style={{ display: "flex", gap: "25px" }}>
      <div style={{ color: "blue" }} title="Download">

      </div>
      <div style={{ color: "blue" }} title="View">
        <i className="bi bi-eye"></i>
      </div>
    </div> */}
    
  <div className="actions" >
  <button
    style={{ color: "blue" }}
    title="View"
    onClick={() => handleView(selectedItem.id)}
  >
 {redirect ? `Opening File...`: 'View'}
  </button>

  <button
    style={{ color: "blue" }}
    title="Download"
    onClick={() => handleDownload(selectedItem.id, selectedItem.title + ".pdf")}
  >
   {loadingDownload ? "Downloading..." : "Download"}
  </button>
</div>

          </div>
        </div>
      )}
    </>
  );
}
