'use client';
import { usePathname, useRouter } from 'next/navigation';
import FilterBar from '@/components/FilterBar';

export default function WorkOrderLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: 'Work Orders', path: '/work-orders/list' },
    { name: 'Program', path: '/work-orders/program' },
    { name: 'Projects', path: '/work-orders/projects' },
    { name: 'Schedules', path: '/work-orders/schedules' },
    { name: 'Map', path: '/work-orders/map' },
    { name: 'Reports', path: '/work-orders/reports' },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`px-4 py-2 rounded-t-md text-sm font-medium transition ${
              pathname === tab.path
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <FilterBar />
      <div className="bg-white rounded shadow p-4 mt-4">
        {children}
      </div>
    </div>
  );
}
