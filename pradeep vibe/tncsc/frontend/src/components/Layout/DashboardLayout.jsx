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
    LogOut,
    Globe // Added Globe icon
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext'; // Import context

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
    const { language, toggleLanguage, t } = useLanguage(); // Use localized strings

    const navItems = [
        { icon: LayoutDashboard, label: 'navOverview', path: '/dashboard/overview' },
        { icon: Network, label: 'navNetwork', path: '/dashboard/network' },
        { icon: Package, label: 'navInventory', path: '/dashboard/inventory' },
        { icon: Bell, label: 'navAlerts', path: '/dashboard/alerts' },
        { icon: BarChart3, label: 'navAnalytics', path: '/dashboard/analytics' },
        { icon: Settings, label: 'navSettings', path: '/dashboard/settings' },
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
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg"
                        alt="TN Emblem"
                        className="w-10 h-10"
                    />
                    <div>
                        <h1 className="font-bold text-slate-900 leading-none">RiskGuard</h1>
                        <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-bold mt-1">{t('govtTN')}</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.path}
                            icon={item.icon}
                            label={t(item.label)}
                            path={item.path}
                            isActive={location.pathname === item.path}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}


                    <div className="p-4 border-t bg-slate-50 mt-auto">
                        {/* Language Switcher - Clean UI */}
                        <div className="flex bg-white rounded-lg p-1 border border-slate-200 mb-4 shadow-sm">
                            <button
                                onClick={() => language !== 'en' && toggleLanguage()}
                                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${language === 'en' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => language !== 'ta' && toggleLanguage()}
                                className={`flex-1 text-xs font-bold py-1.5 rounded-md transition-all ${language === 'ta' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
                            >
                                தமிழ்
                            </button>
                        </div>

                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 border border-slate-300">
                                <User size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-sm text-slate-900 truncate">Regional Manager</p>
                                <p className="text-xs text-slate-500 truncate">Thanjavur Region</p>
                            </div>
                        </div>
                        <button className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 w-full px-2 py-1.5 rounded hover:bg-red-50 transition-colors font-bold">
                            <LogOut size={16} />
                            <span>{t('signOut')}</span>
                        </button>
                    </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
                <header className="hidden md:flex bg-white border-b h-16 items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-slate-800">
                        {t(navItems.find(i => i.path === location.pathname)?.label || 'dashboard')}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500">Last updated: Today, 10:30 AM</span>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200 text-sm font-medium"
                        >
                            <Globe size={16} />
                            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
                        </button>
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
