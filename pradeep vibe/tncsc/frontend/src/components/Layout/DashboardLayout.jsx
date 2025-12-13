import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Network,
    Package,
    Bell,
    BarChart3,
    Settings,
    Menu,
    X,
    User,
    LogOut
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, isActive, onClick }) => (
    <Link
        to={path}
        onClick={onClick}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </Link>
);

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
        { icon: Network, label: 'Godown Network', path: '/dashboard/network' },
        { icon: Package, label: 'Inventory & Aging', path: '/dashboard/inventory' },
        { icon: Bell, label: 'Alerts & Tasks', path: '/dashboard/alerts' },
        { icon: BarChart3, label: 'Impact Analytics', path: '/dashboard/analytics' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b p-4 flex justify-between items-center z-20">
                <div className="flex items-center space-x-2">
                    {/* Placeholder Logo */}
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                        T
                    </div>
                    <span className="font-bold text-slate-800">TNCSC RiskGuard</span>
                </div>
                <button onClick={toggleSidebar} className="p-2 text-slate-600 hover:bg-slate-100 rounded">
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 inset-y-0 left-0 w-64 bg-white border-r z-40 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } h-screen flex flex-col`}
            >
                <div className="p-6 border-b flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
                        T
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 leading-tight">TNCSC RiskGuard</h1>
                        <p className="text-xs text-slate-500">Civil Supplies Corp.</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                            isActive={location.pathname === item.path}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t bg-slate-50">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                            <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm text-slate-900 truncate">Regional Manager</p>
                            <p className="text-xs text-slate-500 truncate">Thanjavur Region</p>
                        </div>
                    </div>
                    <button className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 w-full px-2 py-1 rounded hover:bg-red-50 transition-colors">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
                <header className="hidden md:flex bg-white border-b h-16 items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500">Last updated: Today, 10:30 AM</span>
                    </div>
                </header>
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
