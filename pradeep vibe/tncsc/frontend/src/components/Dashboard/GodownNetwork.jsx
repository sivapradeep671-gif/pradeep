import React, { useState } from 'react';
import {
    Search,
    Filter,
    ChevronDown,
    MoreHorizontal,
    ArrowUpDown,
    Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GodownNetwork = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const godowns = [
        { id: 'TNJ001', name: 'Thanjavur Main', district: 'Thanjavur', capacity: 5000, stock: 4200, util: 84, risk: 85, status: 'Critical', lastInsp: '2023-12-10' },
        { id: 'TVR004', name: 'Mannargudi G1', district: 'Tiruvarur', capacity: 3000, stock: 1200, util: 40, risk: 78, status: 'High Risk', lastInsp: '2023-12-08' },
        { id: 'NGP002', name: 'Nagapattinam Central', district: 'Nagapattinam', capacity: 4500, stock: 4100, util: 91, risk: 72, status: 'Watch', lastInsp: '2023-12-11' },
        { id: 'TRY008', name: 'Trichy Buffer', district: 'Trichy', capacity: 10000, stock: 6500, util: 65, risk: 45, status: 'Normal', lastInsp: '2023-12-05' },
        { id: 'MDU012', name: 'Madurai North', district: 'Madurai', capacity: 6000, stock: 3200, util: 53, risk: 30, status: 'Normal', lastInsp: '2023-12-01' },
        { id: 'CBE003', name: 'Coimbatore West', district: 'Coimbatore', capacity: 4000, stock: 3900, util: 97, risk: 60, status: 'Watch', lastInsp: '2023-12-12' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Godown Network</h1>
                    <p className="text-slate-500">Monitor storage capacity and risk levels across 248 godowns.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white border text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center space-x-2">
                        <span className="hidden sm:inline">Export Data</span>
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                        + Add Godown
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Godown Name, ID, or District..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['District', 'Commodity', 'Risk Level', 'Utilization'].map((filter) => (
                        <button key={filter} className="flex items-center space-x-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap bg-white">
                            <span>{filter}</span>
                            <ChevronDown size={14} />
                        </button>
                    ))}
                    <button className="flex items-center space-x-1 px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap bg-slate-50">
                        <Filter size={14} />
                        <span>More</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 border-b">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-slate-700">
                                        <span>Godown ID</span>
                                        <ArrowUpDown size={14} />
                                    </div>
                                </th>
                                <th className="px-6 py-4 border-b">Name & District</th>
                                <th className="px-6 py-4 border-b text-right">Capacity (MT)</th>
                                <th className="px-6 py-4 border-b text-right">Stock (MT)</th>
                                <th className="px-6 py-4 border-b text-right">Util %</th>
                                <th className="px-6 py-4 border-b">Risk Score</th>
                                <th className="px-6 py-4 border-b">Status</th>
                                <th className="px-6 py-4 border-b">Last Insp.</th>
                                <th className="px-6 py-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {godowns.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-slate-600 font-mono">{item.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{item.name}</div>
                                        <div className="text-xs text-slate-500">{item.district}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600">{item.capacity.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right text-slate-600">{item.stock.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <span className="text-slate-700 font-medium">{item.util}%</span>
                                            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.util > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
                                                    style={{ width: `${item.util}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold ${item.risk > 75 ? 'text-red-600' : item.risk > 50 ? 'text-amber-600' : 'text-green-600'}`}>
                                            {item.risk}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${item.status === 'Critical' || item.status === 'High Risk'
                                                ? 'bg-red-50 text-red-700 border-red-200'
                                                : item.status === 'Watch'
                                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                    : 'bg-green-50 text-green-700 border-green-200'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">{item.lastInsp}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link to={`/godown/${item.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                                                <Eye size={16} />
                                            </Link>
                                            <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded transition-colors">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                    <span>Showing 6 of 248 godowns</span>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border rounded hover:bg-slate-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GodownNetwork;
