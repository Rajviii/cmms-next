'use client';
import { FaFilter, FaBookmark } from 'react-icons/fa';

export default function FilterBar() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button className="flex items-center gap-2 bg-white text-sm text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
        <FaFilter className="text-gray-600" />
        Filter
      </button>

      <button className="flex items-center gap-2 bg-white text-sm text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-100 transition">
        <FaBookmark className="text-gray-600" />
        Saved
      </button>
    </div>
  );
}