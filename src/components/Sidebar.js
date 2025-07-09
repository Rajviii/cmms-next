import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@progress/kendo-react-buttons";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const { logout } = useAuth();
    const pathname = usePathname();
    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Tasks', path: '/tasks' },
        { name: 'Work Orders', path: '/work-orders' },
        { name: 'Proposals', path: '/proposals' },
        { name: 'Parts', path: '/parts' },
        { name: 'Clients', path: '/clients' },
        { name: 'Vendors', path: '/vendors' },
        { name: 'Accounting', path: '/accounting' },
        { name: 'Reports', path: '/reports' },
        { name: 'Settings', path: '/settings' },
        { name: 'Kendo UI', path: '/kendo-ui' },
        { name: 'Tailwind UI', path: '/tailwind-ui' }
    ]

    const handleLogout = () => {
       logout();
    }

    return (
        <>
            <div className={`fixed inset-0 z-40 bg-opacity-30 transition-opacity md:hidden 
                ${isOpen ? 'block' : 'hidden'}`}
                onClick={toggleSidebar} />

            <aside className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white z-50 transform transition-transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
                <div className="text-2xl font-bold px-6 py-4 border-b border-blue-700">
                    CMMS
                </div>

                <nav className="mt-4 space-y-2 px-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`block px-4 py-2 rounded text-sm hover:bg-blue-700 transition 
                                ${pathname === item.path ? 'bg-blue-700' : ''}`}
                            onClick={toggleSidebar}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-4 w-full px-4 flex items-center justify-center">
                    <Button onClick={handleLogout} themeColor="primary">Logout</Button>
                </div>
            </aside>
        </>
    )
}