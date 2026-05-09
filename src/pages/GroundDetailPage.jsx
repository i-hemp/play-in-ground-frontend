import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../lib/api';
import { 
    MapPin, 
    Clock, 
    Shield, 
    ArrowLeft, 
    Share2, 
    Heart,
    Star,
    CheckCircle2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function GroundDetailPage() {
    const { id } = useParams();
    const [ground, setGround] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGround = async () => {
            try {
                const res = await axios.get(`${API_URL}/grounds/locations/${id}`);
                setGround(res.data);
            } catch (err) {
                toast.error("Failed to load ground details");
            } finally {
                setLoading(false);
            }
        };
        fetchGround();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );

    if (!ground) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Ground Not Found</h1>
                <Link to="/grounds" className="text-green-500 hover:underline">Back to Grounds</Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                <img 
                    src={ground.image_url} 
                    alt={ground.name} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                
                {/* Top Nav Overlay */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                    <Link 
                        to="/grounds" 
                        className="p-3 bg-black/50 backdrop-blur-md rounded-2xl hover:bg-black/70 transition"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="flex gap-3">
                        <button className="p-3 bg-black/50 backdrop-blur-md rounded-2xl hover:bg-black/70 transition">
                            <Share2 size={24} />
                        </button>
                        <button className="p-3 bg-black/50 backdrop-blur-md rounded-2xl hover:bg-black/70 transition">
                            <Heart size={24} />
                        </button>
                    </div>
                </div>

                {/* Ground Title Overlay */}
                <div className="absolute bottom-12 left-6 right-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {ground.sport_types?.map((sport, i) => (
                                <span key={i} className="px-4 py-1.5 bg-green-500 text-black font-black rounded-full text-xs uppercase tracking-widest">
                                    {sport}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">{ground.name}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-green-500" size={20} />
                                <span className="font-medium">{ground.place}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                                <span className="font-medium text-white">4.8 (120+ Reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Description */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            About this <span className="text-green-500">Venue</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            {ground.description || "Experience top-tier sports facilities at this premium venue. Designed for both professional matches and casual weekend games with friends."}
                        </p>
                    </section>

                    {/* Amenities */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Facilities & Amenities</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                "Floodlights", "Changing Rooms", "Drinking Water", 
                                "Free Parking", "First Aid Kit", "Locker Rooms"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                                    <CheckCircle2 className="text-green-500" size={18} />
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Location / Map */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Location</h2>
                        <div className="bg-gray-800/50 p-6 rounded-[2.5rem] border border-gray-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-gray-300">{ground.place}</p>
                                <a 
                                    href={ground.map_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-green-500 font-bold hover:underline"
                                >
                                    Open in Google Maps
                                </a>
                            </div>
                            <div className="h-64 bg-gray-700 rounded-3xl overflow-hidden flex items-center justify-center text-gray-500 border border-gray-600">
                                <p>Map View Placeholder</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Booking Card */}
                <div className="relative">
                    <div className="sticky top-12 bg-gray-800 p-8 rounded-[2.5rem] border border-gray-700 shadow-2xl space-y-8">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Price</p>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white">₹{ground.price_per_hour}</span>
                                <span className="text-gray-500 mb-1">/ hour</span>
                            </div>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-gray-700">
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                                <Clock className="text-green-500" size={20} />
                                <span>6 AM - 11 PM Availability</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-300">
                                <Shield className="text-green-500" size={20} />
                                <span>Free Cancellation (24h before)</span>
                            </div>
                        </div>

                        <Link 
                            to={`/grounds/${ground.id}/book`}
                            className="block w-full py-5 bg-green-500 text-black font-black text-center rounded-2xl hover:bg-green-400 transition shadow-xl shadow-green-500/20 transform hover:scale-[1.02]"
                        >
                            Book Your Slot
                        </Link>
                        
                        <p className="text-center text-xs text-gray-500">
                            No payment required until Phase 3 integration!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
