import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInitial, setUserInitial] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        const role = localStorage.getItem("role");

        if (token) {
            setIsLoggedIn(true);
            if (name) setUserInitial(name[0].toUpperCase());
            if (role) setUserRole(role);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUserInitial(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInitial, userRole, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
