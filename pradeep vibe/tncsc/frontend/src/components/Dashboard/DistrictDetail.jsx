import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    TrendingUp,
    AlertCircle,
    Package,
    Store,
    Phone,
    User,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { mockDistricts } from '../../data/mockDistricts';

const DistrictDetail = () => {
    const { id } = useParams();
    const district = mockDistricts.find(d => d.id === id);

    if (!district) {
        return (
            <div className="p-12 text-center space-y-4">
                <div className="text-slate-400 font-bold text-xl text-center">District Not Found</div>
                <Link to="/dashboard/districts" className="text-blue-600 hover:underline">Return to Gallery</Link>
            </div>
        );
    }

    // Mock trend data
    const trendData = [
        { name: 'Mon', stock: 85, alert: 2 },
        { name: 'Tue', stock: 82, alert: 1 },
        { name: 'Wed', stock: 78, alert: 4 },
        { name: 'Thu', stock: 70, alert: 6 },
        { name: 'Fri', stock: 65, alert: 5 },
        { name: 'Sat', stock: 68, alert: 3 },
        { name: 'Sun', stock: 72, alert: 2 },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb/Back */}
            <Link
                to="/dashboard/districts"
                className="inline-flex items-center text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
            >
                <ArrowLeft size={16} className="mr-1" /> Back to District Dashboard
            </Link>

            {/* Title Section */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{district.name} District</h1>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-slate-500 text-sm font-medium">Headquarters: <span className="text-slate-900">{district.hq}</span></span>
                        <div className="h-4 w-px bg-slate-200"></div>
                        <span className="text-slate-500 text-sm font-medium">Region: <span className="text-slate-900">{district.region}</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-xl text-center border ${district.risk > 70 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Risk Score</div>
                        <div className={`text-2xl font-bold ${district.risk > 70 ? 'text-red-600' : 'text-green-600'}`}>{district.risk}</div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">
                        Contact Officer <Phone size={16} />
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-slate-400">
                        <Package size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Good</span>
                    </div>
                    <div>
                        <div className="text-slate-500 text-sm">Stock Level (Overall)</div>
                        <div className="text-3xl font-bold text-slate-900">{district.stock}%</div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${district.stock}%` }} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-slate-400">
                        <Store size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Active</span>
                    </div>
                    <div>
                        <div className="text-slate-500 text-sm">Total Fair Price Shops</div>
                        <div className="text-3xl font-bold text-slate-900">{district.fps.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-blue-500 font-bold">
                        <TrendingUp size={12} /> Syncing with ePDS
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-slate-400">
                        <AlertCircle size={20} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${district.alerts > 5 ? 'text-red-500' : 'text-amber-500'}`}>
                            {district.alerts > 5 ? 'Immediate' : 'Monitor'}
                        </span>
                    </div>
                    <div>
                        <div className="text-slate-500 text-sm">Active Alerts</div>
                        <div className="text-3xl font-bold text-slate-900">{district.alerts}</div>
                    </div>
                    <Link to="/dashboard/alerts" className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                        View Queue <ChevronRight size={12} />
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center text-slate-400">
                        <User size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Regional</span>
                    </div>
                    <div>
                        <div className="text-slate-500 text-sm">Regional Officer</div>
                        <div className="text-lg font-bold text-slate-900">{district.officer}</div>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Phone size={12} /> {district.contact}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-800">Operational Trends (7 Days)</h3>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-blue-500"></div> Stock</div>
                            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-400"></div> Alerts</div>
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="stock" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorStock)" />
                                <Area type="monotone" dataKey="alert" stroke="#f87171" strokeWidth={2} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Notes & Actions */}
                <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-white space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="text-emerald-400" size={20} />
                        <h3 className="text-xl font-bold">Action Items</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: 'Monsoon Preparedness', desc: 'Secure godowns GDN001 & GDN004 against coastal flood warning.', urgent: true },
                            { title: 'Stock Reconciliation', desc: 'Cross-verify ePDS log discrepancy reported in Madurai HQ.', urgent: false },
                            { title: 'Fleet Inspection', desc: 'Audit 15 trucks scheduled for Thanjavur route movement.', urgent: false },
                        ].map((item, i) => (
                            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-sm">{item.title}</h4>
                                    {item.urgent && <span className="bg-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold">URGENT</span>}
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-white text-sm transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2">
                        Mark as Complete <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* Detail Tabs Placeholder */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                    <button className="px-8 py-4 text-sm font-bold text-blue-600 border-b-2 border-blue-600">Fair Price Shops ({district.fps})</button>
                    <button className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600">Godown Distribution</button>
                    <button className="px-8 py-4 text-sm font-bold text-slate-400 hover:text-slate-600">Transit Logs</button>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="p-6 rounded-xl border border-slate-100 bg-slate-50/30 flex justify-between items-center group hover:bg-white hover:shadow-md transition-all border-dashed">
                                <div>
                                    <div className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wider">FPS-TN-{district.id.toUpperCase()}-{i}04</div>
                                    <div className="font-bold text-slate-800">Ration Shop Hub {i}</div>
                                    <div className="text-xs text-emerald-600 font-medium">Stock: Stable</div>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={20} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistrictDetail;
