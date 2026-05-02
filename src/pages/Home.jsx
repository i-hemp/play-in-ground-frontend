import { Link } from 'react-router-dom';
import { 
    Calendar, 
    Zap, 
    ShieldCheck, 
    ArrowRight, 
    Users,
    MapPin,
    Trophy
} from 'lucide-react';

function Home() {
    return (
        <div className="bg-gray-900 text-white overflow-hidden">
            {/* Hero Section */}
            <header className="relative py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10 space-y-8 animate-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                            <Zap className="text-green-500" size={16} />
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Instant Booking Live</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                            Book Your <span className="text-green-500">Perfect Game</span> In Seconds.
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                            The ultimate platform to discover, book, and manage your favorite sports venues. No more phone calls. No more confusion. Just play.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link 
                                to="/grounds" 
                                className="px-10 py-5 bg-green-500 text-black font-black rounded-3xl hover:bg-green-400 transition transform hover:scale-105 shadow-2xl shadow-green-500/20 flex items-center justify-center gap-2"
                            >
                                Browse Grounds <ArrowRight size={20} />
                            </Link>
                            <Link 
                                to="/auth" 
                                className="px-10 py-5 bg-gray-800 text-white font-bold rounded-3xl hover:bg-gray-700 transition flex items-center justify-center"
                            >
                                Register Now
                            </Link>
                        </div>
                        
                        <div className="flex items-center gap-8 pt-6 border-t border-gray-800">
                            <div>
                                <p className="text-2xl font-black">50+</p>
                                <p className="text-gray-500 text-sm">Premium Venues</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black">10k+</p>
                                <p className="text-gray-500 text-sm">Active Players</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black">4.9/5</p>
                                <p className="text-gray-500 text-sm">User Rating</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative animate-in zoom-in duration-1000">
                        {/* Abstract Hero Visualization */}
                        <div className="relative rounded-[3rem] overflow-hidden border border-gray-700 shadow-2xl group">
                            <img 
                                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                                alt="Sports Ground" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent"></div>
                            
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase font-bold text-green-500 mb-1">Featured Venue</p>
                                        <p className="text-xl font-bold">Champions Arena</p>
                                    </div>
                                    <p className="text-lg font-black text-white">₹800/hr</p>
                                </div>
                            </div>
                        </div>
                        {/* Stats Floating Card */}
                        <div className="absolute -top-10 -right-10 bg-gray-800 border border-gray-700 p-6 rounded-3xl shadow-3xl hidden md:block animate-bounce-slow">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-black">
                                    <Trophy size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Expert Choice</p>
                                    <p className="font-black text-white">Top Rated-2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-gray-800/30 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black">Why PlayInGround?</h2>
                        <p className="text-gray-400">Everything you need to organize your game and keep your squad active.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                title: "Instant Booking", 
                                desc: "No back-and-forth calls. See real-time availability and confirm your slot in two clicks.", 
                                icon: Calendar,
                                color: "text-blue-500",
                                bg: "bg-blue-500/10"
                            },
                            { 
                                title: "Premium Venues", 
                                desc: "Discover high-quality turfs, courts, and pitches curated for the best playing experience.", 
                                icon: MapPin,
                                color: "text-green-500",
                                bg: "bg-green-500/10"
                            },
                            { 
                                title: "Verified Owners", 
                                desc: "Join a secure community where every venue is verified for quality and safety.", 
                                icon: ShieldCheck,
                                color: "text-purple-500",
                                bg: "bg-purple-500/10"
                            }
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="bg-gray-800/50 p-10 rounded-[3rem] border border-gray-700/50 hover:border-green-500/30 transition-all group">
                                    <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-black">Ready to Kick Off?</h2>
                        <p className="text-black/70 text-xl font-bold max-w-xl">
                            Join over 10,000 players who have simplified their game discovery. Your next session is just a click away.
                        </p>
                        <Link 
                            to="/grounds" 
                            className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-black rounded-2xl hover:bg-gray-900 transition transform hover:scale-105 shadow-2xl"
                        >
                            Start Exploring <ArrowRight size={24} />
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
                </div>
            </section>
        </div>
    );
}

export default Home;
