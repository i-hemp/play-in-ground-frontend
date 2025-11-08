export default function GroundCard({ ground, onClick }) {
  return (
    <div
      onClick={() => onClick(ground)} 
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={ground.image_url}
        alt={ground.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{ground.name}</h2>
        <p className="text-sm text-gray-400">{ground.place}</p>
        <p className="mt-2 text-yellow-400">₹{ground.price_per_hour} / hr</p>
      </div>
    </div>
  );
}
