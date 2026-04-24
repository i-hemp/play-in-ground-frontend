import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInitial, setUserInitial] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");

        if (storedToken) {
            // Check if token is expired
            try {
                const payload = JSON.parse(atob(storedToken.split('.')[1]));
                const expiry = payload.exp * 1000; // Convert to milliseconds

                if (Date.now() > expiry) {
                    // Token expired - logout
                    logout();
                    return;
                }
            } catch (e) {
                // Invalid token format - logout
                logout();
                return;
            }

            setIsLoggedIn(true);
            setToken(storedToken);
            if (name) setUserInitial(name[0].toUpperCase());
            if (email) setUserEmail(email);
            if (role) setUserRole(role);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUserInitial(null);
        setUserEmail(null);
        setUserRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInitial, userRole, userEmail, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
