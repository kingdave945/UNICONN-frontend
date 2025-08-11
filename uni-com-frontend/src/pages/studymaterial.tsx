import  { useState } from 'react';
import './studymaterial.css'
export default function StudyMaterial() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload New Study Material</h2>
      <p className="upload-subtext">
        Fill out the details below to contribute your study materials to UniConnect.
      </p>

      <form className="upload-form">
        <div className="form-group">
          <label>Title of Material</label>
          <input type="text" placeholder="e.g., Advanced Algorithms Lecture Notes" />
        </div>

        <div className="form-group">
          <label>Upload File (PDF, DOC, PPT)</label>
          <div className="file-upload">
            <span>📁 Drag & drop your file here, or click to browse</span>
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Provide a detailed description of the material, its content, and relevance." />
        </div>

        {/* Department and Course Code */}
        <div className="form-row">
          <div className="form-group">
            <label>Department</label>
            <select>
              <option>Select Department</option>
              <option>Computer Science</option>
              <option>Electrical Engineering</option>
              <option>Business Administration</option>
            </select>
          </div>
          <div className="form-group">
            <label>Course Code</label>
            <input type="text" placeholder="e.g., CSC301, ECE410" />
          </div>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags (comma-separated)</label>
          <input type="text" placeholder="e.g., notes, past questions, lecture, tutorial" />
          <p className="form-note">Separate tags with commas.</p>
        </div>

        {/* Make Public */}
        <div className="form-group toggle-group">
          <label>Make Public?</label>
          <div
            className={`toggle-switch ${isPublic ? 'on' : ''}`}
            onClick={() => setIsPublic(!isPublic)}
          >
            <div className="toggle-thumb"></div>
          </div>
          <span className="form-note">(If public, other users can view and download)</span>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-btn">
            Submit Material
          </button>
        </div>
      </form>
    </div>
  );
}
