import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher"; // Import ko sabse upar rakha gaya hai

// Dashboard component ko sirf ek baar define kiya gaya hai
const Dashboard = () => {
  return (
    <div>
      {/* Dono versions ke code ko jod diya gaya hai */}
      <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md mb-6">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
        <LanguageSwitcher />
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Welcome to Autofill.ai</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Select an option to get started.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Links ko behtar styling di gayi hai */}
          <DashboardLink to="/upload" color="blue">
            Upload New Form
          </DashboardLink>
          <DashboardLink to="/job-forms" color="green">
            Job Form Center
          </DashboardLink>
          <DashboardLink to="/history" color="purple">
            View Filled History
          </DashboardLink>
          <DashboardLink to="/add-form" color="orange">
            Add Form (for Business)
          </DashboardLink>
        </div>
      </div>
    </div>
  );
};

// Ek alag component banaya gaya hai taaki code saaf dikhe
const DashboardLink = ({ to, color, children }) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    orange: "bg-orange-500 hover:bg-orange-600",
  };

  return (
    <Link
      to={to}
      className={`text-white p-6 rounded-lg shadow-lg text-center font-semibold text-lg transition-transform transform hover:scale-105 ${colorClasses[color]}`}
    >
      {children}
    </Link>
  );
};

export default Dashboard;
