import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import RiskMap from '../RiskMap';
import {
    TrendingDown,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    MoreVertical,
    MapPin
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
} from 'recharts';
import { api } from '../../services/api';

const KPICard = ({ title, value, subtext, trend, trendValue, color }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
                <span className="text-white">●</span>
            </div>
            {trend && (
                <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span className="font-medium">{trendValue}</span>
                </div>
            )}
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
        <div className="text-xs text-slate-400">{subtext}</div>
    </div>
);

const RiskTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRisks = async () => {
            try {
                const response = await api.get('/godowns');
                if (response.success && Array.isArray(response.data)) {
                    const sorted = response.data
                        .map(g => ({
                            id: g.id,
                            name: g.name,
                            district: g.district,
                            commodity: 'Paddy',
                            score: g.riskScore || 0,
                            days: 45,
                            status: (g.riskScore || 0) > 75 ? 'High Risk' : 'Normal'
                        }))
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 5);
                    setData(sorted);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchRisks();
    }, []);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                    <tr>
                        <th className="px-6 py-3 font-medium">Godown Name</th>
                        <th className="px-6 py-3 font-medium">District</th>
                        <th className="px-6 py-3 font-medium">Commodity</th>
                        <th className="px-6 py-3 font-medium">Risk Score</th>
                        <th className="px-6 py-3 font-medium">Days</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="bg-white border-b hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                            <td className="px-6 py-4 text-slate-600">{row.district}</td>
                            <td className="px-6 py-4 text-slate-600">{row.commodity}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <span className={`font-bold ${row.score > 75 ? 'text-red-600' : row.score > 50 ? 'text-amber-600' : 'text-green-600'}`}>
                                        {row.score}
                                    </span>
                                    <div className="ml-2 w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${row.score > 75 ? 'bg-red-500' : row.score > 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                                            style={{ width: `${row.score}%` }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{row.days}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${row.status === 'High Risk'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : row.status === 'Medium' || row.status === 'Guide'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-green-50 text-green-700 border-green-200'
                                    }`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-slate-600 p-1">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const SpoilageChart = () => {
    const data = [
        { month: 'Jan', spoilage: 120, saved: 450 },
        { month: 'Feb', spoilage: 98, saved: 520 },
        { month: 'Mar', spoilage: 86, saved: 600 },
        { month: 'Apr', spoilage: 150, saved: 580 },
        { month: 'May', spoilage: 180, saved: 620 },
        { month: 'Jun', spoilage: 140, saved: 550 },
    ];

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorSpoilage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontSize: '12px' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="saved"
                        name="Est. Saved (MT)"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSaved)"
                    />
                    <Area
                        type="monotone"
                        dataKey="spoilage"
                        name="Spoilage (MT)"
                        stroke="#ef4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSpoilage)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

// Predictive Analytics Widget
const PredictiveAlerts = ({ alerts }) => (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-lg border border-indigo-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">🔮</span> Predictive Risk (48h)
                </h3>
                <span className="bg-indigo-500/30 border border-indigo-400/30 px-2 py-1 rounded text-xs font-bold animate-pulse">
                    AI Forecast Active
                </span>
            </div>
            <div className="space-y-4">
                {alerts.map((alert, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className={`mt-1 p-1.5 rounded-full ${alert.severity === 'High' ? 'bg-red-500' : 'bg-orange-500'}`}>
                            <AlertTriangle size={12} className="text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-indigo-100">{alert.title}</h4>
                            <p className="text-xs text-indigo-300 mt-1">{alert.desc}</p>
                            <div className="flex gap-2 mt-2">
                                <span className="text-[10px] bg-indigo-950/50 px-2 py-0.5 rounded text-indigo-200 border border-indigo-800">
                                    Confidence: {alert.confidence}%
                                </span>
                                <span className="text-[10px] bg-indigo-950/50 px-2 py-0.5 rounded text-indigo-200 border border-indigo-800">
                                    Impact: {alert.impact}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const RiskMitigationWidget = ({ data }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="text-emerald-500"><CheckCircle size={20} /></span>
                Ranked Mitigations & Resolutions
            </h2>
            <span className="text-xs font-bold text-slate-500 uppercase">Live Updates</span>
        </div>
        <div className="divide-y divide-slate-100">
            {data.map((item, index) => (
                <div key={index} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                    <div className="mt-1">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                            #{index + 1}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-800 text-sm">{item.issue}</h4>
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Resolved</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            <span className="font-bold text-slate-700">Solution:</span> {item.solution}
                        </p>
                        <div className="flex gap-4 mt-2 text-[10px] text-slate-400 font-medium">
                            <span>⏱️ {item.time}</span>
                            <span>📍 {item.location}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Overview = () => {
    // ... existing hooks ...
    const { t } = useLanguage();
    const [metrics, setMetrics] = useState(null);

    // Mock Predictive Data
    const predictions = [
        { title: 'Heavy Rain in Delta Region', desc: 'Moisture spike expected in Thanjavur & Tiruvarur godowns. Check tarpaulins.', severity: 'High', confidence: 92, impact: '25 Godowns' },
        { title: 'Truck Strike Probability', desc: 'Transport union talks stalling. Potential logistics delay > 24h on NH-45.', severity: 'Medium', confidence: 75, impact: 'Supply Chain' },
    ];

    // Mock Mitigation Data
    const mitigations = [
        { issue: 'High Moisture Alarm (14.2%)', solution: 'Aeration Fans Activated Automatically', time: '2 hrs ago', location: 'Tiruvarur G-04' },
        { issue: 'Pest Infestation Risk', solution: 'Fumigation Schedule Accelerated', time: '5 hrs ago', location: 'Nagapattinam' },
        { title: 'Stock Discrepancy', solution: 'Audit Team Dispatched', time: 'Yesterday', location: 'Mannargudi' }
    ];

    useEffect(() => {
        // ... existing fetchData ...
        const fetchData = async () => {
            try {
                const response = await api.get('/reports/dashboard');
                if (response.success) {
                    setMetrics(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title={t('totalGodowns')}
                    value={metrics?.totalGodowns || "0"}
                    subtext={t('operationalDistrict')}
                    color="bg-blue-600"
                />
                <KPICard
                    title={t('atRiskGodowns')}
                    value={metrics?.highRiskGodowns || "0"}
                    subtext="High Risk Status"
                    trend="down"
                    trendValue="15%"
                    color="bg-red-500"
                />
                <KPICard
                    title={t('estSpoilageSaved')}
                    value={metrics?.spoilagePreventedValue || "₹0"}
                    subtext="Current Financial Year"
                    trend="up"
                    trendValue="8%"
                    color="bg-emerald-600"
                />
                {/* Replaced Static KPI with Predictive Widget Wrapper or keep layout */}
                <KPICard
                    title={t('seasonProcurement')}
                    value="1,240 MT"
                    subtext="Kharif Marketing Season"
                    color="bg-indigo-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-800">{t('spoilageTrends')}</h2>
                            {/* ... select ... */}
                            <div className="relative">
                                <select className="text-sm bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:bg-slate-100 transition-colors">
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <TrendingDown size={14} />
                                </div>
                            </div>
                        </div>
                        <SpoilageChart />
                    </div>

                    {/* New Predictive Section placed below chart but in the main column */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* We can put it here or replace the risk map side, let's put it as a banner */}
                    </div>
                </div>

                {/* Risk Map Section - Modified to include Predictive Widget above/below or replace? 
                   The user wants "Predictive alerts... prompting pre-emptive stock shifting"
                   Let's place the Predictive Alerts in the right column ABOVE the map for visibility 
                */}
                <div className="flex flex-col gap-6">
                    <PredictiveAlerts alerts={predictions} />

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <MapPin className="text-blue-600" size={20} />
                            {t('riskHeatmap')}
                        </h2>
                        <div className="flex-1 bg-slate-50 rounded-lg overflow-hidden border border-slate-200 relative">
                            <RiskMap />
                        </div>
                    </div>

                    <RiskMitigationWidget data={mitigations} />
                </div>
            </div>

            {/* Top Risk Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">{t('topRiskGodowns')}</h2>
                    <button className="text-blue-600 text-sm font-medium hover:underline">{t('viewAll')}</button>
                </div>
                <RiskTable />
            </div>

        </div>
    );
};

export default Overview;
