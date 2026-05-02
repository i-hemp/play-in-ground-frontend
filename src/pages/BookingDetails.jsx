import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMyBookings } from '../lib/bookingApi';
import { useAuth } from '../context/AuthContext';
import { 
    Calendar, 
    Clock, 
    MapPin, 
    CreditCard, 
    ChevronLeft, 
    CheckCircle2,
    XCircle,
    Navigation,
    Phone
} from 'lucide-react';

function BookingDetails() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooking() {
            try {
                const bookings = await getMyBookings(token);
                const found = bookings.find(b => b._id === id);
                if (found) {
                    setBooking(found);
                } else {
                    throw new Error("Booking not found");
                }
            } catch (err) {
                console.error(err);
                navigate('/dashboard/history');
            } finally {
                setLoading(false);
            }
        }
        fetchBooking();
    }, [id, token, navigate]);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
        </div>
    );

    if (!booking) return null;

    const ground = booking.ground_details;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-white transition group"
            >
                <div className="p-2 bg-gray-800 rounded-xl group-hover:bg-gray-700">
                    <ChevronLeft size={20} />
                </div>
                <span className="font-bold">Back to History</span>
            </button>

            <div className="bg-gray-800 border border-gray-700 rounded-[3rem] overflow-hidden shadow-2xl">
                {/* Header Status */}
                <div className={`p-8 flex items-center justify-between ${
                    booking.status === 'confirmed' ? 'bg-green-500/10 border-b border-green-500/20' : 
                    booking.status === 'cancelled' ? 'bg-red-500/10 border-b border-red-500/20' : 
                    'bg-gray-700/50 border-b border-gray-700'
                }`}>
                    <div className="flex items-center gap-4">
                        {booking.status === 'confirmed' ? (
                            <CheckCircle2 className="text-green-500" size={32} />
                        ) : (
                            <XCircle className="text-red-500" size={32} />
                        )}
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-black text-gray-500 mb-1">Booking Status</p>
                            <h2 className={`text-2xl font-black uppercase ${
                                booking.status === 'confirmed' ? 'text-green-500' : 'text-red-500'
                            }`}>{booking.status}</h2>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest font-black text-gray-500 mb-1">Booking ID</p>
                        <p className="text-sm font-mono text-white opacity-50">#{booking._id.slice(-8).toUpperCase()}</p>
                    </div>
                </div>

                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Venue Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-black text-white mb-2">{ground?.name}</h1>
                            <p className="text-gray-400 flex items-center gap-2">
                                <MapPin size={16} className="text-green-500" />
                                {ground?.place}
                            </p>
                        </div>

                        <div className="aspect-video rounded-3xl overflow-hidden border border-gray-700">
                            <img src={ground?.image_url} alt="" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex gap-4">
                            <a 
                                href={ground?.map_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 py-4 bg-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-700 transition font-bold"
                            >
                                <Navigation size={18} className="text-green-500" /> Directions
                            </a>
                            <button className="p-4 bg-gray-900 border border-gray-700 rounded-2xl hover:bg-gray-700 transition">
                                <Phone size={18} className="text-green-500" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Schedule & Payment */}
                    <div className="space-y-10">
                        <div className="bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-700/50 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date</p>
                                    <p className="text-lg font-bold text-white">
                                        {new Date(booking.booking_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Time Window</p>
                                    <p className="text-lg font-bold text-white">
                                        {booking.start_time} — {parseInt(booking.start_time) + booking.duration_hours}:00 ({booking.duration_hours}h)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center">
                                    <CreditCard size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Paid</p>
                                    <p className="text-2xl font-black text-white">₹{booking.total_price}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-black/20 rounded-[2.5rem] border border-dashed border-gray-700">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Entry Instructions</h3>
                            <ul className="text-sm text-gray-400 space-y-2">
                                <li>• Please reach the venue 15 mins early.</li>
                                <li>• Show this digital receipt at the counter.</li>
                                <li>• Follow and respect the venue's rules.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetails;
