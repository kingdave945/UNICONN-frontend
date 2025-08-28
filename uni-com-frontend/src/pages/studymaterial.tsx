import { useState } from "react";
import "./studymaterial.css";
import { toast } from "react-toastify";
import { uploadMaterials } from "../API";

export default function StudyMaterial() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !course || !description || !file || !level || tags.length === 0) {
      toast.error("Please fill in all fields and upload a file.");
      setLoading(false);
      return;
    }

    const uploadData = { title, course, description, file, level, Tags: tags };

    try {
      await uploadMaterials(uploadData);
      toast.success("Upload successful ✅");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload New Study Material</h2>
      <p className="upload-subtext">
        Fill out the details below to contribute your study materials.
      </p>

      <form className="upload-form" onSubmit={handleSubmit}>
       
        <div className="form-group">
          <label>Title of Material</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Advanced Algorithms Notes"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload File (PDF, DOC, PPT)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description"
            required
          />
        </div>
 
 <section className="section-level-upload">
 <div className="form-group">
          <label>Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="">Select Level</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
          </select>
        </div>

        {/* Course */}
        <div className="form-group">
          <label>Course Code</label>
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g., CSC301"
            required
          />
        </div>
 </section>
        {/* Level */}
       

        {/* Tags */}
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
            placeholder="e.g., notes, past questions"
            required
          />
          <p className="form-note">Separate tags with commas.</p>
        </div>

        
     
        {/* Submit */}
        <div >
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Uploading..." : "Submit Material"}
          </button>
        </div>
      </form>
    </div>
  );
}
