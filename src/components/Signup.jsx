import { useState } from "react";
import { API_URL } from "../lib/api";
import axios from "axios";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import { UserPlus, Loader2 } from "lucide-react";

export default function Signup({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("player");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/auth/signup`, { name, email, password, role });
            toast.success("Signup successful! Welcome to the arena.");
            
            // Auto-login
            const loginRes = await axios.post(`${API_URL}/auth/login`, { email, password });
            localStorage.setItem("token", loginRes.data.token);
            localStorage.setItem("name", loginRes.data.name);
            localStorage.setItem("email", loginRes.data.email);
            localStorage.setItem("role", loginRes.data.role);

            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            setTimeout(() => {
                window.location.href = redirectUrl || "/home";
            }, 1000);
        } catch (err) {
            setIsSubmitting(false);
            toast.error(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1 mb-6 text-center">
                <h2 className="text-2xl font-black text-white">Create Account</h2>
                <p className="text-gray-500 text-sm">Join the community today</p>
            </div>

            <FormInput 
                label="Full Name" 
                type="text" 
                value={name} 
                onChange={setName} 
                placeholder="John Doe"
            />
            
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

            <div className="space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Account Type</label>
                <div className="grid grid-cols-3 gap-3">
                    {['player', 'owner', 'admin'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                                role === r 
                                ? 'bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/10' 
                                : 'bg-gray-900 text-gray-500 border-gray-700 hover:border-gray-600'
                            }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition transform hover:scale-[1.02] shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />}
                Sign Up
            </button>

            <p className="text-center text-gray-500 text-sm font-medium mt-6">
                Already have an account?{" "}
                <button 
                    type="button"
                    className="text-green-500 hover:text-green-400 font-bold" 
                    onClick={onSwitch}
                >
                    Login
                </button>
            </p>
        </form>
    );
}
