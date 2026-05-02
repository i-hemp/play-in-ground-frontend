import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyBookings, cancelBooking } from '../lib/bookingApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function MyBookings() {
    const { token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        if (token) loadBookings();
    }, [token]);

    const loadBookings = async () => {
        try {
            setLoading(true);
            const data = await getMyBookings(token);
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            await cancelBooking(bookingId, token);
            toast.success('Booking cancelled successfully');
            loadBookings();
        } catch (err) {
            toast.error(err.message);
        }
    };

    const filteredBookings = filterStatus === 'all' 
        ? bookings 
        : bookings.filter(b => b.status === filterStatus);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-white">Booking History</h1>
                <Link to="/grounds" className="text-green-500 hover:text-green-400 font-bold transition">
                    + New Booking
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 px-4 pb-2">
                {['all', 'confirmed', 'cancelled'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                            filterStatus === status 
                                ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' 
                                : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {filteredBookings.length === 0 ? (
                <div className="text-center py-20 bg-gray-800 rounded-[2rem] border border-dashed border-gray-700">
                    <p className="text-gray-400 text-xl mb-6">No {filterStatus !== 'all' ? filterStatus : ''} bookings found.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredBookings.map((booking) => {
                            // Extract data from the aggregated response
                            // The backend returns it as a map where keys are fields from Booking model
                            // and ground_details is the joined object
                            const ground = booking.ground_details;
                            const bookingId = booking._id;

                            return (
                                <div key={bookingId} className="group bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-700 hover:border-gray-600 transition flex flex-col md:flex-row shadow-xl">
                                    <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                                        <img 
                                            src={ground?.image_url || 'https://via.placeholder.com/300?text=No+Image'} 
                                            alt={ground?.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    
                                    <div className="flex-1 p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-1">{ground?.name || 'Unknown Ground'}</h3>
                                                    <p className="text-gray-400 text-sm flex items-center gap-1">
                                                        📍 {ground?.place || 'Location N/A'}
                                                    </p>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                                                    booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                    booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 border-t border-gray-700/50">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
                                                    <p className="font-medium">{new Date(booking.booking_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Time</p>
                                                    <p className="font-medium">{booking.start_time}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Duration</p>
                                                    <p className="font-medium">{booking.duration_hours} hr(s)</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Price</p>
                                                    <p className="font-bold text-green-400">₹{booking.total_price}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            {booking.status === 'confirmed' && (
                                                <button
                                                    onClick={() => handleCancel(bookingId)}
                                                    className="px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white font-bold transition"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
        </div>
    );
}

export default MyBookings;
