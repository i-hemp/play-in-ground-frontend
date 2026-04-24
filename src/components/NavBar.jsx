import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { isLoggedIn, userInitial, userRole, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate("/home");
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link to="/home" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <span className="font-bold text-black">P</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                PlayInGround
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/home" className="px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition">
                                Home
                            </Link>
                            <Link to="/grounds" className="px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition">
                                Grounds
                            </Link>
                            <Link to="/about" className="px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition">
                                About
                            </Link>
                            <Link to="/Contact" className="px-3 py-2 rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Auth / Profile Area */}
                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-800 transition-colors focus:outline-none"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white ring-2 ring-gray-800 group-hover:ring-blue-500 transition-all">
                                        <span className="font-bold">{userInitial}</span>
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform origin-top-right transition-all">
                                        <div className="px-4 py-2 border-b border-gray-700">
                                            <p className="text-xs text-gray-400">Signed in as</p>
                                            <p className="text-sm font-medium truncate uppercase">{userRole}</p>
                                        </div>
                                        
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            My Profile
                                        </Link>
                                        
                                        <Link
                                            to="/my-bookings"
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            My Bookings
                                        </Link>

                                        {userRole === "owner" && (
                                            <Link
                                                to="/owner/dashboard"
                                                className="block px-4 py-2 text-sm text-green-400 hover:bg-gray-700 hover:text-green-300 font-medium"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Owner Dashboard
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="px-5 py-2 rounded-full font-semibold bg-green-500 text-black hover:bg-green-400 transition transform hover:scale-105"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
