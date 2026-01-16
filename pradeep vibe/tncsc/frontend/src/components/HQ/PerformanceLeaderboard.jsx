import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Trophy, Medal, Star, TrendingUp, User, Clock, CheckCircle } from 'lucide-react';

const ConfigCard = ({ rank, officer }) => {
    let bgClass = "bg-white";
    let iconColor = "text-slate-400";
    let borderClass = "border-slate-200";
    let scale = "scale-100";

    if (rank === 1) {
        bgClass = "bg-gradient-to-b from-yellow-50 to-white";
        borderClass = "border-yellow-300";
        iconColor = "text-yellow-500";
        scale = "scale-105 z-10 shadow-xl border-2";
    } else if (rank === 2) {
        bgClass = "bg-gradient-to-b from-slate-50 to-white";
        borderClass = "border-slate-300";
        iconColor = "text-slate-400";
        scale = "scale-100 shadow-lg";
    } else if (rank === 3) {
        bgClass = "bg-gradient-to-b from-orange-50 to-white";
        borderClass = "border-orange-300";
        iconColor = "text-orange-500";
        scale = "scale-95 shadow-md";
    }

    return (
        <div className={`p-6 rounded-2xl ${bgClass} ${borderClass} ${scale} transform transition-all flex flex-col items-center text-center relative`}>
            {rank === 1 && <div className="absolute -top-4"><Trophy size={40} className="text-yellow-500 drop-shadow-md" fill="currentColor" /></div>}
            {rank === 2 && <div className="absolute -top-3"><Medal size={32} className="text-slate-400" /></div>}
            {rank === 3 && <div className="absolute -top-3"><Medal size={32} className="text-orange-500" /></div>}

            <div className={`mt-6 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mb-3 border-2 ${rank === 1 ? 'border-yellow-400 bg-yellow-100 text-yellow-700' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                {officer.name.charAt(0)}
            </div>

            <h3 className="font-bold text-slate-800 text-lg">{officer.name}</h3>
            <p className="text-xs font-bold uppercase text-slate-500 mb-4">{officer.district}</p>

            <div className="bg-slate-900/5 rounded-lg p-2 w-full mb-4">
                <span className="text-[10px] font-bold uppercase text-slate-400">Score</span>
                <div className="text-3xl font-black text-slate-800">{officer.score}</div>
            </div>

            <div className="w-full text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                    <span>Resolved</span>
                    <span className="font-bold">{officer.metrics.resolved} / {officer.metrics.totalIncidents}</span>
                </div>
                <div className="flex justify-between">
                    <span>SLA Compliance</span>
                    <span className="font-bold text-emerald-600">{officer.metrics.slaCompliance}%</span>
                </div>
            </div>
        </div>
    );
};

const PerformanceLeaderboard = () => {
    const [officers, setOfficers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/admin/officer-performance');
                if (res.success) {
                    setOfficers(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const top3 = officers.slice(0, 3);
    const rest = officers.slice(3);

    if (loading) return <div className="p-8 text-center text-slate-500">Calculating Scores...</div>;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-slate-900">Officer Performance</h2>
                <p className="text-slate-500">State-wide ranking based on Resolution Speed & SLA</p>
            </div>

            {/* Podium */}
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-12 px-4">
                {/* 2nd Place */}
                {top3[1] && <div className="w-full md:w-64 order-2 md:order-1"><ConfigCard rank={2} officer={top3[1]} /></div>}

                {/* 1st Place */}
                {top3[0] && <div className="w-full md:w-72 order-1 md:order-2 pb-6"><ConfigCard rank={1} officer={top3[0]} /></div>}

                {/* 3rd Place */}
                {top3[2] && <div className="w-full md:w-64 order-3 md:order-3"><ConfigCard rank={3} officer={top3[2]} /></div>}
            </div>

            {/* List View */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl mx-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-xs">
                        <tr>
                            <th className="p-4 w-16 text-center">Rank</th>
                            <th className="p-4">Officer</th>
                            <th className="p-4">District</th>
                            <th className="p-4 text-center">Resolved</th>
                            <th className="p-4 text-center">Avg Time</th>
                            <th className="p-4 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {rest.map((off, idx) => (
                            <tr key={off.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-center font-bold text-slate-400">#{idx + 4}</td>
                                <td className="p-4 font-semibold text-slate-700">{off.name}</td>
                                <td className="p-4 text-slate-500">{off.district}</td>
                                <td className="p-4 text-center">
                                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold">{off.metrics.resolved}</span>
                                </td>
                                <td className="p-4 text-center text-slate-500">{off.metrics.avgResponseTime}h</td>
                                <td className="p-4 text-right font-black text-slate-800">{off.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PerformanceLeaderboard;
