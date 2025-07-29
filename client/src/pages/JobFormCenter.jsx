import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobFormCenter = () => {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    const res = await axios.get('/api/forms');
    setForms(res.data);
  };

  const filtered = forms.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Form Center</h1>
      <input
        type="text"
        placeholder="Search job forms..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="grid gap-4">
        {filtered.map(form => (
          <div key={form._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{form.title}</h2>
            <p className="text-sm text-gray-500">{form.country}</p>
            <a
              href={`/edit/${form._id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Fill this form
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFormCenter;
