import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { 
    Users, 
    ShieldCheck, 
    TrendingUp, 
    AlertCircle,
    CheckCircle2,
    XCircle,
    Search,
    MapPin,
    Eye,
    ThumbsUp,
    ThumbsDown,
    Loader2
} from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [grounds, setGrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('users'); // users, grounds
    const [isVerifying, setIsVerifying] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, groundsRes] = await Promise.all([
                    axios.get(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get(`${API_URL}/admin/grounds`, { headers: { Authorization: `Bearer ${token}` } })
                ]);
                setUsers(usersRes.data);
                setGrounds(groundsRes.data);
            } catch (err) {
                toast.error("Failed to fetch data. Admin access required.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleVerify = async (id, status) => {
        setIsVerifying(id);
        try {
            await axios.put(`${API_URL}/admin/grounds/${id}/verify`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(`Ground ${status === 'active' ? 'Approved' : 'Rejected'}`);
            // Refresh data
            const res = await axios.get(`${API_URL}/admin/grounds`, { headers: { Authorization: `Bearer ${token}` } });
            setGrounds(res.data);
        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setIsVerifying(null);
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pendingGrounds = grounds.filter(g => g.status === 'pending');

    const stats = [
        { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Owners', value: users.filter(u => u.role === 'owner').length, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Pending Grounds', value: pendingGrounds.length, icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    ];

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">Admin <span className="text-green-500">Control Panel</span></h1>
                        <p className="text-gray-400 mt-2 text-lg">Platform-wide management and verification</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-gray-800/50 border border-gray-700 p-8 rounded-[2.5rem] hover:border-gray-600 transition group">
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                                    <Icon size={28} />
                                </div>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                                <p className="text-4xl font-black mt-2">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-800 pb-px">
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`px-8 py-4 font-bold transition-all border-b-2 ${activeTab === 'users' ? 'border-green-500 text-green-500 bg-green-500/5' : 'border-transparent text-gray-500 hover:text-white'}`}
                    >
                        User Directory
                    </button>
                    <button 
                        onClick={() => setActiveTab('grounds')}
                        className={`px-8 py-4 font-bold transition-all border-b-2 ${activeTab === 'grounds' ? 'border-green-500 text-green-500 bg-green-500/5' : 'border-transparent text-gray-500 hover:text-white'}`}
                    >
                        Ground Verification ({pendingGrounds.length})
                    </button>
                </div>

                {activeTab === 'users' ? (
                    <div className="bg-gray-800 border border-gray-700 rounded-[3rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-8 border-b border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <h2 className="text-2xl font-bold">All Users</h2>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search users..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-gray-900 border border-gray-700 rounded-2xl pl-12 pr-6 py-3 focus:ring-2 focus:ring-green-500 outline-none w-full md:w-80"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-900/50 text-gray-500 text-xs font-bold uppercase tracking-widest">
                                        <th className="px-8 py-5">User Info</th>
                                        <th className="px-8 py-5">Role</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-700/20 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                    user.role === 'admin' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                    user.role === 'owner' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                                                    'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="text-gray-500 hover:text-red-500 transition p-2">
                                                    <XCircle size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {grounds.length === 0 ? (
                            <div className="col-span-full py-20 bg-gray-800/30 border border-dashed border-gray-700 rounded-[3rem] text-center">
                                <p className="text-gray-500">No grounds listed on the platform yet.</p>
                            </div>
                        ) : grounds.filter(g => activeTab === 'grounds' ? g.status === 'pending' : true).length === 0 ? (
                            <div className="col-span-full py-20 bg-gray-800/30 border border-dashed border-gray-700 rounded-[3rem] text-center">
                                <p className="text-gray-500 text-lg">No pending grounds to verify. Great job!</p>
                            </div>
                        ) : grounds.filter(g => activeTab === 'grounds' ? g.status === 'pending' : true).map((ground) => (
                            <div key={ground.id} className="bg-gray-800 border border-gray-700 rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl">
                                <div className="h-48 relative">
                                    <img src={ground.image_url} alt={ground.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                        <p className="text-green-400 font-bold">₹{ground.price_per_hour}/hr</p>
                                    </div>
                                </div>
                                <div className="p-8 space-y-4 flex-1">
                                    <div>
                                        <h3 className="text-2xl font-bold">{ground.name}</h3>
                                        <p className="text-gray-400 flex items-center gap-1 mt-1">
                                            <MapPin size={14} className="text-green-500" /> {ground.place}
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {ground.sport_types?.map((s, i) => (
                                            <span key={i} className="text-[10px] uppercase font-black px-2.5 py-1 bg-gray-900 text-gray-400 rounded-md border border-gray-700">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {ground.description}
                                    </p>
                                </div>
                                <div className="p-6 bg-gray-900/50 border-t border-gray-700 flex gap-4">
                                    <button 
                                        onClick={() => handleVerify(ground.id, 'active')}
                                        disabled={isVerifying === ground.id}
                                        className="flex-1 bg-green-500 text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-green-400 transition transform hover:scale-[1.02] shadow-lg shadow-green-500/20 disabled:opacity-50"
                                    >
                                        {isVerifying === ground.id ? <Loader2 className="animate-spin" size={20} /> : <ThumbsUp size={20} />}
                                        Approve
                                    </button>
                                    <button 
                                        onClick={() => handleVerify(ground.id, 'rejected')}
                                        disabled={isVerifying === ground.id}
                                        className="flex-1 bg-gray-800 text-red-500 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border border-red-500/20 hover:bg-red-500/5 transition disabled:opacity-50"
                                    >
                                        <ThumbsDown size={20} />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
