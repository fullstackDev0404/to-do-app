import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';  // Import the ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import the styles for toast notifications

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-[#071326] relative overflow-hidden transition">
        {/* HEADER */}
        <div className="flex justify-between items-center px-10 py-6" style={{ boxShadow: `${darkMode ? '6px 1px 11px 4px #2b2f37 ' : '6px 1px 11px 4px #b3b3b3'}` }}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-9 h-9" alt="logo" />
            <span className="text-2xl font-semibold text-sky-400">TodoPro</span>
          </div>

          {/* TOGGLE */}
          <div className="flex items-center space-x-4">
            {
              localStorage.token &&
                <button
                  onClick={handleLogout}
                  className={`${darkMode ? 'font-semibold hover:bg-opacity-80 transition px-4 py-2 rounded-full text-white' : 'font-semibold hover:bg-opacity-80 transition px-4 py-2 rounded-full text-gray-500'}`}
                >
                  Logout
                </button>
            }

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-14 h-7 bg-gray-300 dark:bg-sky-500 rounded-full flex items-center px-1 transition"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition ${darkMode ? "translate-x-7" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* PAGES */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>

      </div>

      {/* Toast Container for displaying toasts */}
      <ToastContainer />
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}