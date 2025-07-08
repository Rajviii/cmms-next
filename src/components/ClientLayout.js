'use client';
import Sidebar from "@/components/Sidebar";
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Badge, BadgeContainer, Loader, Skeleton } from '@progress/kendo-react-indicators';
import { SvgIcon } from '@progress/kendo-react-common';
import { bellIcon, checkIcon } from '@progress/kendo-svg-icons';

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

          <div className="row">
            <div className="col-4">
              <BadgeContainer>
                <SvgIcon icon={bellIcon} />
                <Badge themeColor="info">99+</Badge>
              </BadgeContainer>
            </div>
            
            {/* <div className="col-4 d-flex flex-column align-items-center">
              <Skeleton shape="circle" style={{
                width: 50,
                height: 50
              }} />
            </div> */}
          </div>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
