import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [darkMode,setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-[#071326] relative overflow-hidden transition">
        {/* HEADER */}
        <div className="flex justify-between items-center px-10 py-6">
            <div className="flex items-center gap-3">
                <img src="/logo.png" className="w-9 h-9" alt="logo"/>
                <span className="text-2xl font-semibold text-sky-400">
                TodoPro
                </span>
            </div>

            {/* TOGGLE */}
            <div className="flex items-center space-x-4">
                <button 
                onClick={handleLogout} 
                className="text-white font-semibold hover:bg-opacity-80 transition px-4 py-2 rounded-full"
                >
                Logout
                </button>
                
                <button
                onClick={()=>setDarkMode(!darkMode)}
                className="w-14 h-7bg-gray-300 dark:bg-sky-500 rounded-full flex items-center px-1 transition"
                >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${darkMode ? "translate-x-7" : ""}`}/>
                </button>
            </div>
        </div>
    </div>

  );
}

export default App;