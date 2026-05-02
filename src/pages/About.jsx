import { Trophy, Users, Shield, Target } from 'lucide-react';

function About() {
    const stats = [
        { label: 'Founded', value: '2023', icon: Trophy },
        { label: 'Active Players', value: '10,000+', icon: Users },
        { label: 'Partner Venues', value: '150+', icon: Target },
        { label: 'Verified Safely', value: '100%', icon: Shield },
    ];

    return (
        <div className="bg-gray-900 text-white pb-20">
            {/* Split Hero */}
            <header className="relative pt-24 pb-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-700">
                        <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
                            More Than <br/>
                            <span className="text-green-500">Just A Game.</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                            PlayInGround was born from a simple frustration: it shouldn't be hard to find a place to play. We're building the world's most accessible sports infrastructure platform, connecting players to venues in seconds.
                        </p>
                    </div>
                    <div className="flex-1 relative animate-in slide-in-from-right duration-700">
                        <div className="aspect-square rounded-[4rem] overflow-hidden border border-gray-700 shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                            <img 
                                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                alt="Athletes" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <section className="px-6 mb-32">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-gray-800/50 border border-gray-700/50 p-8 rounded-[3rem] text-center hover:border-green-500/30 transition-colors">
                                <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Icon size={24} />
                                </div>
                                <p className="text-3xl font-black text-white mb-2">{stat.value}</p>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-500">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Values */}
            <section className="bg-gray-800/30 py-24 border-y border-gray-800 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div className="space-y-12">
                            <h2 className="text-4xl font-black">Our Mission</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-black flex items-center justify-center font-bold">1</div>
                                    <p className="text-gray-400 font-medium">Democratize access to sports facilities for everyone, from amateurs to world-class athletes.</p>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-black flex items-center justify-center font-bold">2</div>
                                    <p className="text-gray-400 font-medium">Empower ground owners with tools to digitize their business and reach more players.</p>
                                </div>
                                <div className="flex gap-6">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-black flex items-center justify-center font-bold">3</div>
                                    <p className="text-gray-400 font-medium">Build a community where every 'game' is just a few taps away.</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-900 border border-gray-700 p-12 rounded-[4rem] relative overflow-hidden">
                            <h2 className="text-3xl font-bold mb-6">Ready to join the movement?</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">Whether you're a player looking for a court or an owner looking to grow, PlayInGround is your partner on the field.</p>
                            <button className="px-10 py-4 bg-green-500 text-black font-black rounded-2xl hover:bg-green-400 transition transform hover:scale-105 shadow-xl shadow-green-500/20">
                                Get Started
                            </button>
                            <div className="absolute top-0 right-0 p-8 text-gray-800">
                                <Trophy size={100} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
