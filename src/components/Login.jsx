import { useState } from "react";
import FormInput from "./FormInput";
import { API_URL } from "../lib/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login({ onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });

            // Save token, name, email, and role from Go backend response
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("role", res.data.role);

            toast.success("Login successful! Welcome back!");

            // Check if there's a redirect URL stored (from booking attempt)
            const redirectUrl = localStorage.getItem('redirectAfterLogin');

            // Redirect to stored URL or default to grounds page
            setTimeout(() => {
                if (redirectUrl) {
                    localStorage.removeItem('redirectAfterLogin'); // Clean up
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = "/grounds";
                }
            }, 1000);
        } catch (err) {
            setIsSubmitting(false);
            console.log(err.response);

            // Handle different error types
            if (!err.response) {
                toast.error("No internet connection. Please check your network.");
            } else if (err.response.status === 401) {
                toast.error("Invalid email or password. Please try again.");
            } else if (err.response.status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error(err.response?.data?.error || "Login failed. Please try again.");
            }
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            style={{
                width: "300px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h2 className="text-center text-lg font-bold">Login</h2>

            <FormInput label="Email" type="email" value={email} onChange={setEmail} />

            <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
            />

            <button
                type="submit"
                style={{
                    padding: "10px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginLeft: "90px",
                }}
            >
                Login
            </button>

            <p style={{ marginTop: "10px", textAlign: "center" }}>
                Don't have an account?
                <span style={{ color: "blue", cursor: "pointer" }} onClick={onSwitch}>
                    Sign Up
                </span>
            </p>
        </form>
    );
}
