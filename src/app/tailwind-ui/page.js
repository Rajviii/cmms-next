'use client';

import { useState } from 'react';
import { useSort } from '@/hooks/useSort';
import SearchBar from '@/components/tailwind/SearchBar';
import CustomTable from '@/components/tailwind/CustomTable';
import CustomPagination from '@/components/tailwind/CustomPagination';

const originalData = new Array(100).fill(null).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

export default function TailwindUI() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { sortConfig, sortedData, requestSort } = useSort();

  const filteredData = originalData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const finalData = sortedData(filteredData);

  const paginatedData = finalData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-4">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

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
  );
}
