export default function GroundCard({ ground, onClick }) {
    return (
        <div
            onClick={() => onClick(ground)}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
        >
            <img
                src={ground.image_url}
                alt={ground.name}
                className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold">{ground.name}</h3>
            <p className="text-gray-400">{ground.place}</p>
            <p className="text-yellow-400 mt-2">₹{ground.price_per_hour} / hr</p>
        </div>
    );
}
