import React from "react";
import { useTheme } from "../utils/ThemeContext";

const SwitchButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center space-x-6 px-5">
      <span>{theme === 'dark' ? "Dark Mode" : "Light Mode"}</span>
      <button
        className={`relative rounded-full w-12 h-6 transition-colors duration-200 ease-in-out ${
          theme === 'dark' ? "bg-dark-3" : "bg-light-40"
        }`}
        onClick={toggleTheme}
      >
        <span
          className={`absolute inset-0 w-6 h-6 transform transition-transform duration-200 ease-in-out ${
            theme === 'dark' ? "translate-x-7 bg-purple" : "-translate-x-1 bg-white"
          } rounded-full shadow-md`}
        />
      </button>
    </div>
  );
};

export default SwitchButton;
