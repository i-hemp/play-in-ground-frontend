// Manage Availability Page - Owner sets which days ground is open
// Simple checkboxes for each day with default 6 AM - 10 PM hours

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getGroundAvailability, setGroundAvailability, requestCustomHours, blockDate } from '../lib/bookingApi';

function ManageAvailability() {
    const { id } = useParams(); // Ground ID
    const { token } = useAuth();
    const navigate = useNavigate();

    const [availability, setAvailability] = useState({});
    const [loading, setLoading] = useState(true);
    const [showCustomHoursForm, setShowCustomHoursForm] = useState(false);
    const [showBlockDateForm, setShowBlockDateForm] = useState(false);

    // Custom hours request form
    const [customHours, setCustomHours] = useState({
        requested_opening: '05:00',
        requested_closing: '23:00',
        reason: ''
    });

    // Block date form
    const [blockDateData, setBlockDateData] = useState({
        blocked_date: '',
        reason: ''
    });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        loadAvailability();
    }, []);

    const loadAvailability = async () => {
        try {
            const data = await getGroundAvailability(id);
            // Convert array to object keyed by day_of_week
            const availMap = {};
            data.forEach(item => {
                availMap[item.day_of_week] = item.is_available;
            });
            setAvailability(availMap);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Toggle day availability
    const handleDayToggle = async (dayIndex) => {
        const newValue = !availability[dayIndex];

        try {
            await setGroundAvailability(id, {
                day_of_week: dayIndex,
                is_available: newValue
            }, token);

            setAvailability({ ...availability, [dayIndex]: newValue });
            alert('Availability updated!');
        } catch (err) {
            alert(err.message);
        }
    };

    // Submit custom hours request
    const handleCustomHoursSubmit = async (e) => {
        e.preventDefault();
        try {
            await requestCustomHours(id, customHours, token);
            alert('Custom hours request submitted! Waiting for admin approval.');
            setShowCustomHoursForm(false);
        } catch (err) {
            alert(err.message);
        }
    };

    // Submit block date
    const handleBlockDateSubmit = async (e) => {
        e.preventDefault();
        try {
            await blockDate(id, blockDateData, token);
            alert('Date blocked successfully!');
            setShowBlockDateForm(false);
            setBlockDateData({ blocked_date: '', reason: '' });
        } catch (err) {
            alert(err.message);
        }
    };

    // Get min date for blocking (4 days from now)
    const getMinBlockDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        return date.toISOString().split('T')[0];
    };

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Manage Availability</h1>

            {/* Default Hours Info */}
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
                <p className="font-semibold">Default Operating Hours: 6:00 AM - 10:00 PM</p>
                <p className="text-sm text-gray-600 mt-1">
                    To change hours, request admin approval below
                </p>
            </div>

            {/* Days Availability */}
            <div className="bg-white border rounded-lg p-4 mb-6">
                <h2 className="font-bold text-lg mb-4">Select Open Days</h2>
                <div className="space-y-3">
                    {days.map((day, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={availability[index] || false}
                                onChange={() => handleDayToggle(index)}
                                className="w-5 h-5"
                            />
                            <span className="text-lg">{day}</span>
                            <span className="text-sm text-gray-500">
                                {availability[index] ? '(6 AM - 10 PM)' : '(Closed)'}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Request Custom Hours Button */}
            <button
                onClick={() => setShowCustomHoursForm(!showCustomHoursForm)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-4 w-full"
            >
                {showCustomHoursForm ? 'Cancel' : 'Request Custom Hours'}
            </button>

            {/* Custom Hours Form */}
            {showCustomHoursForm && (
                <form onSubmit={handleCustomHoursSubmit} className="bg-gray-50 border rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-3">Request Custom Operating Hours</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Opening Time</label>
                            <input
                                type="time"
                                value={customHours.requested_opening}
                                onChange={(e) => setCustomHours({ ...customHours, requested_opening: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Closing Time</label>
                            <input
                                type="time"
                                value={customHours.requested_closing}
                                onChange={(e) => setCustomHours({ ...customHours, requested_closing: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Reason (min 10 characters)</label>
                            <textarea
                                value={customHours.reason}
                                onChange={(e) => setCustomHours({ ...customHours, reason: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                rows="3"
                                required
                                minLength="10"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                            Submit Request
                        </button>
                    </div>
                </form>
            )}

            {/* Block Date Button */}
            <button
                onClick={() => setShowBlockDateForm(!showBlockDateForm)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4 w-full"
            >
                {showBlockDateForm ? 'Cancel' : 'Block a Date'}
            </button>

            {/* Block Date Form */}
            {showBlockDateForm && (
                <form onSubmit={handleBlockDateSubmit} className="bg-gray-50 border rounded-lg p-4 mb-6">
                    <h3 className="font-bold mb-3">Block a Date</h3>
                    <p className="text-sm text-gray-600 mb-3">Must provide at least 4 days notice</p>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date to Block</label>
                            <input
                                type="date"
                                value={blockDateData.blocked_date}
                                onChange={(e) => setBlockDateData({ ...blockDateData, blocked_date: e.target.value })}
                                min={getMinBlockDate()}
                                className="w-full border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Reason</label>
                            <input
                                type="text"
                                value={blockDateData.reason}
                                onChange={(e) => setBlockDateData({ ...blockDateData, reason: e.target.value })}
                                className="w-full border rounded px-3 py-2"
                                required
                                minLength="5"
                            />
                        </div>
                        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">
                            Block Date
                        </button>
                    </div>
                </form>
            )}

            <button
                onClick={() => navigate('/owner/dashboard')}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default ManageAvailability;
