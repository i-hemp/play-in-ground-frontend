import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { 
    Save, 
    Image as ImageIcon, 
    MapPin, 
    IndianRupee, 
    Type, 
    FileText,
    ArrowLeft
} from 'lucide-react';
import { toast } from 'react-toastify';

const SPORT_OPTIONS = ["Football", "Cricket", "Badminton", "Tennis", "Basketball", "Swimming"];

export default function EditGround() {
    const { id } = useParams();
    const { token } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        place: '',
        image_url: '',
        price_per_hour: 0,
        description: '',
        map_url: '',
        sport_types: []
    });

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchGround = async () => {
            try {
                const res = await axios.get(`${API_URL}/grounds/locations/${id}`);
                setFormData(res.data);
            } catch (err) {
                toast.error("Failed to load ground details");
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
        };
        fetchGround();
    }, [id, navigate]);

    const toggleSport = (sport) => {
        setFormData(prev => ({
            ...prev,
            sport_types: prev.sport_types.includes(sport)
                ? prev.sport_types.filter(s => s !== sport)
                : [...prev.sport_types, sport]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`${API_URL}/grounds/locations/${id}`, {
                ...formData,
                price_per_hour: parseInt(formData.price_per_hour)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Ground updated successfully!");
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to update ground");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto space-y-10">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tight">Edit <span className="text-green-500">Venue</span></h1>
                    <p className="text-gray-400">Update your ground details and availability</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-2xl">
                    <div className="space-y-6">
                        {/* Ground Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                <Type size={14} /> Ground Name
                            </label>
                            <input 
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                            />
                        </div>

                        {/* Location & Map URL */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                    <MapPin size={14} /> Location Area
                                </label>
                                <input 
                                    type="text"
                                    required
                                    value={formData.place}
                                    onChange={(e) => setFormData({...formData, place: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                    <MapPin size={14} /> Google Maps URL
                                </label>
                                <input 
                                    type="url"
                                    required
                                    value={formData.map_url}
                                    onChange={(e) => setFormData({...formData, map_url: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Image URL & Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                    <ImageIcon size={14} /> Image URL
                                </label>
                                <input 
                                    type="url"
                                    required
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                    <IndianRupee size={14} /> Price Per Hour
                                </label>
                                <input 
                                    type="number"
                                    required
                                    value={formData.price_per_hour}
                                    onChange={(e) => setFormData({...formData, price_per_hour: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                <FileText size={14} /> Description
                            </label>
                            <textarea 
                                rows="4"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
                            />
                        </div>

                        {/* Sport Types */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Select Sport Types</label>
                            <div className="flex flex-wrap gap-3">
                                {SPORT_OPTIONS.map(sport => (
                                    <button
                                        key={sport}
                                        type="button"
                                        onClick={() => toggleSport(sport)}
                                        className={`px-6 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                                            formData.sport_types.includes(sport)
                                                ? 'bg-green-500 text-black border-green-500 shadow-lg shadow-green-500/20'
                                                : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500'
                                        }`}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition transform hover:scale-[1.02] shadow-xl shadow-green-500/20 flex items-center justify-center gap-3"
                    >
                        {isSubmitting ? 'Updating...' : (
                            <>
                                <Save size={24} /> Save Changes
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
