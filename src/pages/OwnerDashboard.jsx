// Owner Dashboard - Simple page for owners to manage their grounds
// Shows list of grounds with options to manage availability and block dates

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../lib/api';

function OwnerDashboard() {
    const { token } = useAuth();
    const [grounds, setGrounds] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load owner's grounds
    useEffect(() => {
        loadGrounds();
    }, []);

    const loadGrounds = async () => {
        try {
            const response = await fetch(`${API_URL}/grounds/locations`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setGrounds(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>

            {grounds.length === 0 ? (
                <p className="text-gray-500">No grounds yet. Add a ground to get started!</p>
            ) : (
                <div className="grid gap-4">
                    {grounds.map((ground) => (
                        <div key={ground.id} className="border rounded-lg p-4 shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{ground.name}</h3>
                                    <p className="text-gray-600">{ground.place}</p>
                                    <p className="text-gray-600">₹{ground.price_per_hour}/hour</p>
                                </div>

                                <div className="space-x-2">
                                    <Link
                                        to={`/owner/grounds/${ground.id}/availability`}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
                                    >
                                        Manage Availability
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OwnerDashboard;
