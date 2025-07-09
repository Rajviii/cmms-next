'use client';

import { useState, useRef } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

export default function CustomTable({ columns, data, onSort, sortConfig }) {
  const [columnWidths, setColumnWidths] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: 200 }), {})
  );

  const resizerRefs = useRef({});

  const handleMouseDown = (e, key) => {
    const startX = e.clientX;
    const startWidth = columnWidths[key];

    const onMouseMove = (e) => {
      const delta = e.clientX - startX;
      setColumnWidths((prev) => ({
        ...prev,
        [key]: Math.max(100, startWidth + delta),
      }));
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm mb-4">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: columnWidths[col.key] }}
                className="relative px-4 py-2 font-medium select-none group"
              >
                <div
                  className="flex items-center cursor-pointer justify-between"
                  onClick={() => onSort(col.key)}
                >
                  {col.label}
                  {getSortIcon(col.key)}
                </div>
                <div
                  ref={(el) => (resizerRefs.current[col.key] = el)}
                  onMouseDown={(e) => handleMouseDown(e, col.key)}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-indigo-500"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-400">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
