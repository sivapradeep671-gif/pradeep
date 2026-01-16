import React, { useState } from 'react';
import {
    Search,
    Filter,
    ChevronRight,
    ArrowUpDown,
    Map as MapIcon,
    Table,
    AlertCircle,
    CheckCircle2,
    Clock,
    Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockDistricts } from '../../data/mockDistricts';

const DistrictDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'map'
    const [filterRisk, setFilterRisk] = useState('All');

    const filteredDistricts = mockDistricts.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.hq.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRisk = filterRisk === 'All' ||
            (filterRisk === 'High' && d.risk > 70) ||
            (filterRisk === 'Medium' && d.risk > 40 && d.risk <= 70) ||
            (filterRisk === 'Low' && d.risk <= 40);
        return matchesSearch && matchesRisk;
    });

    const getRiskColor = (score) => {
        if (score > 70) return 'text-red-600 bg-red-50 border-red-200';
        if (score > 40) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-green-600 bg-green-50 border-green-200';
    };

    const getRiskStatus = (score) => {
        if (score > 70) return 'High';
        if (score > 40) return 'Medium';
        return 'Low';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">District-wise RiskGuard Coverage</h1>
                    <p className="text-slate-500 text-sm">Real-time metrics and risk assessment across all 38 districts of Tamil Nadu.</p>
                </div>
                <div className="flex bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                    <button
                        onClick={() => setViewMode('table')}
                        className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Table size={16} />
                        <span>Table View</span>
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`flex items-center space-x-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <MapIcon size={16} />
                        <span>Map View</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search district or headquarters..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {['All', 'High', 'Medium', 'Low'].map((risk) => (
                        <button
                            key={risk}
                            onClick={() => setFilterRisk(risk)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all whitespace-nowrap ${filterRisk === risk ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                        >
                            {risk} Risk
                        </button>
                    ))}
                </div>
            </div>

            {viewMode === 'table' ? (
                /* Table View */
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium">
                                <tr>
                                    <th className="px-6 py-4 border-b">District / HQ</th>
                                    <th className="px-6 py-4 border-b">Risk Score</th>
                                    <th className="px-6 py-4 border-b">Active Alerts</th>
                                    <th className="px-6 py-4 border-b text-right">Stock Level</th>
                                    <th className="px-6 py-4 border-b text-right">Tot. FPS</th>
                                    <th className="px-6 py-4 border-b">Last Updated</th>
                                    <th className="px-6 py-4 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredDistricts.map((d) => (
                                    <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{d.name}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <Clock size={10} /> HQ: {d.hq}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getRiskColor(d.risk)}`}>
                                                    {getRiskStatus(d.risk)}
                                                </span>
                                                <span className="font-mono font-bold text-slate-700">{d.risk}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.alerts > 5 ? (
                                                <div className="flex items-center text-red-600 font-medium gap-1">
                                                    <AlertCircle size={14} /> {d.alerts} Alerts
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-slate-600 gap-1">
                                                    {d.alerts > 0 ? <AlertCircle size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
                                                    {d.alerts} Alerts
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-slate-700">{d.stock}%</span>
                                                <div className="w-20 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${d.stock < 60 ? 'bg-amber-500' : 'bg-green-500'}`}
                                                        style={{ width: `${d.stock}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-600">{d.fps.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-slate-400 text-xs italic">Just Now</td>
                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/dashboard/district/${d.id}`}
                                                className="flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            >
                                                <ChevronRight size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Map View Placeholder */
                <div className="bg-slate-900 rounded-xl border border-slate-700 min-h-[600px] relative p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 800 1000" fill="none">
                            <path d="M400,100 L450,150 L420,200 L500,250 L480,300 L550,400 L500,500 L400,600 L300,550 L250,450 L200,350 L280,200 L350,150 Z" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="z-10 text-center max-w-md">
                        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mx-auto mb-6 border border-blue-500/20">
                            <MapIcon size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Interactive District Map</h3>
                        <p className="text-slate-400 mb-8">Each district is color-coded by its calculated Risk Score. Hover for quick stats, click to drill down.</p>

                        <div className="grid grid-cols-3 gap-2 mb-8">
                            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
                                <div className="text-red-400 font-bold text-xl">8</div>
                                <div className="text-[10px] text-red-200/50 uppercase font-bold">High Risk</div>
                            </div>
                            <div className="p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-center">
                                <div className="text-amber-400 font-bold text-xl">15</div>
                                <div className="text-[10px] text-amber-200/50 uppercase font-bold">Medium</div>
                            </div>
                            <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                                <div className="text-green-400 font-bold text-xl">15</div>
                                <div className="text-[10px] text-green-200/50 uppercase font-bold">Safe</div>
                            </div>
                        </div>

                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30">
                            Explore Detailed Map
                        </button>
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-6 right-6 p-4 bg-slate-800/80 backdrop-blur rounded-lg border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                            <div className="w-3 h-3 bg-red-500 rounded"></div> Critical (70+)
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                            <div className="w-3 h-3 bg-amber-500 rounded"></div> Warning (40-70)
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
                            <div className="w-3 h-3 bg-green-500 rounded"></div> Stable (&lt;40)
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DistrictDashboard;
