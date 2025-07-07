'use client';
import Sidebar from "@/components/Sidebar";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const hideLayout = pathname === '/login';

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col w-full">
        <header className="sticky top-0 z-30 bg-white shadow px-4 py-3 flex items-center justify-between md:justify-end">
          <button
            onClick={toggleSidebar}
            className="text-blue-700 text-2xl md:hidden"
            aria-label="Toggle Menu"
          >
            <HiOutlineMenuAlt3 />
          </button>
          <div className="font-semibold text-sm md:text-base">Welcome to CMMS</div>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
