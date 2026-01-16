import React from 'react';

const AuditTrail = () => {
    const logs = [
        { id: 1, action: 'STOCK_MOVEMENT', details: '10 tons rice moved from TNJ001 to CHE009', timestamp: '2025-12-23 09:00 AM', hash: '5f3c...8e21' },
        { id: 2, action: 'INSPECTION_RECORDED', details: 'High moisture (18%) detected at TVR008', timestamp: '2025-12-23 11:30 AM', hash: '9b1a...2d4f' },
        { id: 3, action: 'TRIP_STARTED', details: 'Truck TN-45-AQ-1234 departed from Thanjavur', timestamp: '2025-12-23 12:15 PM', hash: 'ac32...ff10' },
        { id: 4, action: 'ALERT_ESCALATED', details: 'SLA breach for Incident #002 assigned to R. Suresh', timestamp: '2025-12-23 02:00 PM', hash: 'e5d4...bb99' }
    ];

    return (
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 font-mono text-[10px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-black text-slate-800 uppercase tracking-[0.2em] text-sm">Immutable Ledger</h3>
                    <p className="text-slate-400 font-bold uppercase">TN Stack / TNeGA Compliance Trail</p>
                </div>
                <div className="bg-emerald-500/20 text-emerald-600 px-3 py-1 rounded-full font-black animate-pulse border border-emerald-500/30">
                    ● LEDGER ACTIVE
                </div>
            </div>

            <div className="space-y-3">
                {logs.map(log => (
                    <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4 items-center group">
                        <div className="w-2 h-10 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-full bg-emerald-500 h-[70%]"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-slate-400 mb-1">
                                <span className="font-black uppercase tracking-widest text-[9px]">{log.action}</span>
                                <span>{log.timestamp}</span>
                            </div>
                            <p className="text-slate-700 font-bold text-xs">{log.details}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-300 font-bold">SHA-256 HASH</p>
                            <p className="text-emerald-600 font-black tracking-tighter group-hover:tracking-normal transition-all">{log.hash}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 text-center opacity-50 italic">
                Logs are cryptographically signed and stored in the TN-Stack Gov-Cloud instance.
            </div>
        </div>
    );
};

export default AuditTrail;
