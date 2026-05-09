// API functions for booking operations
// Simple functions to interact with the booking endpoints

import { API_URL } from './api';

// Create a new booking
export const createBooking = async (bookingData, token) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
    }

    return response.json();
};

// Get my bookings
export const getMyBookings = async (token) => {
    const response = await fetch(`${API_URL}/bookings/my-bookings`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch bookings');
    }

    return response.json();
};

// Get single booking by ID
export const getBookingById = async (bookingId, token) => {
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Booking not found');
    }

    return response.json();
};

// Cancel a booking
export const cancelBooking = async (bookingId, token) => {
    const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to cancel booking');
    }

    return response.json();
};

// Get ground availability
export const getGroundAvailability = async (groundId) => {
    const response = await fetch(`${API_URL}/grounds/${groundId}/availability`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Failed to fetch availability');
    }

    return response.json();
};

// Set ground availability (owner only)
export const setGroundAvailability = async (groundId, availabilityData, token) => {
    const response = await fetch(`${API_URL}/grounds/${groundId}/availability`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(availabilityData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to set availability');
    }

    return response.json();
};

// Request custom hours (owner only)
export const requestCustomHours = async (groundId, requestData, token) => {
    const response = await fetch(`${API_URL}/grounds/${groundId}/request-hours-change`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit request');
    }

    return response.json();
};

// Block a date (owner only)
export const blockDate = async (groundId, blockData, token) => {
    const response = await fetch(`${API_URL}/grounds/${groundId}/block-date`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blockData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to block date');
    }

    return response.json();
};

// Admin: Get pending schedule requests
export const getPendingScheduleRequests = async (token) => {
    const response = await fetch(`${API_URL}/admin/schedule-requests`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch requests');
    }

    return response.json();
};

// Admin: Approve schedule request
export const approveScheduleRequest = async (requestId, token) => {
    const response = await fetch(`${API_URL}/admin/schedule-requests/${requestId}/approve`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to approve request');
    }

    return response.json();
};

// Admin: Reject schedule request
export const rejectScheduleRequest = async (requestId, token) => {
    const response = await fetch(`${API_URL}/admin/schedule-requests/${requestId}/reject`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reject request');
    }

    return response.json();
};

// Owner: Get own grounds
export const getOwnerGrounds = async (token) => {
    const response = await fetch(`${API_URL}/grounds/my-grounds`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch grounds');
    }

    return response.json();
};

// Owner: Get dashboard stats
export const getOwnerStats = async (token) => {
    const response = await fetch(`${API_URL}/bookings/owner-stats`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }

    return response.json();
};

// Owner: Update ground details
export const updateGround = async (groundId, groundData, token) => {
    const response = await fetch(`${API_URL}/grounds/locations/${groundId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(groundData)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update ground');
    }

    return response.json();
};

// Owner: Delete ground
export const deleteGround = async (groundId, token) => {
    const response = await fetch(`${API_URL}/grounds/locations/${groundId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete ground');
    }

    return response.json();
};
