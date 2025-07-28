import React, { useState, useEffect } from 'react';
import axios from 'axios';

const dummyJobForms = [
  {
    id: 1,
    title: "Railway Group D Form",
    description: "Apply for Railway Group D Recruitment 2025",
    officialUrl: "https://rrb.gov.in/group-d-form",
  },
  {
    id: 2,
    title: "SSC CHSL Application",
    description: "Fill SSC CHSL 2025 form online",
    officialUrl: "https://ssc.nic.in",
  },
  {
    id: 3,
    title: "UP Police Constable",
    description: "Apply for UP Police Constable Bharti 2025",
    officialUrl: "https://uppbpb.gov.in",
  },
];

const JobFormCenter = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(dummyJobForms);

  const handleSearch = () => {
    const filtered = dummyJobForms.filter((form) =>
      form.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📂 Job Form Center</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search job forms (e.g. railway, ssc)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
      <div className="grid gap-4">
        {results.map((form) => (
          <div key={form.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{form.title}</h2>
            <p className="text-sm text-gray-600">{form.description}</p>
            <a
              href={form.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 inline-block"
            >
              Apply on Official Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFormCenter;
