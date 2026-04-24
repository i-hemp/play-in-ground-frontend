import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { userEmail: emailFromAuth, userRole: roleFromAuth } = useAuth();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Get user data from localStorage
        const storedName = localStorage.getItem("name");
        const storedRole = localStorage.getItem("role");
        const storedEmail = localStorage.getItem("email");

        if (storedName) setName(storedName);
        if (storedRole || roleFromAuth) setRole(storedRole || roleFromAuth);
        if (storedEmail || emailFromAuth) setEmail(storedEmail || emailFromAuth);
    }, [emailFromAuth, roleFromAuth]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto mt-20">
                <h1 className="text-4xl font-bold mb-6">Profile</h1>

                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="mb-4">
                        <label className="text-gray-400">Name:</label>
                        <p className="text-2xl font-semibold">{name || "Not logged in"}</p>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-400">Email:</label>
                        <p className="text-xl">{email || "N/A"}</p>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-400">Role:</label>
                        <p className="text-xl capitalize">{role || "N/A"}</p>
                    </div>

                    {/* Role-based content */}
                    {role === "admin" && (
                        <div className="mt-6 p-4 bg-blue-900 rounded">
                            <h2 className="text-xl font-bold mb-2">Admin Dashboard</h2>
                            <p>View all transactions and manage users (Phase 2)</p>
                        </div>
                    )}

                    {role === "owner" && (
                        <div className="mt-6 p-4 bg-green-900 rounded">
                            <h2 className="text-xl font-bold mb-2">Owner Dashboard</h2>
                            <p>Manage your grounds and bookings (Phase 2)</p>
                        </div>
                    )}

                    {role === "player" && (
                        <div className="mt-6 p-4 bg-purple-900 rounded">
                            <h2 className="text-xl font-bold mb-2">Player Dashboard</h2>
                            <p>View your bookings and book new grounds (Phase 2)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
