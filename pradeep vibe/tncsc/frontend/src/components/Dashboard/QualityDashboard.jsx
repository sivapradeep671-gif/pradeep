import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Thermometer, Droplets, Bug, AlertOctagon, Fan, Activity, RefreshCw } from 'lucide-react';

const MetricCard = ({ label, value, unit, status, icon: Icon, subtext }) => {
    let bgClass = "bg-white";
    let textClass = "text-slate-800";
    let borderClass = "border-slate-100";

    if (status === 'Critical') {
        bgClass = "bg-red-50";
        borderClass = "border-red-200";
        textClass = "text-red-700";
    }

    return (
        <div className={`p-5 rounded-xl border shadow-sm ${bgClass} ${borderClass} transition-all`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
                    <h3 className={`text-2xl font-black mt-2 ${textClass}`}>
                        {value}<span className="text-sm ml-1 font-bold opacity-70">{unit}</span>
                    </h3>
                </div>
                <div className={`p-2 rounded-lg ${status === 'Critical' ? 'bg-red-200 text-red-800' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon size={20} />
                </div>
            </div>
            {subtext && <p className="text-[10px] font-bold mt-3 text-slate-500 opacity-80">{subtext}</p>}
        </div>
    );
};

const QualityDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ stats: {}, report: [] });
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/quality/sensors');
            if (res.success) {
                setData(res.data);
                setLastUpdated(new Date());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Auto-refresh every 30s
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    // Helper to get severity color
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
            case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Quality Monitoring (IoT)</h2>
                    <p className="text-sm text-slate-500">Real-time sensor data from {data.stats.total || 0} Godowns</p>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
                    <span className="text-xs font-bold uppercase">Optimal Conditions</span>
                    <h3 className="text-3xl font-black mt-1">{data.stats.optimal || 0}</h3>
                    <p className="text-[10px] mt-1 font-bold opacity-70">Godowns Safe</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800">
                    <span className="text-xs font-bold uppercase">Critical Alerts</span>
                    <h3 className="text-3xl font-black mt-1">{data.stats.critical || 0}</h3>
                    <p className="text-[10px] mt-1 font-bold opacity-70">Immediate Action Required</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
                    <span className="text-xs font-bold uppercase">Warnings</span>
                    <h3 className="text-3xl font-black mt-1">{data.stats.warning || 0}</h3>
                    <p className="text-[10px] mt-1 font-bold opacity-70">Monitor Closely</p>
                </div>
            </div>

            {/* Godown Sensor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.report.map((godown) => (
                    <div key={godown.godownId} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">{godown.godownName}</h3>
                                <p className="text-xs text-slate-500">{godown.district} District</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${godown.status === 'Critical' ? 'bg-red-100 text-red-700 border-red-200' :
                                    godown.status === 'Warning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                        'bg-emerald-100 text-emerald-700 border-emerald-200'
                                }`}>
                                {godown.status}
                            </span>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <MetricCard
                                label="Temperature"
                                value={godown.sensors.temperature}
                                unit="°C"
                                icon={Thermometer}
                                status={godown.sensors.temperature > 30 ? 'Critical' : 'Normal'}
                            />
                            <MetricCard
                                label="Humidity"
                                value={godown.sensors.humidity}
                                unit="%"
                                icon={Droplets}
                                status={godown.sensors.humidity > 70 ? 'Critical' : 'Normal'}
                            />
                            <MetricCard
                                label="Grain Moisture"
                                value={godown.sensors.grainMoisture}
                                unit="%"
                                icon={Activity}
                                status={godown.sensors.grainMoisture > 14 ? 'Critical' : 'Normal'}
                            />
                            <MetricCard
                                label="Pest Activity"
                                value={godown.sensors.pests}
                                unit=""
                                icon={Bug}
                                status={['High', 'Medium'].includes(godown.sensors.pests) ? 'Critical' : 'Normal'}
                            />
                        </div>

                        {/* Alerts & Actions */}
                        {(godown.alerts.length > 0 || godown.recommendations.length > 0) && (
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm">
                                {godown.alerts.map((alert, idx) => (
                                    <div key={idx} className={`flex items-center gap-2 mb-2 font-bold ${alert.severity === 'Critical' ? 'text-red-600' : 'text-yellow-600'
                                        }`}>
                                        <AlertOctagon size={14} />
                                        <span>{alert.msg}</span>
                                    </div>
                                ))}

                                {godown.recommendations.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-slate-200">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Recommended Actions</p>
                                        <div className="flex flex-wrap gap-2">
                                            {godown.recommendations.map((rec, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold border border-blue-200">
                                                    <Fan size={12} />
                                                    {rec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QualityDashboard;
