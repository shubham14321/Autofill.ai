import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [pendingForms, setPendingForms] = useState([]);

  useEffect(() => {
    fetchPendingForms();
  }, []);

  const fetchPendingForms = async () => {
    try {
      const res = await axios.get('/api/forms/pending', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      setPendingForms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    await axios.put(`/api/forms/approve/${id}`, {}, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    fetchPendingForms(); // refresh list
  };

  const handleReject = async (id) => {
    await axios.delete(`/api/forms/${id}`, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    fetchPendingForms(); // refresh list
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔒 Admin Panel - Pending Forms</h1>
      {pendingForms.length === 0 ? (
        <p>No pending forms to review.</p>
      ) : (
        <div className="grid gap-4">
          {pendingForms.map(form => (
            <div key={form._id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-lg font-semibold">{form.title}</h2>
              <p className="text-sm text-gray-600">Uploaded by: {form.uploadedBy || 'Anonymous'}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleApprove(form._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(form._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
