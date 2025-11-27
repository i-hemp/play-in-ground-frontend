import React, { useState } from "react";
import { API_URL } from "./../lib/api";
import axios from "axios";
import FormInput from "./FormInput";
export default function Signup({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      console.log(res.data);
      alert("Signup successful, now login!");
      onSwitch();
    } catch (err) {
      console.log(err.response);
      console.log(err);
      alert("Signup failed");
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

      <button
        style={{
          padding: "10px",
          background: "#2196F3",
          color: "#fff",
          marginLeft: "90px",
          border: "none",
          borderRadius: "5px rounded",
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
