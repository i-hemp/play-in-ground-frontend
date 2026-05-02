import { useState, useEffect } from 'react';
import { getOwnerGrounds, getOwnerStats } from '../lib/bookingApi';
import { useAuth } from '../context/AuthContext';
import { 
    Users, 
    CreditCard, 
    MapPin, 
    Plus,
    Edit3,
    Trash2,
    ArrowUpRight
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function OwnerDashboard() {
    const { token } = useAuth();
    const [stats, setStats] = useState({ total_bookings: 0, total_revenue: 0, active_grounds: 0 });
    const [grounds, setGrounds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const [statsRes, groundsRes] = await Promise.all([
                    getOwnerStats(token),
                    getOwnerGrounds(token)
                ]);
                setStats(statsRes);
                setGrounds(groundsRes);
            } catch (err) {
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }
        loadDashboardData();
    }, [token]);

    const statCards = [
        { label: 'Total Revenue', value: `₹${stats.total_revenue || 0}`, icon: CreditCard, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Total Bookings', value: stats.total_bookings || 0, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Active Grounds', value: stats.active_grounds || 0, icon: MapPin, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Owner Overview</h1>
                    <p className="text-gray-400 mt-1">Manage your venues and track performance</p>
                </div>
                <Link 
                    to="/dashboard/add-ground"
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition transform hover:scale-105 shadow-xl shadow-green-500/20"
                >
                    <Plus size={20} />
                    <span>Add New Ground</span>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-gray-800/50 border border-gray-700/50 p-6 rounded-[2rem] hover:border-gray-600 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <ArrowUpRight className="text-gray-600" size={20} />
                            </div>
                            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-3xl font-black text-white mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Grounds List */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-white px-2">My Grounds</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {grounds.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-gray-800/20 border border-dashed border-gray-700 rounded-[2.5rem]">
                            <p className="text-gray-500">No grounds added yet. Start by adding your first venue!</p>
                        </div>
                    ) : (
                        grounds.map((ground) => (
                            <div key={ground.id} className="bg-gray-800 border border-gray-700/50 p-5 rounded-[2.5rem] flex items-center gap-6 group hover:border-green-500/30 transition-all">
                                <div className="w-28 h-28 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg border border-gray-700">
                                    <img src={ground.image_url} alt={ground.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-white truncate mb-1">{ground.name}</h3>
                                    <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                                        <MapPin size={14} className="text-green-500" />
                                        {ground.place}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {ground.sport_types.map((s, i) => (
                                            <span key={i} className="text-[9px] uppercase tracking-wider font-extrabold bg-green-500/5 text-green-500 border border-green-500/10 px-2.5 py-1 rounded-full">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Link 
                                        to={`/dashboard/edit-ground/${ground.id}`}
                                        className="p-3.5 bg-gray-700/50 text-gray-300 rounded-2xl hover:bg-green-500 hover:text-black transition-all"
                                    >
                                        <Edit3 size={18} />
                                    </Link>
                                    <button className="p-3.5 bg-gray-700/50 text-gray-400 rounded-2xl hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default OwnerDashboard;
