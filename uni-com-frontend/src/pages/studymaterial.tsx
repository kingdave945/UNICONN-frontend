import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./studymaterial.css";
import { toast } from "react-toastify";
import { uploadMaterials } from "../API";

export default function StudyMaterial() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [level, setLevel] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Dropzone handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    if (!selectedFile) return;

  if (selectedFile.type === "application/pdf") {
      // PDFs → blob URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      // Other formats → no preview, just filename
      setPreviewUrl(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-powerpoint": [".ppt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/*": []
    }
  });

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 

    if (!title || !course || !description || !file || !level || tags.length === 0) {
      toast.error("Please fill in all fields and upload a file.");
      setLoading(false);
      return;
    }

    const uploadData = { title, course, description, file, level, Tags: tags };

    try {
      setLoading(true);
      await uploadMaterials(uploadData);
      setTitle("");
      setCourse("");
      setDescription("");
      setFile(null);
      setPreviewUrl(null);
      setLevel("");
      setTags(['']);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* Title */}
        <div className="form-group">
          <label>Title of Material</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Advanced Algorithms Notes"
            required
            disabled={loading}
          />
        </div>

        {/* Drag-and-drop uploader */}
        <div className="section-level-upload"   {...getRootProps()}>        
        <div className="form-group">
          <label>Upload File (PDF, DOC, PPT)</label>
          <div
          
            className="dropzone"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here…</p>
            ) : (
              <p>Drag & drop a file here, or click to select one</p>
            )}
          </div>

          {/* File Preview */}
          {file && (
            <div className="file-preview">
              <p><strong>Selected File:</strong> {file.name}</p>
               
              {/* Image */}
              {file.type.startsWith("image/") && previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="file-image-preview"
                />
              )}

              {/* PDF */}
              {file.type === "application/pdf" && previewUrl && (
                <embed
                  src={previewUrl}
                  width="100%"
                  height="400px"
                  type="application/pdf"
                />
              )}

              {/* Other files */}
              {!previewUrl && (
                <p className="preview-note">Preview not available for this file type.</p>
              )}
            </div>
          )}
        </div>
         </div>
        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description"
            required
            disabled={loading}
          />
        </div>

        {/* Level + Course */}
        <section >
          <div className="form-group-select">
            <label>Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Select Level</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>

          <div className="form-group">
            <label>Course Code</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g., CSC301"
              required
              disabled={loading}
            />
          </div>
        </section>

        {/* Tags */}
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
            placeholder="e.g., notes, past questions"
            required
            disabled={loading}
          />
          <p className="form-note">Separate tags with commas.</p>
        </div>

        {/* Submit */}
        <div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Uploading..." : "Submit Material"}
          </button>
        </div>
      </form>
    </div>
  );
}
