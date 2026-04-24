import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createBooking } from '../lib/bookingApi';
import { API_URL } from '../lib/api';
import axios from 'axios';
import { toast } from 'react-toastify';

function BookGround() {
    const { id } = useParams(); // Ground ID from URL
    const navigate = useNavigate();
    const { token } = useAuth();

    const [ground, setGround] = useState(null);
    const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('09:00');
    const [duration, setDuration] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Get max date (3 days from today)
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 3);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    // Fetch ground details and booked slots
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const groundRes = await axios.get(`${API_URL}/grounds/locations/${id}`);
                setGround(groundRes.data);
                
                // Fetch booked slots for today by default
                const slotsRes = await axios.get(`${API_URL}/grounds/${id}/booked-slots?date=${bookingDate}`);
                setBookedSlots(slotsRes.data);
            } catch (err) {
                setError('Failed to load ground details');
                toast.error('Could not fetch ground info');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (!id || !bookingDate) return;
        async function fetchSlots() {
            try {
                const slotsRes = await axios.get(`${API_URL}/grounds/${id}/booked-slots?date=${bookingDate}`);
                setBookedSlots(slotsRes.data);
            } catch (err) {
                console.error("Failed to fetch slots", err);
            }
        }
        fetchSlots();
    }, [bookingDate, id]);

    // Check if all slots in the duration range are available
    const getRangeAvailability = (start, dur) => {
        const startHour = parseInt(start.split(':')[0]);
        const range = [];
        for (let i = 0; i < dur; i++) {
            const h = startHour + i;
            range.push(`${h.toString().padStart(2, '0')}:00`);
        }

        const occupied = range.filter(timeStr => 
            Array.isArray(bookedSlots) && bookedSlots.some(s => s.start_time === timeStr)
        );

        return {
            isValid: occupied.length === 0,
            conflicts: occupied
        };
    };

    // Calculate max possible duration from a given start time
    const getMaxDuration = (start) => {
        if (!start) return 5;
        const startH = parseInt(start.split(':')[0]);
        let max = 0;
        
        // Check next 4 hours (since total max is 5, we check 4 more)
        for (let i = 1; i < 5; i++) {
            const currentH = startH + i;
            if (currentH >= 23) break; // Limit to 23:00 (Last slot 22:00 + 1hr)
            
            const timeStr = `${currentH.toString().padStart(2, '0')}:00`;
            const isOccupied = Array.isArray(bookedSlots) && bookedSlots.some(s => s.start_time === timeStr);
            
            if (isOccupied) break;
            max = i;
        }
        return max + 1; 
    };

    const maxAvailableDuration = getMaxDuration(startTime);

    // Auto-adjust duration if it exceeds max available
    useEffect(() => {
        if (duration > maxAvailableDuration) {
            setDuration(1);
        }
    }, [startTime, bookedSlots, maxAvailableDuration]);

    // Start the booking process (Show Modal first)
    const handleInitialSubmit = (e) => {
        e.preventDefault();
        const { isValid, conflicts } = getRangeAvailability(startTime, duration);
        if (!isValid) {
            toast.error(`Conflict! Slots at ${conflicts.join(', ')} are taken.`);
            return;
        }
        setShowConfirmModal(true);
    };

    // Final API Call after confirmation
    const handleFinalConfirm = async () => {
        setIsSubmitting(true);
        setShowConfirmModal(false);

        if (!token) {
            toast.error("Please login to book");
            return;
        }

        try {
            const bookingData = {
                ground_id: id,
                booking_date: bookingDate,
                start_time: startTime,
                duration_hours: parseInt(duration)
            };

            await createBooking(bookingData, token);
            toast.success('Your slot is confirmed!');
            setTimeout(() => navigate('/my-bookings'), 1500);
        } catch (err) {
            toast.error(err.message || 'Failed to book');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );

    const endHourStr = startTime ? `${(parseInt(startTime.split(':')[0]) + parseInt(duration)).toString().padStart(2, '0')}:00` : '';

    return (
        <div className="min-h-screen bg-gray-900 text-white pb-12 relative">
            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="relative bg-gray-800 border border-gray-700 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in duration-200">
                        <h2 className="text-2xl font-bold mb-6 text-center">Confirm Your Booking</h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                <span className="text-gray-400">Ground</span>
                                <span className="font-bold">{ground?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                <span className="text-gray-400">Date</span>
                                <span className="font-bold">{new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                <span className="text-gray-400">Time Slot</span>
                                <span className="font-bold text-green-400">{startTime} — {endHourStr}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                <span className="text-gray-400">Duration</span>
                                <span className="font-bold">{duration} Hour(s)</span>
                            </div>
                            <div className="flex justify-between items-center pt-3">
                                <span className="text-gray-400">Total Price</span>
                                <span className="text-2xl font-black text-green-400">₹{ground?.price_per_hour * duration}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="py-4 bg-gray-700 rounded-2xl font-bold hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleFinalConfirm}
                                className="py-4 bg-green-500 text-black rounded-2xl font-black hover:bg-green-400 transition"
                            >
                                OK, Book Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4 pt-8">
                {/* Ground Header Card */}
                {ground && (
                    <div className="bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-700 shadow-2xl mb-8 flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-64 md:h-auto">
                            <img src={ground.image_url} alt={ground.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-8 md:w-2/3">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {ground.sport_types?.map((sport, i) => (
                                    <span key={i} className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20">
                                        {sport}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl font-bold mb-2">{ground.name}</h1>
                            <p className="text-gray-400 mb-4 flex items-center gap-2">
                                📍 {ground.place}
                            </p>
                            <p className="text-2xl font-bold text-green-400">
                                ₹{ground.price_per_hour} <span className="text-sm text-gray-500 font-normal">/ hour</span>
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-gray-800 rounded-[2.5rem] p-8 border border-gray-700 shadow-2xl">
                    <form onSubmit={handleInitialSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    min={today}
                                    max={maxDateStr}
                                    required
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-2xl px-4 py-4 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                                    Duration (Hours)
                                </label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                    required
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-2xl px-4 py-4 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                                >
                                    {[1, 2, 3, 4, 5].filter(h => h <= maxAvailableDuration).map(h => (
                                        <option key={h} value={h}>{h} {h === 1 ? 'Hour' : 'Hours'}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                                Available Time Slots
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {Array.from({ length: 17 }, (_, i) => {
                                    const hour = 6 + i;
                                    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
                                    const nextTimeStr = `${(hour + 1).toString().padStart(2, '0')}:00`;
                                    
                                    // 1. Lead Time Check (2-hour rule for today)
                                    const slotTime = new Date();
                                    slotTime.setHours(hour, 0, 0, 0);
                                    const nowPlus2 = new Date();
                                    nowPlus2.setHours(nowPlus2.getHours() + 2);
                                    const isTooSoon = bookingDate === today && slotTime < nowPlus2;

                                    // 2. Booking Conflict Check (Existing bookings)
                                    const isBooked = Array.isArray(bookedSlots) && bookedSlots.some(s => s.start_time === timeStr);
                                    
                                    // 3. Selection Range Logic
                                    const isSelectedStart = startTime === timeStr;
                                    const startHour = startTime ? parseInt(startTime.split(':')[0]) : -1;
                                    const isSelectedContinued = startHour !== -1 && hour > startHour && hour < startHour + parseInt(duration);
                                    
                                    // 4. Overlap/Invalid Check for the current range
                                    const { isValid } = startTime ? getRangeAvailability(startTime, duration) : { isValid: true };
                                    const isInInvalidRange = (isSelectedStart || isSelectedContinued) && !isValid;

                                    return (
                                        <button
                                            key={timeStr}
                                            type="button"
                                            disabled={isBooked || isTooSoon}
                                            onClick={() => setStartTime(timeStr)}
                                            className={`
                                                relative py-4 rounded-xl font-bold transition-all border text-sm
                                                ${isBooked || isTooSoon ? 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed opacity-50' : 
                                                  isSelectedStart ? 'bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/20 z-10' : 
                                                  isSelectedContinued ? 'bg-green-500/30 text-green-400 border-green-500/50' :
                                                  'bg-gray-700/50 text-gray-300 border-gray-600 hover:border-green-500'}
                                                ${isInInvalidRange ? 'border-red-500 bg-red-500/20 text-red-500 shadow-none' : ''}
                                            `}
                                        >
                                            {timeStr} - {nextTimeStr}
                                            {isTooSoon && !isBooked && (
                                                <span className="absolute -top-2 -right-1 text-[8px] bg-yellow-600 text-white px-1 rounded">2h+</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Summary & Submit */}
                        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <p className="text-gray-400 text-sm mb-1 uppercase font-semibold tracking-widest">Total Price</p>
                                <p className="text-4xl font-black text-green-400">
                                    ₹{ground ? ground.price_per_hour * duration : 0}
                                </p>
                            </div>
                            
                            <div className="flex gap-4 w-full md:w-auto">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="flex-1 md:flex-none px-8 py-4 bg-gray-700 text-white font-bold rounded-2xl hover:bg-gray-600 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 md:flex-none px-12 py-4 bg-green-500 text-black font-extrabold rounded-2xl hover:bg-green-400 transition transform hover:scale-105 shadow-xl shadow-green-500/20"
                                >
                                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookGround;
