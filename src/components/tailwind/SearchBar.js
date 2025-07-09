'use client';

export default function SearchBar({ searchQuery, onSearchChange, placeholder = "Quick Search" }) {
  return (
    <div className="flex justify-end mb-3">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full sm:w-64 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}
