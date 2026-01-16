import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FieldOfficerDashboard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('SELECT_GODOWN');
    const [selectedGodown, setSelectedGodown] = useState(null);
    const [inspection, setInspection] = useState({ moisture: 12, pests: 'None', photos: [] });
    const [isOffline, setIsOffline] = useState(false);

    // Mock Godowns
    const godowns = [
        { id: 'TNJ001', name: 'Thanjavur Central' },
        { id: 'MDU005', name: 'Madurai North' },
        { id: 'CHE009', name: 'Chennai Harbor' }
    ];

    const handleSync = () => {
        setIsOffline(false);
        alert('Data synced with HQ servers!');
    };

    const submitInspection = () => {
        if (isOffline) {
            alert('Saved locally. Will sync when online.');
        } else {
            alert('Inspection submitted successfully!');
        }
        setStep('SUCCESS');
    };

    return (
        <div className="h-screen bg-white font-sans flex flex-col">
            {/* Mobile Header */}
            <header className="bg-emerald-700 text-white p-4 flex justify-between items-center shadow-lg">
                <div className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg" alt="TN" className="w-8 h-8 brightness-0 invert" />
                    <h1 className="font-bold text-sm tracking-tight">FIELD OFFICER</h1>
                </div>
                <div className="flex items-center gap-3">
                    {isOffline && (
                        <button onClick={handleSync} className="text-[10px] bg-amber-500 text-white px-2 py-1 rounded font-black animate-pulse">SYNC</button>
                    )}
                    <button onClick={() => navigate('/')} className="text-xs opacity-80">Logout</button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                {step === 'SELECT_GODOWN' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Select Godown</h2>
                        <div className="space-y-3">
                            {godowns.map(g => (
                                <button
                                    key={g.id}
                                    onClick={() => { setSelectedGodown(g); setStep('INSPECTION'); }}
                                    className="w-full text-left p-5 border-2 border-slate-100 rounded-2xl hover:border-emerald-500 transition-all flex justify-between items-center bg-slate-50"
                                >
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{g.id}</p>
                                        <p className="font-bold text-slate-700">{g.name}</p>
                                    </div>
                                    <span className="text-slate-300">→</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'INSPECTION' && selectedGodown && (
                    <div className="space-y-8 animate-in slide-in-from-right duration-300">
                        <div>
                            <button onClick={() => setStep('SELECT_GODOWN')} className="text-emerald-600 text-xs font-bold mb-4 flex items-center gap-1">← BACK TO LIST</button>
                            <h2 className="text-2xl font-black text-slate-800 underline decoration-emerald-500 decoration-4 underline-offset-4">{selectedGodown.name}</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Moisture Input */}
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Moisture Content (%)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range" min="10" max="25" step="0.1"
                                        value={inspection.moisture}
                                        onChange={(e) => setInspection({ ...inspection, moisture: e.target.value })}
                                        className="flex-1 accent-emerald-600"
                                    />
                                    <span className={`text-xl font-black w-16 text-center ${inspection.moisture > 14 ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {inspection.moisture}%
                                    </span>
                                </div>
                            </div>

                            {/* Pest Control */}
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Pest Activity</label>
                                <select
                                    className="w-full border-2 border-slate-100 bg-slate-50 rounded-xl p-4 font-bold text-slate-700 focus:border-emerald-500 outline-none"
                                    value={inspection.pests}
                                    onChange={(e) => setInspection({ ...inspection, pests: e.target.value })}
                                >
                                    <option>None Observed</option>
                                    <option>Minor Presence</option>
                                    <option>Significant (Action Required)</option>
                                </select>
                            </div>

                            {/* Photo Upload Mock */}
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Attachments (Max 3 Photos)</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <div className="aspect-square bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-2xl text-slate-300 cursor-pointer hover:bg-slate-200">
                                        +
                                    </div>
                                </div>
                            </div>

                            {/* Incident Toggle */}
                            <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 accent-red-600" />
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-red-800">RAISE IMMEDIATE INCIDENT</p>
                                        <p className="text-[10px] text-red-600 font-bold uppercase">This will alert HQ immediately</p>
                                    </div>
                                </label>
                            </div>

                            <button
                                onClick={submitInspection}
                                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl shadow-emerald-100"
                            >
                                Submit Inspection
                            </button>

                            <button
                                onClick={() => setIsOffline(!isOffline)}
                                className="w-full text-slate-400 text-[10px] font-bold uppercase tracking-widest"
                            >
                                {isOffline ? 'Mode: Offline' : 'Mode: Online (Tap to test offline)'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 'SUCCESS' && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl">
                            ✓
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800">Success!</h2>
                            <p className="text-slate-500 font-medium">Your inspection report has been {isOffline ? 'saved locally' : 'submitted to the central server'}.</p>
                        </div>
                        <button
                            onClick={() => { setStep('SELECT_GODOWN'); setSelectedGodown(null); }}
                            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs"
                        >
                            Start New Task
                        </button>
                    </div>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="border-t border-slate-100 flex justify-around p-3 bg-white">
                <button className="text-emerald-600 flex flex-col items-center gap-1">
                    <span className="text-xl">📋</span>
                    <span className="text-[8px] font-bold uppercase">Inspector</span>
                </button>
                <button className="text-slate-300 flex flex-col items-center gap-1">
                    <span className="text-xl">📊</span>
                    <span className="text-[8px] font-bold uppercase">Stats</span>
                </button>
                <button className="text-slate-300 flex flex-col items-center gap-1">
                    <span className="text-xl">👤</span>
                    <span className="text-[8px] font-bold uppercase">Profile</span>
                </button>
            </nav>
        </div>
    );
};

export default FieldOfficerDashboard;
