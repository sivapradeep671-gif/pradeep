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
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Filter, Calendar, Download } from 'lucide-react';
import { api } from '../../services/api';

const CommodityCard = ({ name, totalStock, oldStock, days, color }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-2 opacity-10 ${color}`}>
            <div className="w-16 h-16 rounded-full bg-current" />
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-2">{name}</h3>
        <div className="flex items-end space-x-2 mb-2">
            <span className="text-2xl font-bold text-slate-800">{totalStock}</span>
            <span className="text-sm text-slate-500 mb-1">MT</span>
        </div>
        <div className="space-y-1">
            <div className="flex justify-between text-xs">
                <span className="text-slate-500">Avg. Aging</span>
                <span className="font-medium text-slate-700">{days} days</span>
            </div>
            <div className="flex justify-between text-xs">
                <span className="text-slate-500">Above Threshold</span>
                <span className="font-medium text-red-600">{oldStock}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                <div className={`h-full rounded-full ${color.replace('text', 'bg').replace('500', '600')}`} style={{ width: '70%' }} />
            </div>
        </div>
    </div>
);

const InventoryAging = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/analytics/inventory');
                if (res.success) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch inventory analytics", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading Inventory Data...</div>;
    if (!data) return <div className="p-8 text-center text-red-500">Failed to load data</div>;

    const { agingData, pieData, commodities, healthIndex, recommendation } = data;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Inventory & Aging Analysis</h1>
                    <p className="text-slate-500">Track commodity lifespan and identify spoilage risks.</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                        <Calendar size={16} />
                        <span>KMS 2023-24</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100">
                        <Download size={16} />
                        <span>Report</span>
                    </button>
                </div>
            </div>

            {/* Commodity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {commodities.map((item, index) => (
                    <CommodityCard key={index} {...item} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Aging Distribution Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-6">Aging Distribution by Commodity</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={agingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="range" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar dataKey="paddy" name="Paddy" fill="#eab308" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="rice" name="Rice" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="wheat" name="Wheat" fill="#b45309" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Overall Health Pie */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold text-slate-800 w-full mb-4">Stock Health Index</h2>
                    <div className="h-64 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-slate-800">{healthIndex}%</div>
                                <div className="text-xs text-slate-500">Healthy</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
                        <p className="mb-2"><span className="font-semibold text-slate-900">Recommendation:</span> {recommendation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryAging;
