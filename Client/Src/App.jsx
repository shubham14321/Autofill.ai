import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadForm from "./pages/UploadForm";
import JobFormCenter from "./pages/JobFormCenter";
import FilledHistory from "./pages/FilledHistory";
import AddFormBusiness from "./pages/AddFormBusiness";

import Navbar from "./components/Navbar";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/job-forms" element={<JobFormCenter />} />
        <Route path="/history" element={<FilledHistory />} />
        <Route path="/add-form" element={<AddFormBusiness />} />
      </Routes>
    </div>
  );
};

export default App;
useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.className = savedTheme;
}, []);

const handleThemeChange = (e) => {
  const theme = e.target.value;
  localStorage.setItem("theme", theme);
  document.documentElement.className = theme;
};
<Route path="/profile-share" element={<ProfileShare />} />
// inside client/src/App.jsx

import JobFormCenter from './pages/JobFormCenter';

<Route path="/job-form-center" element={<JobFormCenter />} />
