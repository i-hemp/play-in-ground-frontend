import { Mail, Phone, MapPin, Send, Trophy, Users, Target } from 'lucide-react';

function Contact() {
    return (
        <div className="bg-gray-900 text-white pb-20">
            <div className="max-w-7xl mx-auto px-6 pt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Left: Info */}
                    <div className="space-y-12 animate-in slide-in-from-left duration-700">
                        <div className="space-y-4">
                            <h1 className="text-6xl font-black tracking-tighter">Get In <span className="text-green-500">Touch.</span></h1>
                            <p className="text-xl text-gray-400 max-w-md">
                                Have questions about a venue or need help with a booking? Our squad is on standby 24/7.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-1">Email Us</p>
                                    <p className="text-xl font-bold">support@aaa.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-1">Call Us</p>
                                    <p className="text-xl font-bold">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="w-14 h-14 bg-gray-800 border border-gray-700 rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-1">Office</p>
                                    <p className="text-xl font-bold">AAA, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 space-y-6">
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Follow the game</p>
                            <div className="flex gap-4">
                                {[Trophy, Users, Target].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center hover:text-green-500 hover:border-green-500 transition-colors">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="relative animate-in slide-in-from-right duration-700">
                        <div className="bg-gray-800/50 border border-gray-700/50 backdrop-blur-xl p-10 md:p-14 rounded-[4rem] shadow-2xl relative z-10">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Name</label>
                                        <input type="text" placeholder="Rahul" className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Email</label>
                                        <input type="email" placeholder="rahul@example.com" className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Message</label>
                                    <textarea rows="5" placeholder="How can we help you?" className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition resize-none"></textarea>
                                </div>
                                <button className="w-full py-5 bg-green-500 text-black font-black rounded-3xl hover:bg-green-400 transition transform hover:scale-[1.02] shadow-xl shadow-green-500/20 flex items-center justify-center gap-3">
                                    Send Message <Send size={20} />
                                </button>
                            </form>
                        </div>
                        {/* Background Decor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/5 blur-[120px] rounded-full -z-10"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Contact;
