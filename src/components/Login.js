import React, { useState } from "react";
import FormInput from "./FormInput";
import { API_URL } from "./../lib/api";
import axios from "axios";

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Save token + name
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);

      alert("Login successful!");
      window.location.reload(); // update navbar
    } catch (err) {
      console.log(err.response);
      alert("Login failed");
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
