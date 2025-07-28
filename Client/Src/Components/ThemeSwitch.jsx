// File: client/src/components/ThemeSwitch.jsx

import React, { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("light"); // default: light

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark", "dotted");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700">Theme:</label>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="p-1 rounded border text-sm"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="dotted">Dotted</option>
      </select>
    </div>
  );
};

export default ThemeSwitch;
// tailwind.config.js

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dotted: "radial-gradient(#999 1px, transparent 1px)", // <-- custom dotted theme
      },
    },
  },
  plugins: [],
};
