import React, { useEffect, useState } from "react";
import axios from "axios";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");

  // Load current user language on mount
  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const res = await axios.get("/api/user/lang");
        setLanguage(res.data.language);
      } catch (err) {
        console.error("Failed to fetch language", err);
      }
    };
    fetchLanguage();
  }, []);

  // Update language on backend + local
  const handleChange = async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    try {
      await axios.patch("/api/profile/update", { language: newLang });
    } catch (err) {
      console.error("Language update failed", err);
    }
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      className="p-2 border rounded"
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
};

export default LanguageSwitcher;
