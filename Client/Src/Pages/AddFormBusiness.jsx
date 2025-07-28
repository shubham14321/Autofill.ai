// File: client/src/pages/AddFormBusiness.jsx

import React, { useState } from "react";
import axios from "axios";

const AddFormBusiness = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    formFile: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, formFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("file", formData.formFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://your-backend-url.com/api/business/add-form", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Form template submitted successfully ✅");
      setFormData({ title: "", description: "", formFile: null });
    } catch (err) {
      setMessage("Failed to submit form. Please try again ❌");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Submit a Form Template (Business)</h2>

      {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Form Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Form Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default AddFormBusiness;
