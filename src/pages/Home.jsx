import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen bg-gray-900 text-white font-sans">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Hero Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/assets/hero-banner.png" 
                        alt="Sports Ground Banner" 
                        className="w-full h-full object-cover transform scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        Elevate Your <span className="text-green-500">Game</span>. <br />
                        Anytime, Anywhere.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        The ultimate platform to book premium playgrounds, find teammates, and build your local sports community.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={() => navigate("/grounds")}
                            className="w-full sm:w-auto px-8 py-4 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition transform hover:scale-105 shadow-xl shadow-green-500/20"
                        >
                            Explore Grounds
                        </button>
                        <button 
                            onClick={() => navigate("/auth")}
                            className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition transform hover:scale-105"
                        >
                            Join PlayInGround
                        </button>
                    </div>
                </div>
            </section>

            {/* Features / Why Us */}
            <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-800">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose PlayInGround?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Experience sports booking like never before with our state-of-the-art platform features.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            title: "Visual Slot Grid",
                            description: "No more guessing. See real-time availability with our human-friendly booking grid.",
                            icon: "📅"
                        },
                        {
                            title: "Verified Venues",
                            description: "Every ground is quality-checked to ensure you have the best playing experience.",
                            icon: "⭐"
                        },
                        {
                            title: "Instant Confirmation",
                            description: "Get your booking confirmed instantly. No more waiting for callbacks or long queues.",
                            icon: "⚡"
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition duration-300 group">
                            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-gray-900 via-green-900/10 to-gray-900">
                <div className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-gray-800/80 border border-gray-700 text-center backdrop-blur-xl">
                    <h2 className="text-4xl font-bold mb-6">Ready to play?</h2>
                    <p className="text-xl text-gray-300 mb-10">Join thousands of players in your city and start your winning streak today.</p>
                    <button 
                         onClick={() => navigate("/grounds")}
                        className="px-10 py-4 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition transform hover:scale-105"
                    >
                        Book Your First Slot
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Home;
