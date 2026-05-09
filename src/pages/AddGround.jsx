import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { 
    Plus, 
    Image as ImageIcon, 
    MapPin, 
    IndianRupee, 
    Type, 
    FileText,
    ArrowLeft,
    Upload,
    Loader2,
    CheckCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

const SPORT_OPTIONS = ["Football", "Cricket", "Badminton", "Tennis", "Basketball", "Swimming"];

const CLOUDINARY_UPLOAD_PRESET = "playo_preset";
const CLOUDINARY_CLOUD_NAME = "dyhbmm3or";

export default function AddGround() {
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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const toggleSport = (sport) => {
        setFormData(prev => ({
            ...prev,
            sport_types: prev.sport_types.includes(sport)
                ? prev.sport_types.filter(s => s !== sport)
                : [...prev.sport_types, sport]
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview
        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                uploadData
            );
            setFormData(prev => ({ ...prev, image_url: res.data.secure_url }));
            toast.success("Image uploaded successfully!");
        } catch (err) {
            toast.error("Failed to upload image. Please try again.");
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.sport_types.length === 0) {
            toast.error("Please select at least one sport type");
            return;
        }
        if (!formData.image_url) {
            toast.error("Please upload an image of your venue");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/grounds/locations`, {
                ...formData,
                price_per_hour: parseInt(formData.price_per_hour)
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Ground submitted for verification!");
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to list ground");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <h1 className="text-4xl font-black tracking-tight">List a <span className="text-green-500">New Venue</span></h1>
                    <p className="text-gray-400">Your venue will be visible to players after admin verification.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-[2.5rem] p-8 md:p-12 space-y-8 shadow-2xl">
                    <div className="space-y-6">
                        
                        {/* Image Upload Area */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                <ImageIcon size={14} /> Venue Image
                            </label>
                            <div 
                                className={`relative h-64 border-2 border-dashed rounded-[2rem] overflow-hidden transition-all flex flex-col items-center justify-center gap-4 ${
                                    previewUrl ? 'border-green-500/50' : 'border-gray-700 hover:border-gray-600 bg-gray-900'
                                }`}
                            >
                                {previewUrl ? (
                                    <>
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-60" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            {isUploading ? (
                                                <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-3">
                                                    <Loader2 className="animate-spin text-green-500" size={20} />
                                                    <span className="font-bold">Uploading to Cloud...</span>
                                                </div>
                                            ) : (
                                                <div className="bg-green-500 text-black px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-xl">
                                                    <CheckCircle size={20} />
                                                    Image Ready
                                                </div>
                                            )}
                                            <label className="mt-4 text-xs text-white/70 underline cursor-pointer hover:text-white">
                                                Change Image
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <Upload className="text-gray-600 mb-2" size={40} />
                                        <p className="font-bold text-gray-500">Click to upload ground image</p>
                                        <p className="text-xs text-gray-600 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Ground Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                <Type size={14} /> Ground Name
                            </label>
                            <input 
                                type="text"
                                placeholder="e.g. Champions Turf"
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
                                    placeholder="e.g. Koramangala, Bangalore"
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
                                    placeholder="https://maps.google.com/..."
                                    required
                                    value={formData.map_url}
                                    onChange={(e) => setFormData({...formData, map_url: e.target.value})}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                <IndianRupee size={14} /> Price Per Hour
                            </label>
                            <input 
                                type="number"
                                placeholder="800"
                                required
                                value={formData.price_per_hour}
                                onChange={(e) => setFormData({...formData, price_per_hour: e.target.value})}
                                className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                                <FileText size={14} /> Description
                            </label>
                            <textarea 
                                placeholder="Describe your venue, amenities, rules..."
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
                        disabled={isSubmitting || isUploading}
                        className="w-full py-5 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition transform hover:scale-[1.02] shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:transform-none"
                    >
                        {isSubmitting ? 'Submitting...' : (
                            <>
                                <Plus size={24} /> Submit for Verification
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
