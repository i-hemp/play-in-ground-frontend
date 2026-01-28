// Book Ground Page - Simple booking form with date, time, and duration selection
// Enforces 3-day booking limit and 1-5 hour duration

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../lib/bookingApi';
import { toast } from 'react-toastify';

function BookGround() {
    const { id } = useParams(); // Ground ID from URL
    const navigate = useNavigate();
    const { token } = useAuth();

    const [bookingDate, setBookingDate] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [duration, setDuration] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Get max date (3 days from today)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 3);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    // Handle booking submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const bookingData = {
                ground_id: id,
                booking_date: bookingDate,
                start_time: startTime,
                duration_hours: parseInt(duration)
            };
console.log("TOKEN:", token);

            await createBooking(bookingData, token);
            toast.success('Booking created successfully!');
            setTimeout(() => {
                navigate('/my-bookings');
            }, 1500);
        } catch (err) {
            const errorMessage = err.message || 'Failed to create booking';
            setError(errorMessage);

            // Handle different error types
            if (!err.response) {
                toast.error("No internet connection. Please check your network.");
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-3xl font-bold mb-6">Book Ground</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Booking Date
                    </label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={today}
                        max={maxDateStr}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        You can book up to 3 days in advance
                    </p>
                </div>

                {/* Time Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Start Time
                    </label>
                    <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        {/* Generate time slots from 6 AM to 10 PM */}
                        {Array.from({ length: 17 }, (_, i) => {
                            const hour = 6 + i;
                            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                            return (
                                <option key={timeStr} value={timeStr}>
                                    {timeStr}
                                </option>
                            );
                        })}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                        Available: 6:00 AM - 10:00 PM
                    </p>
                </div>

                {/* Duration Selection */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Duration (hours)
                    </label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                        <option value="5">5 hours</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                        Maximum 5 hours per booking
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Creating Booking...' : 'Book Now'}
                </button>

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default BookGround;
