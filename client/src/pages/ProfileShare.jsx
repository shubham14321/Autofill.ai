// File: client/src/pages/ProfileShare.jsx

import React, { useState } from "react";
import axios from "axios";

const ProfileShare = () => {
  const [mode, setMode] = useState("view");
  const [code, setCode] = useState("");
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://your-backend-url.com/api/profile/${code}`);
      setProfile(res.data);
      setMessage("");
    } catch (err) {
      setMessage("Invalid profile code ❌");
      setProfile(null);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const res = await axios.post(`https://your-backend-url.com/api/profile/save`, userData);
      setMessage(`Profile saved successfully ✅. Your code: ${res.data.code}`);
      setUserData({ fullName: "", email: "", phone: "", address: "" });
    } catch (err) {
      setMessage("Failed to save profile ❌");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile Share via Code</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("view")}
          className={`px-4 py-2 rounded ${mode === "view" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          View by Code
        </button>
        <button
          onClick={() => setMode("update")}
          className={`px-4 py-2 rounded ${mode === "update" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Save / Share Profile
        </button>
      </div>

      {mode === "view" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter profile code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={fetchProfile}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Load Profile
          </button>

          {message && <p className="text-center text-red-500">{message}</p>}
          {profile && (
            <div className="mt-4 p-4 border rounded bg-white shadow">
              <p><strong>Name:</strong> {profile.fullName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
            </div>
          )}
        </div>
      )}

      {mode === "update" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Address"
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSaveProfile}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save & Get Share Code
          </button>
          {message && <p className="text-center text-blue-600">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ProfileShare;
