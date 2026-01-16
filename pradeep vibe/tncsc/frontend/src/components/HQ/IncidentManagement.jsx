import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const IncidentManagement = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const fetchIncidents = async () => {
        try {
            const response = await api.get('/incidents');
            if (response.success) setIncidents(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, []);

    const handleUpdate = async (id, data) => {
        try {
            const response = await api.patch(`/incidents/${id}`, data);
            if (response.success) {
                fetchIncidents();
                alert('Incident updated and logged in ledger.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="p-12 text-center text-slate-400 font-bold">Loading Incidents...</div>;

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden font-sans">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Active Incidents</h3>
                    <p className="text-xs text-slate-500 font-bold">Manage and assign tasks to field officers</p>
                </div>
                <div className="flex gap-2">
                    {['All', 'Open', 'Assigned', 'Closed'].map(f => (
                        <button
                            key={f} onClick={() => setFilter(f)}
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Incident</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Godown</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Severity</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assignee</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {incidents.filter(i => filter === 'All' || i.status === filter).map(i => (
                            <tr key={i.id} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4 font-mono text-[10px] text-slate-400">#00{i.id}</td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-bold text-slate-800">{i.title}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Via {i.reportedBy || 'Sensor'}</p>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-slate-600">{i.godownId}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase tracking-tighter ${i.severity === 'Critical' ? 'bg-red-100 text-red-600' : i.severity === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {i.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={i.status}
                                        onChange={(e) => handleUpdate(i.id, { status: e.target.value })}
                                        className={`text-[10px] font-bold bg-transparent border-b-2 border-transparent hover:border-slate-200 outline-none p-1 cursor-pointer ${i.status === 'Closed' ? 'text-slate-400' : 'text-emerald-600'}`}
                                    >
                                        <option value="Open">● Open</option>
                                        <option value="In Progress">● In Progress</option>
                                        <option value="Assigned">● Assigned</option>
                                        <option value="Closed">● Closed</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={i.assignee || 'Unassigned'}
                                        onChange={(e) => handleUpdate(i.id, { assignee: e.target.value })}
                                        className="text-[10px] font-black bg-transparent border-b-2 border-transparent hover:border-slate-200 outline-none p-1 cursor-pointer"
                                    >
                                        <option value="Unassigned">Unassigned</option>
                                        <option value="P. Velu">P. Velu</option>
                                        <option value="R. Suresh">R. Suresh</option>
                                        <option value="M. Selvam">M. Selvam</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-md ${i.slaStatus === 'EXPIRED' ? 'bg-red-600 text-white animate-bounce' : 'bg-slate-100 text-slate-600'}`}>
                                        {i.slaStatus || 'On Track'}
                                    </span>
                                    {i.status !== 'Closed' && (
                                        <button
                                            onClick={() => handleUpdate(i.id, { status: 'Closed' })}
                                            className="text-[10px] p-2 hover:bg-emerald-50 text-emerald-600 rounded-full transition-all"
                                            title="Mark as Resolved"
                                        >
                                            ✓
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:text-blue-700">View Full Incident Log →</button>
            </div>
        </div>
    );
};

export default IncidentManagement;
