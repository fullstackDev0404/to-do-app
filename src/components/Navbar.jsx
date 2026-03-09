import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // Icons for light/dark mode
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleTheme, isDarkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className={`w-full p-4 flex justify-between items-center ${isDarkMode ? "bg-dark-background" : "bg-light-background"} transition-all`}>
      <div className="flex items-center space-x-4">
        <h1 className="text-xl text-white">TodoPro</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={handleLogout} 
          className="text-white font-semibold hover:bg-opacity-80 transition px-4 py-2 rounded-full"
        >
          Logout
        </button>

        {/* Toggle Dark/Light Mode Button */}
        <button onClick={toggleTheme} className="text-white hover:bg-opacity-80 transition p-2 rounded-full">
          {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </nav>
  );
}