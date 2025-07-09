'use client';

import CardComponent from "@/components/dummy/CardComponent";
import CustomBreadcrumb from "@/components/dummy/CustomBreadcrum";
import CustomDialog from "@/components/dummy/CustomDialog";
import CustomDropdowns from "@/components/dummy/CustomDropdowns";
import CustomNotification from "@/components/dummy/CustomNotification";
import CustomToolTip from "@/components/dummy/CustomToolTip";
import InputFields from "@/components/dummy/InputFields";
import { Button } from "@progress/kendo-react-buttons";
import { SvgIcon } from "@progress/kendo-react-common";
import { paletteIcon } from '@progress/kendo-svg-icons';
import { useState } from "react";

const mockWorkOrders = [
  {
    id: 'WO-001',
    client: 'ABC Corp',
    status: 'Open',
    manager: 'John Doe',
    priority: 'High',
    date: '2025-07-10'
  },
  {
    id: 'WO-002',
    client: 'XYZ Ltd',
    status: 'In Progress',
    manager: 'Jane Smith',
    priority: 'Medium',
    date: '2025-07-15'
  }
];

export default function WOList() {
  const [search, setSearch] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [notification, setNotification] = useState(null);

  const filteredOrders = mockWorkOrders.filter(order =>
    order.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <CustomBreadcrumb />

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search by client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />

        <CustomDropdowns label="Status" />
        <CustomDropdowns label="Priority" />
        <Button onClick={() => setNotification('Search executed')} themeColor="primary">Search</Button>
      </div>

      <div className="overflow-x-auto border rounded-md shadow">
        <table className="min-w-[600px] w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">WO #</th>
              <th className="p-2 border">Client</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Manager</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="even:bg-gray-50">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.client}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.manager}</td>
                <td className="p-2 border">{order.priority}</td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border space-x-2">
                  <Button themeColor="info" size="small">View</Button>
                  <Button themeColor="warning" size="small">Edit</Button>
                  <Button themeColor="error" size="small" onClick={() => setShowDialog(true)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <CustomToolTip />
      </div>

      {showDialog && (
        <CustomDialog
          message="Are you sure you want to delete this Work Order?"
          onConfirm={() => {
            setShowDialog(false);
            setNotification('Work Order deleted!');
          }}
          onCancel={() => setShowDialog(false)}
        />
      )}

      {notification && (
        <CustomNotification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
