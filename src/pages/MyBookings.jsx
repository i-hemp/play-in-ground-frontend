// My Bookings Page - Shows all bookings for the logged-in player
// Simple page with list of bookings and cancel functionality

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyBookings, cancelBooking } from '../lib/bookingApi';

function MyBookings() {
    const { token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load bookings when page loads
    useEffect(() => {
        loadBookings();
    }, []);

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

    // Cancel a booking
    const handleCancel = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await cancelBooking(bookingId, token);
            alert('Booking cancelled successfully');
            loadBookings(); // Reload bookings
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4">Loading bookings...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

            {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings yet. Book a ground to get started!</p>
            ) : (
                <div className="grid gap-4">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        {new Date(booking.booking_date).toLocaleDateString()}
                                    </h3>
                                    <p className="text-gray-600">
                                        Time: {booking.start_time} - {booking.end_time}
                                    </p>
                                    <p className="text-gray-600">
                                        Duration: {booking.duration_hours} hour(s)
                                    </p>
                                    <p className="text-gray-600">
                                        Total: ₹{booking.total_price}
                                    </p>
                                    <p className="mt-2">
                                        <span className={`px-2 py-1 rounded text-sm ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {booking.status.toUpperCase()}
                                        </span>
                                    </p>
                                </div>

                                {booking.status === 'confirmed' && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookings;
