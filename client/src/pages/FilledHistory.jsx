// File: client/src/pages/FilledHistory.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const FilledHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://your-backend-url.com/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data || []);
      } catch (err) {
        console.error("Error loading history:", err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Filled Form History</h2>

      {history.length === 0 ? (
        <p className="text-center text-gray-600">No forms filled yet.</p>
      ) : (
        <div className="grid gap-4">
          {history.map((form, index) => (
            <div
              key={index}
              className="border rounded p-4 shadow hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-semibold">{form.formName}</h3>
              <p className="text-sm text-gray-500">Date: {form.date}</p>
              <a
                href={form.downloadLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                Download Filled PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilledHistory;
