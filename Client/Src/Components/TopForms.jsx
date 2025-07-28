// File: client/src/components/TopForms.jsx

import React from "react";

const forms = [
  { title: "Railway Group D Form", country: "India" },
  { title: "Passport Application", country: "India" },
  { title: "SBI Bank Account Opening", country: "India" },
  { title: "Driving License Form", country: "India" },
  { title: "SSC Exam Registration", country: "India" },
  { title: "Scholarship Form", country: "India" },
];

const TopForms = () => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Top Forms in Your Country 🇮🇳</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map((form, idx) => (
          <div key={idx} className="bg-white shadow-md p-4 rounded border hover:shadow-lg transition">
            <h4 className="font-medium text-lg">{form.title}</h4>
            <p className="text-sm text-gray-500">{form.country}</p>
            <button className="mt-2 text-sm text-blue-600 underline hover:text-blue-800">
              Auto-Fill Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopForms;
