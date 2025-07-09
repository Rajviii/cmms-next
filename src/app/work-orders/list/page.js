'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSort } from '@/hooks/useSort';
import SearchBar from '@/components/tailwind/SearchBar';
import CustomTable from '@/components/tailwind/CustomTable';
import CustomPagination from '@/components/tailwind/CustomPagination';
import FilterSaved from '@/components/tailwind/FilterSaved';

const filtersMeta = [
  { key: 'status', label: 'Status', options: ['Open', 'Closed', 'In Progress'] },
  { key: 'priority', label: 'Priority', options: ['High', 'Medium', 'Low'] },
  { key: 'division', label: 'Division', options: ['North', 'South', 'East', 'West'] },
];

export default function WOList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [columns, setColumns] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const pageSize = 10;

  const { sortConfig, requestSort } = useSort();

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/work-orders', {
        params: {
          search: searchQuery,
          sort: sortConfig?.key,
          order: sortConfig?.direction,
          page: currentPage,
          pageSize,
          ...activeFilters,
        },
      });

      const fetchedData = res.data.data;
      setData(fetchedData);
      setTotalItems(res.data.total);

      if (fetchedData.length > 0) {
        const generatedCols = Object.keys(fetchedData[0]).map((key) => ({
          key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
        }));
        setColumns(generatedCols);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage, sortConfig, activeFilters]);

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
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
          />

          {Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap gap-2 px-2">
              {Object.entries(activeFilters).map(([key, value]) => {
                const label = filtersMeta.find((f) => f.key === key)?.label || key;
                return (
                  <span
                    key={key}
                    className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {label}: {value}
                    <button
                      onClick={() => {
                        const updatedFilters = { ...activeFilters };
                        delete updatedFilters[key];
                        setActiveFilters(updatedFilters);
                        setCurrentPage(1);
                      }}
                      className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          <CustomTable
            columns={columns}
            data={data}
            onSort={requestSort}
            sortConfig={sortConfig}
          />

          <CustomPagination
            currentPage={currentPage}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}