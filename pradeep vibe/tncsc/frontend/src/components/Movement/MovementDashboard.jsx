import React, { useState, useEffect } from 'react';
import TruckChallanTable from './TruckChallanTable';
import RailTable from './RailTable';
import LotDrillDown from './LotDrillDown';
import { useLanguage } from '../../context/LanguageContext';

// Route Risk Component
const RouteRiskItem = ({ route, riskLevel, issues, count }) => {
    const getColor = (l) => {
        if (l === 'High') return 'text-red-600 bg-red-50 border-red-200';
        if (l === 'Medium') return 'text-orange-600 bg-orange-50 border-orange-200';
        return 'text-blue-600 bg-blue-50 border-blue-200';
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
            <div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{route}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold border ${getColor(riskLevel)}`}>
                        {riskLevel} Risk
                    </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{issues}</div>
            </div>
            <div className="text-right">
                <div className="font-bold text-slate-900">{count} Trucks</div>
                <div className="text-xs text-emerald-600 font-bold">Live Tracking</div>
            </div>
        </div>
    );
};

import ConsignmentForm from '../HQ/ConsignmentForm';

const MovementDashboard = () => {
    const { t } = useLanguage();
    const [view, setView] = useState('INWARD'); // INWARD, OUTWARD, RAIL
    const [inwardData, setInwardData] = useState([]);
    const [outwardData, setOutwardData] = useState([]);
    const [railData, setRailData] = useState([]);
    const [showDrillDown, setShowDrillDown] = useState(false);
    const [showConsignmentForm, setShowConsignmentForm] = useState(false);

    const handleNewMovement = (newMovement) => {
        if (view === 'INWARD') setInwardData([newMovement, ...inwardData]);
        else if (view === 'OUTWARD') setOutwardData([newMovement, ...outwardData]);
        else setRailData([newMovement, ...railData]);
        // Also log to audit ledger (mock)
        console.log('Movement Created:', newMovement);
    };

    // Mock Route Risks
    const routeRisks = [
        { route: 'Thanjavur - Mannargudi Main Rd', riskLevel: 'High', issues: 'Severe Potholes • High Theft Zone', count: 12 },
        { route: 'Trichy - Madurai NH45', riskLevel: 'Medium', issues: 'Traffic Congestion • Delay Expected', count: 8 },
        { route: 'Nagapattinam Coastal Route', riskLevel: 'High', issues: 'Flood Warning • Diversion Active', count: 5 },
    ];

    useEffect(() => {
        // ... existing fetches ...
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

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowConsignmentForm(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200"
                    >
                        + Create Movement
                    </button>
                    <button className="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100 flex items-center gap-2">
                        <span>🚛</span> Transit Risks (3)
                    </button>
                    <button
                        onClick={() => setShowDrillDown(true)}
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-bold hover:bg-emerald-200 flex items-center gap-2"
                    >
                        <span>🔍</span> {t('inspectStock') || 'Inspect Stock Lots'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Checkers (Left 2/3) */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 h-min">
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

                    {/* Main Table */}
                    <div className="md:col-span-3">
                        {view === 'RAIL' ? (
                            <RailTable data={railData} />
                        ) : (
                            <TruckChallanTable
                                data={view === 'INWARD' ? inwardData : outwardData}
                                type={view}
                            />
                        )}
                    </div>
                </div>

                {/* Right Column: Route Risk Heatmap (NEW) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">⚠️ High Risk Routes</h3>
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">Live Updates</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {routeRisks.map((risk, index) => (
                            <RouteRiskItem key={index} {...risk} />
                        ))}
                    </div>
                    <div className="p-3 bg-slate-50 text-center">
                        <button className="text-xs font-bold text-blue-600 hover:underline">View All Route Alerts</button>
                    </div>
                </div>
            </div>

            {/* Consignment Form Modal */}
            {showConsignmentForm && (
                <ConsignmentForm
                    onClose={() => setShowConsignmentForm(false)}
                    onSave={handleNewMovement}
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
