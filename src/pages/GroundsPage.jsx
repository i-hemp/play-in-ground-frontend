import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroundCard from "../components/GroundCard";
import axios from "axios";
import { API_URL } from "../lib/api";
import { toast } from "react-toastify";

export default function GroundsPage() {
    const [grounds, setGrounds] = useState([]);
    const [selectedGround, setSelectedGround] = useState(null);
    const [filteredGrounds, setFilteredGrounds] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.get(`${API_URL}/grounds/locations`);
                setGrounds(response.data);
                setFilteredGrounds(response.data);
            } catch (error) {
                console.error("Failed to fetch grounds:", error);
                toast.error("Failed to load grounds. Please try again.");
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (query === "") {
            setFilteredGrounds(grounds);
            return;
        }
        setFilteredGrounds(
            grounds.filter((ground) => {
                const matchesSearch =
                    ground.name.toLowerCase().includes(query.toLowerCase()) ||
                    ground.place.toLowerCase().includes(query.toLowerCase()) ||
                    ground.price_per_hour.toString().includes(query);
                return matchesSearch;
            })
        );
    }, [query, grounds]);

    const handleBookNow = () => {
        // Check if user is logged in
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login to book a ground");
            setTimeout(() => {
                navigate("/auth");
            }, 1500);
            return;
        }

        // Navigate to booking page with correct ground ID
        navigate(`/book/${selectedGround.id}`);
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white p-6">
            <div>
                <h1 className="text-center text-3xl font-bold mb-6">
                    Available Playgrounds
                </h1>
                <div className="input-group mb-3 text-center">
                    <input
                        type="text"
                        placeholder="Search grounds..."
                        value={query}
                        className="rounded-md px-2 py-2 m-2"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrounds.map((g) => (
                    <GroundCard key={g.id} ground={g} onClick={setSelectedGround} />
                ))}
            </div>

            {selectedGround && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
                    onClick={() => setSelectedGround(null)}
                >
                    <div
                        className="bg-gray-900 p-6 rounded-xl w-11/12 max-w-md"
                        onClick={(e) => e.stopPropagation()} // Prevent closing
                    >
                        <h2 className="text-2xl font-bold mb-2">{selectedGround.name}</h2>
                        <p className="text-gray-400">{selectedGround.place}</p>
                        <p className="text-yellow-400 mt-2">
                            ₹{selectedGround.price_per_hour} / hr
                        </p>
                        <p className="mt-4 text-gray-300">
                            {selectedGround.description || "No description available."}
                        </p>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleBookNow}
                                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-semibold"
                            >
                                Book Now
                            </button>
                            <button
                                onClick={() => setSelectedGround(null)}
                                className="flex-1 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
