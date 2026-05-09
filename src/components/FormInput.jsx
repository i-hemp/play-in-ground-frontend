export default function FormInput({ label, type, value, onChange, placeholder }) {
    return (
        <div className="space-y-2 mb-5">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">
                {label}
            </label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 outline-none transition placeholder:text-gray-600"
                required
            />
        </div>
    );
}
