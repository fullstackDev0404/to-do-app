import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)
const [remember,setRemember] = useState(false)

const inputStyle = "w-full pl-10 pr-10 p-3 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-sky-400/20 focus:ring-2 focus:ring-sky-400 outline-none transition";

const handleLogin = async (e)=>{
    e.preventDefault()

    try{

        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"
        const res = await axios.post(
            `${baseURL}/auth/login`,
            { email,password }
        )

        const token = res.data.token

        if(remember){
            localStorage.setItem("token",token)
        }else{
            sessionStorage.setItem("token",token)
        }

        navigate("/dashboard")

        } catch(err) {
            const msg = err.response?.data?.message || "Login failed";
            toast.error(msg);
        }

    }

    return(

        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0f172a]">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md p-8 bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Login
                </h2>

                {/* EMAIL */}
                <div>

                    <label className="text-sm text-gray-600 dark:text-sky-200">
                        Email
                    </label>

                    <div className="relative mt-2">
                        <span className="absolute left-3 top-3 text-gray-400 mt-1">
                            <FaEnvelope/>
                        </span>

                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Enter your email"
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
                            <FaLock/>
                        </span>

                        <input
                            type={showPassword ? "text":"password"}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder="Enter password"
                            className={inputStyle}
                        />

                        <span
                            onClick={()=>setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 cursor-pointer text-gray-400 mt-1"
                        >
                            {showPassword ? <FaEyeSlash/>:<FaEye/>}
                        </span>

                    </div>
                </div>

                {/* OPTIONS */}
                <div className="flex justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={()=>setRemember(!remember)}
                    />
                        Remember me
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-sky-500 hover:underline"
                        >
                        Register
                    </Link>
                </p>

            </form>

        </div>

    )

}