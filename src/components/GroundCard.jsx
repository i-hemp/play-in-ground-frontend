export default function GroundCard({ ground, onClick }) {
    return (
        <div
            onClick={() => onClick(ground)}
            className="group bg-gray-800 rounded-[2rem] overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-green-500/10 flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={ground.image_url}
                    alt={ground.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-60"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="text-green-400 font-bold">₹{ground.price_per_hour}</span>
                    <span className="text-gray-400 text-xs ml-1">/ hr</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                    {ground.sport_types?.slice(0, 3).map((sport, idx) => (
                        <span 
                            key={idx} 
                            className="text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded-md bg-green-500/10 text-green-500 border border-green-500/20"
                        >
                            {sport}
                        </span>
                    ))}
                    {ground.sport_types?.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-bold">+{ground.sport_types.length - 3} more</span>
                    )}
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">{ground.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                    📍 {ground.place}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-700/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Details</span>
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors">
                        →
                    </div>
                </div>
            </div>
        </div>
    );
}
