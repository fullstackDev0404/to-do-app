import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { FaEnvelope, FaLock } from "react-icons/fa"; // React Icons for Email and Lock icons
import Particles from "../components/Particles";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" }); // Validation error state
  const navigate = useNavigate(); // Navigate for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: "", password: "" }); // Reset errors

    // Validation
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (!isValid) {
      setError(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Send login request to the server
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and username to localStorage on success
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        // Redirect to the dashboard
        navigate("/dashboard");
      } else {
        setError({ ...error, email: data.error || "Login failed" });
      }
    } catch (err) {
      console.error(err);
      setError({ ...error, email: "An error occurred during login." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <Particles />

      <div className="w-[420px] p-10 rounded-2xl border border-sky-400/30 bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(56,189,248,0.25)] transition">
        <h2 className="text-3xl text-sky-400 text-center font-semibold mb-10">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 dark:text-sky-200">Email</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-white">
                <FaEnvelope className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" /> {/* Adjusted icon size */}
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-10 p-3 rounded-lg bg-gray-100 dark:bg-white/20 text-gray-800 dark:text-white border ${error.email ? 'border-red-500' : 'border-gray-300'} dark:border-sky-300/20 focus:border-sky-400 outline-none transition`}
              />
            </div>
            {error.email && <p className="text-red-500 text-xs mt-1">{error.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 dark:text-sky-200">Password</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-white">
                <FaLock className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" /> {/* Adjusted icon size */}
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full pl-10 p-3 rounded-lg bg-gray-100 dark:bg-white/20 text-gray-800 dark:text-white border ${error.password ? 'border-red-500' : 'border-gray-300'} dark:border-sky-300/20 focus:border-sky-400 outline-none transition`}
              />
            </div>
            {error.password && <p className="text-red-500 text-xs mt-1">{error.password}</p>}
          </div>

          {/* LOGIN BUTTON */}
          <button disabled={loading} className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-sky-200 mt-6">
          Don't have an account? <a href="/register" className="text-sky-500 hover:underline">Register</a> {/* Register link */}
        </p>
      </div>
    </div>
  );
}