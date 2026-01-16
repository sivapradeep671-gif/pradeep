import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import RiskMap from './RiskMap';
import GodownList from './GodownList';
import AnalyticsDashboard from './Analytics/AnalyticsDashboard';
import MovementDashboard from './Movement/MovementDashboard';
import AdminPanel from './Admin/AdminPanel';
import { useNavigate } from 'react-router-dom';
import IncidentManagement from './HQ/IncidentManagement';
import ReportingDashboard from './HQ/ReportingDashboard';
import AuditTrail from './HQ/AuditTrail';
import AddGodownModal from './HQ/AddGodownModal';
import IntegrationsHub from './HQ/IntegrationsHub';

const HQDashboard = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const [showAddGodown, setShowAddGodown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
                        onClick={() => setActiveTab('INCIDENTS')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'INCIDENTS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        ⚠️ Incident Management
                    </button>
                    <button
                        onClick={() => setActiveTab('REPORTS')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'REPORTS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        📊 Reporting & Exports
                    </button>
                    <button
                        onClick={() => setActiveTab('AUDIT')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'AUDIT' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        📜 Audit Ledger
                    </button>
                    <button
                        onClick={() => setActiveTab('INVENTORY')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'INVENTORY' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        {t('inventory')}
                    </button>
                    <button
                        onClick={() => setActiveTab('INTEGRATIONS')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'INTEGRATIONS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        🔗 System Integrations
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
                        onClick={() => {
                            localStorage.removeItem('tncsc_user');
                            localStorage.removeItem('tncsc_role');
                            navigate('/');
                        }}
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
                        {activeTab === 'INCIDENTS' && 'Incident Management'}
                        {activeTab === 'REPORTS' && 'Reporting & Exports'}
                        {activeTab === 'AUDIT' && 'Immutable Audit Ledger'}
                        {activeTab === 'INVENTORY' && t('inventory')}
                        {activeTab === 'INTEGRATIONS' && 'Government System Integrations'}
                        {activeTab === 'MOVEMENT' && (t('stockLogistics') || 'Stock & Logistics')}
                        {activeTab === 'ADMIN' && (t('adminPanel') || 'Administration')}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-slate-600">Sync Active</span>
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
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                            <div className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Total Stock</div>
                                            <div className="text-xl font-black text-slate-800">12,450 MT</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                            <div className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Active Alerts</div>
                                            <div className="text-xl font-black text-amber-600">3 High</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                            <div className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-widest">Weather Alert</div>
                                            <div className="text-xl font-black text-blue-600">Monsoon Onset</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <GodownList />
                                </div>
                            </div>
                        )}
                        {activeTab === 'INCIDENTS' && <IncidentManagement />}
                        {activeTab === 'REPORTS' && <ReportingDashboard />}
                        {activeTab === 'AUDIT' && <AuditTrail />}
                        {activeTab === 'INVENTORY' && (
                            <div className="bg-white rounded-3xl shadow border border-slate-200 overflow-hidden animate-slide-in">
                                <div className="p-8 bg-slate-50/50 border-b flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Storage Network Infrastructure</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time facility status & alert monitoring</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            placeholder="Search facilities..."
                                            className="px-4 py-2 rounded-xl border-2 border-slate-200 text-xs font-bold outline-none focus:border-emerald-500 w-64 transition-all"
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            onClick={() => setShowAddGodown(true)}
                                            className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                                        >
                                            + Register Facility
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <GodownList searchTerm={searchTerm} />
                                </div>
                            </div>
                        )}
                        {showAddGodown && (
                            <AddGodownModal
                                onClose={() => setShowAddGodown(false)}
                                onSave={() => {
                                    setShowAddGodown(false);
                                    // Normally trigger a refresh here
                                }}
                            />
                        )}
                        {activeTab === 'INTEGRATIONS' && <IntegrationsHub />}
                        {activeTab === 'MOVEMENT' && <MovementDashboard />}
                        {activeTab === 'ADMIN' && <AdminPanel />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HQDashboard;
