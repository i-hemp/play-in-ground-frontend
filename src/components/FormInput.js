import React from "react";

export default function FormInput({ label, type, value, onChange }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
      <input
      
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        required
      />
    </div>
  );
}
