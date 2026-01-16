import React, { useState } from 'react';
import { Truck, Clock, RefreshCw, BarChart3 } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const StockLogistics = () => {
    // Mock Data for Logistics
    const vehicleStatusData = [
        { name: 'Active (On Route)', value: 145, color: '#10b981' },
        { name: 'Loading', value: 42, color: '#3b82f6' },
        { name: 'Unloading', value: 38, color: '#f59e0b' },
        { name: 'Idle/Maintenance', value: 15, color: '#64748b' },
    ];

    const tatData = [
        { hub: 'Thanjavur Central', loading: 45, unloading: 35 },
        { hub: 'Mannargudi', loading: 55, unloading: 40 },
        { hub: 'Kumbakonam', loading: 30, unloading: 25 },
        { hub: 'Pattukkottai', loading: 60, unloading: 45 },
        { hub: 'Nagapattinam', loading: 50, unloading: 30 },
    ];

    const transferData = [
        { from: 'Thanjavur', to: 'Tiruvarur', quantity: '450 MT', status: 'In Transit' },
        { from: 'Mannargudi', to: 'Chennai CPC', quantity: '1200 MT', status: 'Scheduled' },
        { from: 'Kumbakonam', to: 'Trichy', quantity: '320 MT', status: 'Delivered' },
        { from: 'Thanjavur', to: 'Nagapattinam', quantity: '500 MT', status: 'In Transit' },
    ];

    return (
        <div className="space-y-6 animate-slide-in">
            <h1 className="text-2xl font-bold text-slate-800">Stock & Logistics Command</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Total Fleet Active</p>
                            <h3 className="text-3xl font-bold text-slate-800 mt-2">240</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <Truck size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Avg Turnaround (TAT)</p>
                            <h3 className="text-3xl font-bold text-slate-800 mt-2">4.2h</h3>
                            <p className="text-xs text-emerald-600 font-bold mt-1">↓ 12% vs last week</p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Inter-Godown Transfer</p>
                            <h3 className="text-3xl font-bold text-slate-800 mt-2">2.4k MT</h3>
                        </div>
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                            <RefreshCw size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Fleet Utilization</p>
                            <h3 className="text-3xl font-bold text-slate-800 mt-2">92%</h3>
                        </div>
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                            <BarChart3 size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vehicle Status Pie Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Real-time Vehicle Status</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={vehicleStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {vehicleStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-slate-800">
                                    240 Total
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center mt-4">
                        {vehicleStatusData.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-xs font-medium text-slate-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TAT Bar Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Turnaround Time by Hub (mins)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tatData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="hub" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                <Bar dataKey="loading" name="Loading Time" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="unloading" name="Unloading Time" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Transfer Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Active Inter-Godown Transfers</h3>
                    <button className="text-blue-600 text-sm font-bold hover:underline">View All Schedules</button>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-6 py-3 font-medium">Source</th>
                            <th className="px-6 py-3 font-medium">Destination</th>
                            <th className="px-6 py-3 font-medium">Quantity</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transferData.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-700">{row.from}</td>
                                <td className="px-6 py-4 text-slate-600">➝ {row.to}</td>
                                <td className="px-6 py-4 font-bold">{row.quantity}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                            row.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-slate-100 text-slate-700'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockLogistics;
