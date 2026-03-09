import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Icons for email and password
import Particles from "../components/Particles";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Error state for validation messages
  const navigate = useNavigate(); // For redirect after registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    // Validate fields
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setLoading(true);

    try {
      // Send registration data to the backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful, navigate to login page
        navigate("/login");
      } else {
        // Display error message if registration fails
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <Particles />

      <div className="w-[420px] p-10 rounded-2xl border border-sky-400/30 bg-white/80 dark:bg-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(56,189,248,0.25)] transition">
        <h2 className="text-3xl text-sky-400 text-center font-semibold mb-10">
          Register
        </h2>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Show error message */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600 dark:text-sky-200">Email</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-white">
                <FaEnvelope className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 p-3 rounded-lg bg-gray-100 dark:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-sky-300/20 focus:border-sky-400 outline-none transition"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-600 dark:text-sky-200">Password</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-white">
                <FaLock className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 p-3 rounded-lg bg-gray-100 dark:bg-white/20 text-gray-800 dark:text-white border border-gray-300 dark:border-sky-300/20 focus:border-sky-400 outline-none transition"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-sky-200 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-sky-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}