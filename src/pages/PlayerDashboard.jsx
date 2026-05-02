import { useState, useEffect } from 'react';
import { getMyBookings } from '../lib/bookingApi';
import { useAuth } from '../context/AuthContext';
import { 
    Calendar, 
    ChevronRight, 
    Clock, 
    MapPin, 
    Trophy,
    Star
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function PlayerDashboard() {
    const { token, userEmail } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBookings() {
            try {
                const data = await getMyBookings(token);
                setBookings(data);
            } catch (err) {
                toast.error("Failed to load your bookings");
            } finally {
                setLoading(false);
            }
        }
        loadBookings();
    }, [token]);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
        </div>
    );

    const upcoming = bookings.filter(b => b.status === 'confirmed').slice(0, 3);

    return (
        <div className="space-y-10">
            {/* Player Welcome Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-green-500/20">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black text-black mb-2">Welcome Back!</h1>
                    <p className="text-black/70 font-semibold">{userEmail}</p>
                    
                    <div className="flex flex-wrap gap-4 mt-8">
                        <div className="bg-black/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                            <Trophy className="text-black" size={20} />
                            <span className="font-bold text-black">Pro Player</span>
                        </div>
                        <div className="bg-black/10 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                            <Star className="text-black" size={20} />
                            <span className="font-bold text-black">{bookings.length} Bookings</span>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 mr-20 mb-20 w-32 h-32 bg-black/5 rounded-full blur-2xl"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Upcoming Bookings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold text-white">Upcoming Sessions</h2>
                        <Link to="/dashboard/history" className="text-green-500 text-sm font-bold flex items-center gap-1 hover:underline">
                            View All <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {upcoming.length === 0 ? (
                            <div className="bg-gray-800/30 border border-dashed border-gray-700 rounded-[2rem] py-12 text-center text-gray-500">
                                No upcoming bookings found. Ready for a game?
                            </div>
                        ) : (
                            upcoming.map((booking) => (
                                <div key={booking._id} className="bg-gray-800 border border-gray-700 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center gap-6 hover:border-gray-600 transition-colors">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-700">
                                        <img src={booking.ground_details?.image_url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white">{booking.ground_details?.name}</h3>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Calendar size={14} className="text-green-500" />
                                                <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Clock size={14} className="text-green-500" />
                                                <span>{booking.start_time} ({booking.duration_hours}h)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/dashboard/booking/${booking._id}`}
                                        className="bg-gray-700 px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-600 transition-colors"
                                    >
                                        Details
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Profile Stats / Favorites (Placeholder for now) */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white px-2">Recent Places</h2>
                    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-[2.5rem]">
                        <div className="space-y-4">
                            {bookings.slice(0, 3).map((b, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-green-500">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">{b.ground_details?.name}</p>
                                        <p className="text-xs text-gray-500">{b.ground_details?.place}</p>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full mt-4 py-3 bg-gray-700/50 text-gray-400 rounded-xl text-xs font-bold hover:text-white transition-colors border border-transparent hover:border-gray-600">
                                Browse More Grounds
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerDashboard;
