import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  useEffect(() => {
    fetchForm();
  }, []);

  const fetchForm = async () => {
    try {
      const res = await axios.get(`/api/forms/${formId}`);
      setFormData(res.data);
      setEditedFields(res.data.fields || {});
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (key, value) => {
    setEditedFields(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = async () => {
    try {
      const res = await axios.post(
        `/api/forms/fill/${formId}`,
        { fields: editedFields },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.title || 'form'}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
      alert('Failed to generate filled form');
    }
  };

  if (!formData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{formData.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{formData.description}</p>

      <div className="grid gap-4">
        {Object.entries(editedFields).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium">{key}</label>
            <input
              className="border p-2 w-full"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleDownload}
      >
        Download Filled PDF
      </button>
    </div>
  );
};

export default EditForm;
