import React, { useState } from 'react';

const ReportingDashboard = () => {
    const [loading, setLoading] = useState(false);

    const handleDownload = (reportType) => {
        setLoading(true);
        // Simulate secure file generation
        setTimeout(() => {
            setLoading(false);
            alert(`Report Generated: ${reportType}.pdf [SHA-256 Verified]`);
        }, 1200);
    };

    const reports = [
        { id: 'R1', name: 'Monthly Spoilage Analysis', icon: '📊', color: 'bg-red-50 text-red-600', desc: 'Predictive analytics on stock health' },
        { id: 'R2', name: 'District Risk Heatmap', icon: '🗺️', color: 'bg-blue-50 text-blue-600', desc: 'Regional vulnerability assessment' },
        { id: 'R3', name: 'Route Deviation Ledger', icon: '🚛', color: 'bg-purple-50 text-purple-600', desc: 'Audit log of transit violations' },
        { id: 'R4', name: 'Inspector SLA Report', icon: '⏱️', color: 'bg-emerald-50 text-emerald-600', desc: 'Performance vs Resolution targets' }
    ];

    const upcomingForecasts = [
        { month: 'Jan 2026', risk: 'High', factor: 'Monsoon Humidity', trend: '↑ 12%' },
        { month: 'Feb 2026', risk: 'Medium', factor: 'Harvest Peak', trend: '↓ 5%' }
    ];

    return (
        <div className="space-y-8 animate-slide-in">
            {/* Header */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Analytical Command Center</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">SLA Compliance: 94% • Total Spoilage Prevented: ₹ 4.2 Cr</p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl">📈</div>
            </div>

            {/* Reports Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:scale-[1.02] transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl text-2xl ${report.color}`}>
                                {report.icon}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    disabled={loading}
                                    onClick={() => handleDownload(`${report.name}_PDF`)}
                                    className="px-3 py-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    PDF
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={() => handleDownload(`${report.name}_XLS`)}
                                    className="px-3 py-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                >
                                    XLS
                                </button>
                            </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">{report.name}</h3>
                        <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-widest">{report.desc}</p>
                    </div>
                ))}
            </div>

            {/* AI Risk Forecast Section */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">AI Risk Forecast (Next 60 Days)</h3>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Confidence: 89%</span>
                </div>
                <div className="divide-y divide-slate-100">
                    {upcomingForecasts.map((f, i) => (
                        <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="text-center w-16">
                                    <p className="text-xs font-black text-slate-400 uppercase">{f.month.split(' ')[0]}</p>
                                    <p className="text-lg font-black text-slate-800">{f.month.split(' ')[1]}</p>
                                </div>
                                <div className="h-10 w-[2px] bg-slate-200"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">{f.factor}</p>
                                    <p className={`text-[10px] font-black uppercase ${f.risk === 'High' ? 'text-red-500' : 'text-orange-500'}`}>{f.risk} Impact Predicted</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-lg font-black ${f.trend.includes('↑') ? 'text-red-500' : 'text-emerald-500'}`}>{f.trend}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Risk Delta</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportingDashboard;
