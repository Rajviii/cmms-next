'use client';

import { useState } from 'react';
import { useSort } from '@/hooks/useSort';
import SearchBar from '@/components/tailwind/SearchBar';
import CustomTable from '@/components/tailwind/CustomTable';
import CustomPagination from '@/components/tailwind/CustomPagination';
import FilterSaved from '@/components/tailwind/FilterSaved';

const filtersMeta = [
  { key: 'role', label: 'Role', options: ['User', 'Admin', 'Editor'] },
  { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
  { key: 'extra', label: 'Extra', options: ['extra 1', 'extra 2', 'extra 3'] },
  { key: 'extra2', label: 'Extra 2', options: ['extra 4', 'extra 5'] },
];

const originalData = new Array(100).fill(null).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? 'Admin' : 'User',
  status: i % 3 === 0 ? 'Inactive' : 'Active',
}));

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

export default function TailwindUI() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const pageSize = 10;

  const { sortConfig, sortedData, requestSort } = useSort();

  const filteredData = originalData.filter((item) => {
    const matchesSearch = Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesFilters = Object.entries(activeFilters).every(
      ([key, value]) => item[key] === value
    );

    return matchesSearch && matchesFilters;
  });

  const finalData = sortedData(filteredData);

  const paginatedData = finalData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex-1 p-4">
        <FilterSaved
          filters={filtersMeta}
          onFilterChange={(filters) => {
            setActiveFilters(filters);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex-[2_1_60%] p-4">
        <div className="flex flex-col gap-2">
          <div className="p-2">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
            />
          </div>

          {Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap gap-2 px-2">
              {Object.entries(activeFilters).map(([key, value]) => {
                const label = filtersMeta.find((f) => f.key === key)?.label || key;
                return (
                  <span
                    key={key}
                    className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {label}: {value}
                    <button
                      onClick={() => {
                        const updatedFilters = { ...activeFilters };
                        delete updatedFilters[key];
                        setActiveFilters(updatedFilters);
                        setCurrentPage(1);
                      }}
                      className="ml-2 text-indigo-500 hover:text-indigo-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <div className="p-2">
            <CustomTable
              columns={columns}
              data={paginatedData}
              onSort={requestSort}
              sortConfig={sortConfig}
            />

            <CustomPagination
              currentPage={currentPage}
              totalItems={finalData.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
