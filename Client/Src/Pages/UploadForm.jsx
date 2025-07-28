// File: client/src/pages/UploadForm.jsx

import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [formFile, setFormFile] = useState(null);
  const [fillColor, setFillColor] = useState("#000000");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFormFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFile) {
      setMessage("Please select a PDF form to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", formFile);
    formData.append("fillColor", fillColor);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://your-backend-url.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Form uploaded and filled successfully! ✅");
    } catch (err) {
      setMessage("Upload failed. ❌");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload a Form</h2>

      {message && <p className="text-center mb-3 text-sm text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />

        <div>
          <label className="block mb-1 font-medium">Select Text Fill Color:</label>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
            className="w-12 h-10 p-0 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Upload & Auto-Fill
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
