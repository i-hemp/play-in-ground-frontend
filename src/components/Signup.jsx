import { useState } from "react";
import { API_URL } from "../lib/api";
import axios from "axios";
import FormInput from "./FormInput";
import { toast } from "react-toastify";

export default function Signup({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("player"); // Default role

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/signup`, {
                name,
                email,
                password,
                role, // Send role to Go backend
            });
            console.log(res.data);
            toast.success("Signup successful! Please login now.");
            setTimeout(() => {
                onSwitch();
            }, 1500);
        } catch (err) {
            console.log(err.response);
            console.log(err);

            // Handle different error types
            if (!err.response) {
                toast.error("No internet connection. Please check your network.");
            } else if (err.response.status === 400) {
                toast.error(err.response?.data?.error || "Invalid signup details.");
            } else if (err.response.status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error("Signup failed. Please try again.");
            }
        }
    };

    return (
        <form
            onSubmit={handleSignup}
            style={{
                width: "300px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h2 className="text-center text-lg font-bold">Sign Up</h2>

            <FormInput label="Name" type="text" value={name} onChange={setName} />
            <FormInput label="Email" type="email" value={email} onChange={setEmail} />
            <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
            />

            {/* Role Selection Dropdown */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        color: "black",
                    }}
                >
                    <option value="player">Player</option>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button
                style={{
                    padding: "10px",
                    background: "#2196F3",
                    color: "#fff",
                    marginLeft: "90px",
                    border: "none",
                    borderRadius: "5px",
                }}
            >
                Sign Up
            </button>

            <p style={{ marginTop: "10px" }}>
                Already have an account?
                <span onClick={onSwitch} style={{ color: "blue", cursor: "pointer" }}>
                    Login
                </span>
            </p>
        </form>
    );
}
