import React, { useState, useEffect } from 'react';
import TruckChallanTable from './TruckChallanTable';
import RailTable from './RailTable';
import LotDrillDown from './LotDrillDown';
import { useLanguage } from '../../context/LanguageContext';

const MovementDashboard = () => {
    const { t } = useLanguage();
    const [view, setView] = useState('INWARD'); // INWARD, OUTWARD, RAIL
    const [inwardData, setInwardData] = useState([]);
    const [outwardData, setOutwardData] = useState([]);
    const [railData, setRailData] = useState([]);
    const [showDrillDown, setShowDrillDown] = useState(false);

    useEffect(() => {
        fetch('/api/movement/inward').then(res => res.json()).then(setInwardData);
        fetch('/api/movement/outward').then(res => res.json()).then(setOutwardData);
        fetch('/api/movement/rail').then(res => res.json()).then(setRailData);
    }, []);

    return (
        <div className="space-y-6 animate-slide-in">
            {/* Header / Controls */}
            <div className="flex justify-between items-center">
                <div className="bg-white p-1 rounded-lg border border-slate-200 inline-flex shadow-sm">
                    <button
                        onClick={() => setView('INWARD')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${view === 'INWARD' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {t('inwardMovement') || 'Inward (Procurement)'}
                    </button>
                    <button
                        onClick={() => setView('OUTWARD')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${view === 'OUTWARD' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {t('outwardMovement') || 'Outward (FPS/Processing)'}
                    </button>
                    <button
                        onClick={() => setView('RAIL')}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${view === 'RAIL' ? 'bg-orange-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {t('railConsignments') || 'Rail Consignments'}
                    </button>
                </div>

                <button
                    onClick={() => setShowDrillDown(true)}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-200 flex items-center gap-2"
                >
                    <span>🔍</span> {t('inspectStock') || 'Inspect Stock Lots'}
                </button>
            </div>

            {/* Stats Checkers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase font-bold">Today's Trucks</p>
                    <p className="text-2xl font-bold text-slate-800">{view === 'INWARD' ? inwardData.length : outwardData.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase font-bold">Volume Moved</p>
                    <p className="text-2xl font-bold text-slate-800">450 MT</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase font-bold">Pending Clearance</p>
                    <p className="text-2xl font-bold text-orange-600">2</p>
                </div>
            </div>

            {/* Main Table */}
            {view === 'RAIL' ? (
                <RailTable data={railData} />
            ) : (
                <TruckChallanTable
                    data={view === 'INWARD' ? inwardData : outwardData}
                    type={view}
                />
            )}

            {/* Drill Down Modal */}
            {showDrillDown && (
                <LotDrillDown godownId="G-THJ-001" onClose={() => setShowDrillDown(false)} />
            )}
        </div>
    );
};

export default MovementDashboard;
