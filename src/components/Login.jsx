import { useState } from "react";
import FormInput from "./FormInput";
import { API_URL } from "../lib/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogIn, Loader2 } from "lucide-react";

export default function Login({ onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("role", res.data.role);

            toast.success("Welcome back!");
            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            
            setTimeout(() => {
                if (redirectUrl) {
                    localStorage.removeItem('redirectAfterLogin');
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = "/home";
                }
            }, 1000);
        } catch (err) {
            setIsSubmitting(false);
            toast.error(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1 mb-8 text-center">
                <h2 className="text-2xl font-black text-white">Login</h2>
                <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
            </div>

            <FormInput 
                label="Email Address" 
                type="email" 
                value={email} 
                onChange={setEmail} 
                placeholder="name@company.com"
            />

            <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="••••••••"
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition transform hover:scale-[1.02] shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <LogIn size={20} />}
                Login
            </button>

            <p className="text-center text-gray-500 text-sm font-medium mt-6">
                Don't have an account?{" "}
                <button 
                    type="button"
                    className="text-green-500 hover:text-green-400 font-bold" 
                    onClick={onSwitch}
                >
                    Create Account
                </button>
            </p>
        </form>
    );
}
