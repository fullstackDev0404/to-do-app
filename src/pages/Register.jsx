import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register(){

    const navigate = useNavigate()

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [strength,setStrength] = useState("")

    const inputStyle =
        "w-full pl-10 pr-10 p-3 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-sky-400/20 focus:ring-2 focus:ring-sky-400 outline-none transition";

    const checkStrength = (pass)=>{
        let score = 0

        if(pass.length > 6) score++
        if(/[A-Z]/.test(pass)) score++
        if(/[0-9]/.test(pass)) score++
        if(/[!@#$%^&*]/.test(pass)) score++

        if(score <=1) setStrength("Weak")
        else if(score <=3) setStrength("Medium")
        else setStrength("Strong")
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim())

    const handleRegister = async (e)=>{
        e.preventDefault()

        const trimmedUsername = username?.trim()
        const trimmedEmail = email?.trim()

        if (!trimmedUsername) {
            toast.error("Username is required")
            return
        }
        if (trimmedUsername.length < 2) {
            toast.error("Username must be at least 2 characters")
            return
        }
        if (!trimmedEmail) {
            toast.error("Email is required")
            return
        }
        if (!validateEmail(trimmedEmail)) {
            toast.error("Please enter a valid email address")
            return
        }
        if (!password) {
            toast.error("Password is required")
            return
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        try{
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"
            await axios.post(
                `${baseURL}/auth/register`,
                { username: trimmedUsername, email: trimmedEmail, password }
            )

            toast.success("Account created!")
            navigate("/login")
        } catch(err) {
            const msg = err.response?.data?.message || "Register failed";
            toast.error(msg);
        }
    }

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0f172a]">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md p-8 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Create Account
                </h2>

                {/* USERNAME */}
                <div>
                    <label className="text-sm text-gray-600 dark:text-sky-200">
                        Username
                    </label>

                    <div className="relative mt-2">

                        <span className="absolute left-3 top-3 text-gray-400 mt-1">
                            <FaUser />
                        </span>

                        <input
                            type="text"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            placeholder="Enter username"
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* EMAIL */}
                <div>
                    <label className="text-sm text-gray-600 dark:text-sky-200">
                        Email
                    </label>

                    <div className="relative mt-2">
                        <span className="absolute left-3 top-3 text-gray-400 mt-1">
                            <FaEnvelope />
                        </span>

                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Enter email"
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* PASSWORD */}
                <div>
                    <label className="text-sm text-gray-600 dark:text-sky-200">
                        Password
                    </label>

                    <div className="relative mt-2">
                        <span className="absolute left-3 top-3 text-gray-400 mt-1">
                            <FaLock />
                        </span>

                        <input
                            type={showPassword ? "text":"password"}
                            value={password}
                            onChange={(e)=>{
                            setPassword(e.target.value)
                            checkStrength(e.target.value)
                            }}
                            placeholder="Create password"
                            className={inputStyle}
                        />

                        <span
                            onClick={()=>setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-gray-400 mt-1"
                        >
                            {showPassword ? <FaEyeSlash/>:<FaEye/>}
                        </span>

                    </div>

                    {/* PASSWORD STRENGTH */}
                    <p className="text-sm mt-2 text-gray-500">
                        Strength:{" "}
                        <span
                            className={
                            strength === "Weak"
                            ? "text-red-500"
                            : strength === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                            }
                        >
                            {strength}
                        </span>
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-sky-500 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}