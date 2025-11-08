import { useEffect, useState } from "react";
import GroundCard from "../components/GroundCard";
import { fetchGrounds } from "../lib/api";

export default function GroundsPage() {
  const [grounds, setGrounds] = useState([]);
  const [selectedGround, setSelectedGround] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchGrounds();
      setGrounds(data);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Available Playgrounds</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {grounds.map((g) => (
          <GroundCard key={g.id} ground={g} onClick={setSelectedGround} />
        ))}
      </div>

      {selectedGround && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={() => setSelectedGround(null)}  
        >
          <div
            className="bg-gray-900 p-6 rounded-xl w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()}  // Prevent closing
          >
            <h2 className="text-2xl font-bold mb-2">{selectedGround.name}</h2>
            <p className="text-gray-400">{selectedGround.place}</p>
            <p className="text-yellow-400 mt-2">₹{selectedGround.price_per_hour} / hr</p>
            <p className="mt-4 text-gray-300">{selectedGround.description || "No description available."}</p>

            <button
              onClick={() => setSelectedGround(null)}
              className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
