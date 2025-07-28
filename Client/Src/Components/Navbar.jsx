// File: client/src/components/Navbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-semibold"><Link to="/">Autofill.ai</Link></div>
      {token ? (
        <div className="flex space-x-4 items-center">
          <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
          <Link to="/upload" className="hover:text-gray-200">Upload</Link>
          <Link to="/job-forms" className="hover:text-gray-200">Job Forms</Link>
          <Link to="/history" className="hover:text-gray-200">History</Link>
          <Link to="/add-form" className="hover:text-gray-200">Add Form</Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="hover:text-gray-200 mr-4">Login</Link>
          <Link to="/register" className="hover:text-gray-200">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
