// File: client/src/pages/Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Autofill.ai Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/upload" className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600">Upload Form</Link>
        <Link to="/job-forms" className="bg-green-500 text-white p-4 rounded hover:bg-green-600">Job Form Center</Link>
        <Link to="/history" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600">Filled History</Link>
        <Link to="/add-form" className="bg-orange-500 text-white p-4 rounded hover:bg-orange-600">Add New Form</Link>
      </div>
    </div>
  );
};

export default Dashboard;
import LanguageSwitcher from "../components/LanguageSwitcher";

const Dashboard = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <LanguageSwitcher />
      </header>

      {/* Rest of your dashboard */}
    </div>
  );
};
