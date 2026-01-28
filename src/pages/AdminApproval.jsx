// Admin Approval Page - Simple page for admins to approve/reject schedule requests
// Shows list of pending requests with approve/reject buttons

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPendingScheduleRequests, approveScheduleRequest, rejectScheduleRequest } from '../lib/bookingApi';

function AdminApproval() {
    const { token } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            const data = await getPendingScheduleRequests(token);
            setRequests(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        if (!window.confirm('Approve this schedule change request?')) return;

        try {
            await approveScheduleRequest(requestId, token);
            alert('Request approved!');
            loadRequests(); // Reload
        } catch (err) {
            alert(err.message);
        }
    };

    const handleReject = async (requestId) => {
        if (!window.confirm('Reject this schedule change request?')) return;

        try {
            await rejectScheduleRequest(requestId, token);
            alert('Request rejected');
            loadRequests(); // Reload
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Pending Schedule Requests</h1>

            {requests.length === 0 ? (
                <p className="text-gray-500">No pending requests</p>
            ) : (
                <div className="grid gap-4">
                    {requests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4 shadow">
                            <div className="mb-3">
                                <h3 className="font-bold text-lg">Schedule Change Request</h3>
                                <p className="text-sm text-gray-500">
                                    Submitted: {new Date(request.created_at).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Current Hours</p>
                                    <p>{request.current_opening} - {request.current_closing}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Requested Hours</p>
                                    <p className="text-blue-600 font-semibold">
                                        {request.requested_opening} - {request.requested_closing}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-600">Reason</p>
                                <p className="bg-gray-50 p-2 rounded">{request.reason}</p>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleApprove(request.id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex-1"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminApproval;
