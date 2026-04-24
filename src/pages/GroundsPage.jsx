import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroundCard from "../components/GroundCard";
import axios from "axios";
import { API_URL } from "../lib/api";
import { toast } from "react-toastify";

// Define a list of common sports for filtering
const SPORT_OPTIONS = ["Football", "Cricket", "Badminton", "Tennis", "Basketball", "Swimming"];

export default function GroundsPage() {
    const [grounds, setGrounds] = useState([]);
    const [selectedGround, setSelectedGround] = useState(null);
    const [filteredGrounds, setFilteredGrounds] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedSports, setSelectedSports] = useState([]);
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

    // Filter logic
    useEffect(() => {
        let results = grounds;

        // Search query filter
        if (query) {
            const q = query.toLowerCase();
            results = results.filter(g => 
                g.name.toLowerCase().includes(q) || 
                g.place.toLowerCase().includes(q)
            );
        }

        // Sport type filter (OR logic - if ground supports any selected sport)
        if (selectedSports.length > 0) {
            results = results.filter(g => 
                g.sport_types?.some(s => selectedSports.includes(s))
            );
        }

        setFilteredGrounds(results);
    }, [query, grounds, selectedSports]);

    const toggleSport = (sport) => {
        setSelectedSports(prev => 
            prev.includes(sport) 
                ? prev.filter(s => s !== sport) 
                : [...prev, sport]
        );
    };

    const handleBookNow = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to book a ground");
            localStorage.setItem('redirectAfterLogin', `/book/${selectedGround.id}`);
            navigate("/auth");
            return;
        }
        navigate(`/book/${selectedGround.id}`);
    };

    return (
        <main className="min-h-screen bg-gray-900 text-white pb-20">
            {/* Header & Search Area */}
            <section className="bg-gray-800/50 border-b border-gray-800 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
                        Find Your <span className="text-green-500">Playground</span>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Search Input */}
                        <div className="relative flex-1 group w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search by name or location..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition group-hover:border-gray-600"
                            />
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                        </div>

                        {/* Sport Toggles */}
                        <div className="flex flex-wrap gap-2">
                            {SPORT_OPTIONS.map(sport => (
                                <button
                                    key={sport}
                                    onClick={() => toggleSport(sport)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition ${
                                        selectedSports.includes(sport)
                                            ? 'bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/20'
                                            : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-600'
                                    }`}
                                >
                                    {sport}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Grounds Grid */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-gray-400 font-medium">
                        Showing <span className="text-white font-bold">{filteredGrounds.length}</span> venues
                    </p>
                    {selectedSports.length > 0 && (
                        <button 
                            onClick={() => setSelectedSports([])}
                            className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>

                {filteredGrounds.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/30 rounded-[3rem] border border-dashed border-gray-800">
                        <p className="text-gray-500 text-lg">No grounds match your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGrounds.map((g) => (
                            <GroundCard key={g.id} ground={g} onClick={setSelectedGround} />
                        ))}
                    </div>
                )}
            </section>

            {/* Premium Detail Modal */}
            {selectedGround && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex justify-center items-center p-4"
                    onClick={() => setSelectedGround(null)}
                >
                    <div
                        className="bg-gray-800 rounded-[2.5rem] overflow-hidden w-full max-w-2xl border border-gray-700 flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="md:w-1/2 h-64 md:h-auto relative">
                            <img src={selectedGround.image_url} alt={selectedGround.name} className="w-full h-full object-cover" />
                            <button 
                                onClick={() => setSelectedGround(null)}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-8 md:w-1/2 flex flex-col">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedGround.sport_types?.map((sport, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black tracking-widest border border-green-500/20">
                                        {sport}
                                    </span>
                                ))}
                            </div>
                            
                            <h2 className="text-3xl font-extrabold mb-2">{selectedGround.name}</h2>
                            <p className="text-gray-400 mb-6 flex items-center gap-2">📍 {selectedGround.place}</p>
                            
                            <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-8">
                                {selectedGround.description || "Experience top-tier amenities and professional maintenance at this premium venue."}
                            </p>

                            <div className="pt-6 border-t border-gray-700 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Pricing</p>
                                    <p className="text-2xl font-black text-green-400">₹{selectedGround.price_per_hour}<span className="text-xs text-gray-500 font-normal ml-1">/hr</span></p>
                                </div>
                                <button
                                    onClick={handleBookNow}
                                    className="px-8 py-3 bg-green-500 text-black font-extrabold rounded-2xl hover:bg-green-400 transition transform hover:scale-105 shadow-xl shadow-green-500/20"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
