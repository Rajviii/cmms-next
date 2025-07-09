'use client';

import { useState } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export default function FilterSaved({ filters = [], onFilterChange }) {
  const [showFilters, setShowFilters] = useState('filter');
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleDropdownChange = (fieldKey, value) => {
    const updated = {
      ...selectedFilters,
      [fieldKey]: value,
    };
    setSelectedFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="w-full">
      <div className="flex justify-start items-center flex-wrap gap-3 mb-4 p-2 mt-4">
        <button
          onClick={() => setShowFilters('filter')}
          className="rounded bg-indigo-600 px-3 py-1.5 text-white text-sm hover:bg-indigo-700"
        >
          Filter
        </button>
        <button 
        onClick={() => setShowFilters('saved')}
        className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100">
          Saved
        </button>
      </div>

      {showFilters === 'filter' ? (
        <div className="flex flex-col gap-4 sm:w-72 w-full mb-4">
          {filters.map((filter) => (
            <div key={filter.key}>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                {filter.label}
              </label> */}
              <DropDownList
                style={{ width: '100%' }}
                data={filter.options}
                defaultValue={filter.options[0]}
                onChange={(e) => handleDropdownChange(filter.key, e.value)}
              />
            </div>
          ))}
        </div>
      ) : (
        <>Some UI of Saved</>
      )}
    </div>
  );
}
