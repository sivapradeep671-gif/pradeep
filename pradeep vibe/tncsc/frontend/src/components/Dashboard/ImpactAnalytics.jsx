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
import { Download, Share2, Printer, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';

const ImpactAnalytics = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetchImpactData();
    }, []);

    const fetchImpactData = async () => {
        try {
            const res = await api.get('/analytics/impact');
            if (res.success) {
                setData(res.data);
            }
        } catch (error) {
            console.error('Failed to fetch impact data', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading Impact Analysis...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Failed to load data</div>;

    const { preventionData, comparisonData, financial, beneficiary, operational, infrastructureGaps } = data;

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

            {/* Enhanced KPI Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Financial Impact Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 -mr-16 -mt-16"></div>
                    <h3 className="text-indigo-200 text-sm font-bold uppercase mb-4 flex items-center gap-2">
                        <span>💰</span> Financial Efficiency
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold">₹{financial.totalSaved}</span>
                        <span className="text-sm font-medium bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                            +{financial.yoyGrowth}% YoY
                        </span>
                    </div>
                    <p className="text-indigo-100 text-xs mb-6">Cumulative value preserved through spoilage prevention.</p>
                    <div className="pt-4 border-t border-indigo-500/30 flex justify-between items-center text-xs">
                        <span>ROI: <span className="font-bold text-white">{financial.roi}</span></span>
                        <span>Mitigation Cost: ₹{financial.mitigationCost}</span>
                    </div>
                </div>

                {/* Beneficiary Impact Card (Social Impact) */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                    <h3 className="text-slate-500 text-sm font-bold uppercase mb-4 flex items-center gap-2">
                        <span>👨‍👩‍👧‍👦</span> Beneficiary Reach
                    </h3>
                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-slate-800">{beneficiary.familiesServed}</span>
                        <span className="text-sm font-medium text-emerald-600">High Coverage</span>
                    </div>
                    <p className="text-slate-500 text-xs mb-4">Percentage of Ration Shops receiving stock on-time.</p>

                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-medium text-slate-600">
                            <span>Families Served</span>
                            <span className="font-bold">{beneficiary.familiesServed}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full w-[85%]"></div>
                        </div>
                        <div className="flex justify-between text-xs font-medium text-slate-600 mt-1">
                            <span>Card Holders Impacted</span>
                            <span className="font-bold text-emerald-600">{beneficiary.cardHoldersImpacted}%</span>
                        </div>
                    </div>
                </div>

                {/* Operational Efficiency Card */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                    <h3 className="text-slate-500 text-sm font-bold uppercase mb-4 flex items-center gap-2">
                        <span>⚡</span> Operational Velocity
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                            <div className="text-2xl font-bold text-slate-800">{operational.turnaroundTime}</div>
                            <div className="text-xs text-slate-400">Avg. Turnaround Time</div>
                            <div className="text-xs text-emerald-600 font-bold mt-1">↓ 12% (Faster)</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-slate-800">{operational.stockIntegrity}%</div>
                            <div className="text-xs text-slate-400">Stock Integrity</div>
                            <div className="text-xs text-emerald-600 font-bold mt-1">↑ 0.5% (Improved)</div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span>Zero critical operational halts</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                        {infrastructureGaps.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-3 font-medium">{item.district}</td>
                                <td className={`px-6 py-3 font-bold ${item.riskScore > 80 ? 'text-red-600' : 'text-amber-600'}`}>{item.riskScore}</td>
                                <td className="px-6 py-3">{item.gap}</td>
                                <td className="px-6 py-3 text-blue-600">{item.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ImpactAnalytics;
