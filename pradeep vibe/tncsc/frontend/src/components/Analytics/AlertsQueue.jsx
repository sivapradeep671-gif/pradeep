import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AlertsQueue = ({ alerts }) => {
    const { t } = useLanguage();

    const getStatusColor = (sev) => {
        if (sev === 'Critical') return 'bg-red-100 text-red-800';
        if (sev === 'High') return 'bg-orange-100 text-orange-800';
        return 'bg-blue-100 text-blue-800';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden col-span-1 md:col-span-2">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700">{t('activeAlerts') || 'Active Alerts Queue'}</h3>
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-1 rounded-full">{alerts.length} New</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Time</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Issue</th>
                            <th className="px-6 py-3">Severity</th>
                            <th className="px-6 py-3">Assignee</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map((alert) => (
                            <tr key={alert.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-500">{alert.time}</td>
                                <td className="px-6 py-4 font-bold text-slate-700">{alert.location}</td>
                                <td className="px-6 py-4">{alert.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {alert.assignee === 'Unassigned' ? (
                                        <span className="text-slate-400 italic">Unassigned</span>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                                                {alert.assignee.charAt(0)}
                                            </div>
                                            {alert.assignee}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-bold text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AlertsQueue;
