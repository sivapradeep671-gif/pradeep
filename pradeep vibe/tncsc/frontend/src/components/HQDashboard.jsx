import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import RiskMap from './RiskMap';
import GodownList from './GodownList';
import AnalyticsDashboard from './Analytics/AnalyticsDashboard';
import MovementDashboard from './Movement/MovementDashboard';
import AdminPanel from './Admin/AdminPanel';
import { useNavigate } from 'react-router-dom';

const HQDashboard = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('OVERVIEW');

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg" alt="TN Emblem" className="w-10 h-10 brightness-200 grayscale opacity-80" />
                    <div>
                        <h1 className="text-sm font-extrabold tracking-tight text-white leading-tight">{t('tncscFull')}</h1>
                        <p className="text-[10px] text-emerald-500 mt-1 uppercase tracking-wider font-bold">Risk Command Center</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('OVERVIEW')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'OVERVIEW' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        {t('dashboard')}
                    </button>
                    <button
                        onClick={() => setActiveTab('INVENTORY')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'INVENTORY' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        {t('inventory')}
                    </button>
                    <button
                        onClick={() => setActiveTab('ANALYTICS')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ANALYTICS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        {t('analytics')}
                    </button>
                    <button
                        onClick={() => setActiveTab('MOVEMENT')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'MOVEMENT' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        {t('stockLogistics') || 'Stock & Logistics'}
                    </button>
                    <button
                        onClick={() => setActiveTab('ADMIN')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'ADMIN' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        {t('adminPanel') || 'Administration'}
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={toggleLanguage}
                        className="w-full mb-3 px-4 py-2 bg-slate-800 rounded-lg text-xs font-bold text-slate-300 hover:text-white border border-slate-700"
                    >
                        {language === 'en' ? 'Switch to Tamil (தமிழ்)' : 'Switch to English'}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-400 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
                    >
                        <span>←</span> {t('signOut')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
                {/* Header */}
                <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h2 className="text-lg font-bold text-slate-800">
                        {activeTab === 'OVERVIEW' && t('riskMap')}
                        {activeTab === 'INVENTORY' && t('inventory')}
                        {activeTab === 'INVENTORY' && t('inventory')}
                        {activeTab === 'ANALYTICS' && t('analytics')}
                        {activeTab === 'MOVEMENT' && (t('stockLogistics') || 'Stock & Logistics')}
                        {activeTab === 'ADMIN' && (t('adminPanel') || 'Administration')}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-slate-600">System Online</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow flex items-center justify-center font-bold text-slate-500 text-xs">
                            HQ
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-8 relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                    <div className="max-w-7xl mx-auto relative z-0">
                        {activeTab === 'OVERVIEW' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <RiskMap />
                                    {/* Quick Stats Row */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="text-xs text-slate-500 mb-1">Total Stock</div>
                                            <div className="text-xl font-bold text-slate-800">12,450 MT</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="text-xs text-slate-500 mb-1">Active Alerts</div>
                                            <div className="text-xl font-bold text-amber-600">3 High</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="text-xs text-slate-500 mb-1">Weather</div>
                                            <div className="text-xl font-bold text-blue-600">Raining</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <GodownList />
                                </div>
                            </div>
                        )}
                        {activeTab === 'INVENTORY' && (
                            <div className="bg-white rounded-xl shadow border border-slate-200 p-6 min-h-[500px]">
                                <h3 className="text-lg font-bold mb-4">Godown Network Inventory</h3>
                                <GodownList />
                            </div>
                        )}
                        {activeTab === 'ANALYTICS' && (
                            <AnalyticsDashboard />
                        )}
                        {activeTab === 'MOVEMENT' && <MovementDashboard />}
                        {activeTab === 'ADMIN' && <AdminPanel />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HQDashboard;
