import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token) {
      setIsLoggedIn(true);
      if (name) setUserInitial(name[0].toUpperCase());
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserInitial(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userInitial, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
