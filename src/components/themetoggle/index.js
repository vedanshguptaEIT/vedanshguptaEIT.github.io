import React, { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi"; // Add sun icon

const Themetoggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const themetoggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="nav_ac" onClick={themetoggle}>
      {theme === "dark" ? (
        <WiMoonAltWaningCrescent4 size={28} />
      ) : (
        <WiDaySunny size={28} />
      )}
    </div>
  );
};

export default Themetoggle;
