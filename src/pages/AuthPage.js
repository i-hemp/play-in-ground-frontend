import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "gray-700",
      }}
    >
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}
