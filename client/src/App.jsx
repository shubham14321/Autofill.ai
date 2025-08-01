import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// --- Saare Pages aur Components ko yahan upar import karein ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadForm from "./pages/UploadForm";
import JobFormCenter from "./pages/JobFormCenter";
import FilledHistory from "./pages/FilledHistory";
import AddFormBusiness from "./pages/AddFormBusiness";
import ProfileShare from "./pages/ProfileShare"; // Yeh missing tha, jod diya gaya hai
import Navbar from "./components/Navbar";

const App = () => {
  // Authentication check
  const isAuthenticated = localStorage.getItem("token");

  // Theme change ke liye logic, ab component ke andar hai
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    // 'document.documentElement' par class lagayein, jo '<html>' tag hai
    document.documentElement.className = savedTheme;
  }, []);

  // Theme change karne wala function
  const handleThemeChange = (e) => {
    const theme = e.target.value;
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  };

  return (
    // 'dark:bg-gray-900' jaisi classes jodi hain taaki dark mode kaam kare
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      
      {/* Navbar ko theme change wala function pass kiya gaya hai */}
      <Navbar handleThemeChange={handleThemeChange} />

      <main className="p-4 sm:p-6">
        <Routes>
          {/* Default Route: Agar user logged in hai to Dashboard, warna Login */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          {/* Baaki saare routes bilkul sahi se yahan hain */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/job-forms" element={<JobFormCenter />} />
          <Route path="/history" element={<FilledHistory />} />
          <Route path="/add-form" element={<AddFormBusiness />} />
          <Route path="/profile-share" element={<ProfileShare />} />

          {/* Galat/extra routes hata diye gaye hain */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
