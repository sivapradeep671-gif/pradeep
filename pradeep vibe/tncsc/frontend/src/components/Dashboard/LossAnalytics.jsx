import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { api } from '../../services/api';
import { TrendingDown, AlertTriangle, ShieldCheck } from 'lucide-react';

const LossAnalytics = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([]);
    const [selectedGodown, setSelectedGodown] = useState(null);

    useEffect(() => {
        fetchLossTrends();
    }, []);

    const fetchLossTrends = async () => {
        try {
            const res = await api.get('/analytics/loss-trends');
            if (res.success) {
                setStats(res.data);
                // Default to first high-risk godown or the first one
                const risky = res.data.find(g => g.abnormalDetected);
                setSelectedGodown(risky || res.data[0]);
            }
        } catch (err) {
            console.error('Failed to fetch loss analytics', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Calculating Loss Algorithms...</div>;

    const highRiskCount = stats.filter(g => g.abnormalDetected).length;
    const totalLossValue = stats.reduce((acc, curr) => acc + (curr.avgLoss * 15), 0).toFixed(1); // Mock calculation: 1% = 15 Lakh

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Avg. Loss Rate</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">1.8%</h3>
                            <span className="text-xs text-emerald-600 font-medium">↓ 3.2% from last year</span>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <TrendingDown size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Anomalies Detected</p>
                            <h3 className={`text-2xl font-bold mt-1 ${highRiskCount > 0 ? 'text-red-600' : 'text-slate-800'}`}>{highRiskCount}</h3>
                            <span className="text-xs text-slate-500">Requires interaction</span>
                        </div>
                        <div className={`p-3 rounded-lg ${highRiskCount > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-emerald-50 text-emerald-600'}`}>
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Est. Value Saved</p>
                            <h3 className="text-2xl font-bold text-emerald-600 mt-1">₹{100 - totalLossValue} L</h3>
                            <span className="text-xs text-slate-500">This Month</span>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                            <ShieldCheck size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Godown List */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Godown Risk Analysis</h3>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                        {stats.map(godown => (
                            <div
                                key={godown.id}
                                onClick={() => setSelectedGodown(godown)}
                                className={`p-4 border-b cursor-pointer transition-colors ${selectedGodown?.id === godown.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-800">{godown.name}</h4>
                                        <p className="text-xs text-slate-500">{godown.district}</p>
                                    </div>
                                    {godown.abnormalDetected ? (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded">Abnormal</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded">Safe</span>
                                    )}
                                </div>
                                <div className="mt-2 flex justify-between text-xs">
                                    <span className="text-slate-500">Current Stock: {godown.currentStock} T</span>
                                    <span className={`font-bold ${godown.avgLoss > 0.5 ? 'text-red-600' : 'text-slate-600'}`}>Loss: {godown.avgLoss}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charts */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    {selectedGodown ? (
                        <>
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">Loss Trend Analysis</h3>
                                    <p className="text-sm text-slate-500">Last 7 Days • {selectedGodown.name}</p>
                                </div>
                                {selectedGodown.abnormalDetected && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                        <AlertTriangle size={16} />
                                        <span className="text-xs font-bold">THEFT / SPOILAGE DETECTED</span>
                                    </div>
                                )}
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={selectedGodown.history}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#64748b' }}
                                            tickFormatter={(value) => new Date(value).getDate()}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#64748b' }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="lossPercent"
                                            name="Daily Loss %"
                                            stroke={selectedGodown.abnormalDetected ? "#dc2626" : "#10b981"}
                                            strokeWidth={3}
                                            dot={{ r: 4 }}
                                        />
                                        {/* Threshold Line */}
                                        <Line
                                            type="monotone"
                                            dataKey={() => 0.5}
                                            name="Max Threshold"
                                            stroke="#94a3b8"
                                            strokeDasharray="5 5"
                                            strokeWidth={1}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Algorithm Analysis</h4>
                                <p className="text-sm text-slate-700">
                                    {selectedGodown.abnormalDetected
                                        ? "⚠️ The daily loss percentage spiked above the 0.5% threshold. This indicates potential theft or severe moisture damage. Immediate physical inspection is recommended."
                                        : "✓ Inventory loss is within the expected range of 0.1% - 0.2% (attributed to natural moisture evaporation and handling). No action required."}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400">Select a Godown to view analysis</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LossAnalytics;
