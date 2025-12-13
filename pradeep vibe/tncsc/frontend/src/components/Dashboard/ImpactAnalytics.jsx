import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    ComposedChart,
    Area
} from 'recharts';
import { Download, Share2, Printer } from 'lucide-react';

const ImpactAnalytics = () => {
    const preventionData = [
        { district: 'Thanjavur', prevented: 450, cost: 85 },
        { district: 'Tiruvarur', prevented: 380, cost: 72 },
        { district: 'Nagapattinam', prevented: 320, cost: 60 },
        { district: 'Trichy', prevented: 280, cost: 52 },
        { district: 'Madurai', prevented: 210, cost: 40 },
    ];

    const comparisonData = [
        { month: 'Jan', pilot: 1.2, nonPilot: 3.5 },
        { month: 'Feb', pilot: 1.0, nonPilot: 3.8 },
        { month: 'Mar', pilot: 0.8, nonPilot: 4.2 },
        { month: 'Apr', pilot: 0.9, nonPilot: 4.0 },
        { month: 'May', pilot: 0.7, nonPilot: 4.5 },
        { month: 'Jun', pilot: 0.6, nonPilot: 4.3 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Impact Analysis</h1>
                    <p className="text-slate-500">Quantifying the efficiency and savings of the RiskGuard system.</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600">
                        <Printer size={16} />
                        <span>Print</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600">
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                        <Download size={16} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Spoilage Prevented Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Spoilage Prevented by District</h3>
                    <p className="text-sm text-slate-500 mb-6">Estimated metric tonnes saved through early intervention alerts.</p>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={preventionData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                <CartesianGrid stroke="#f1f5f9" horizontal={false} />
                                <XAxis type="number" axisLine={false} tickLine={false} />
                                <YAxis dataKey="district" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 13, fill: '#475569' }} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="prevented" name="Saved (MT)" fill="#10b981" barSize={20} radius={[0, 4, 4, 0]} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pilot vs Non-Pilot Comparison */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Pilot vs Non-Pilot Performance</h3>
                    <p className="text-sm text-slate-500 mb-6">Spoilage rate (%) comparison over the last 6 months.</p>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={comparisonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} unit="%" />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend verticalAlign="top" height={36} />
                                <Line type="monotone" dataKey="pilot" name="Pilot System (RiskGuard)" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="nonPilot" name="Traditional Monitoring" stroke="#94a3b8" strokeWidth={3} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Key Stats */}
                <div className="bg-indigo-600 rounded-xl p-6 text-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-indigo-200 text-sm font-medium uppercase mb-4">Total Financial Impact</h3>
                        <div className="text-4xl font-bold mb-2">₹12.4 Cr</div>
                        <p className="text-indigo-100 text-sm">Cumulative value preserved since implementation.</p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-indigo-500/50 flex justify-between items-center text-sm">
                        <span>ROI: <span className="font-bold">8.5x</span></span>
                        <span>Updated today</span>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-slate-800">Infrastructure Gap Analysis</h3>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">District</th>
                                <th className="px-6 py-3 font-medium">Risk Score</th>
                                <th className="px-6 py-3 font-medium">Infra Gaps</th>
                                <th className="px-6 py-3 font-medium">Rec. Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="px-6 py-3 font-medium">Dharmapuri</td>
                                <td className="px-6 py-3 text-red-600 font-bold">88</td>
                                <td className="px-6 py-3">Inadequate Dryer Coverage</td>
                                <td className="px-6 py-3 text-blue-600">Procure 12 Mobile Dryers</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 font-medium">Villupuram</td>
                                <td className="px-6 py-3 text-red-600 font-bold">82</td>
                                <td className="px-6 py-3">Roof Leakages (G4/G5)</td>
                                <td className="px-6 py-3 text-blue-600">Urgent Civil Repair</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 font-medium">Salem</td>
                                <td className="px-6 py-3 text-amber-600 font-bold">64</td>
                                <td className="px-6 py-3">Low Ventilation</td>
                                <td className="px-6 py-3 text-blue-600">Install Exhaust Systems</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ImpactAnalytics;
