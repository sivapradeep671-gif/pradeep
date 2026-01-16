import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import LoadingSpinner from './common/LoadingSpinner';

// Risk Factor Component
const RiskFactor = ({ label, level, details, icon }) => {
    const getColor = (l) => {
        if (l === 'Critical') return 'bg-red-100 text-red-700 border-red-200';
        if (l === 'Moderate') return 'bg-orange-100 text-orange-700 border-orange-200';
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className={`p-3 rounded-lg ${getColor(level)} bg-opacity-20`}>
                <span className="text-xl">{icon}</span>
            </div>
            <div>
                <h4 className="font-bold text-slate-800">{label}</h4>
                <div className={`inline-block px-2 py-0.5 rounded text-xs font-bold mt-1 mb-2 ${getColor(level)}`}>
                    {level} Risk
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{details}</p>
            </div>
        </div>
    );
};

// Asset Inventory Component (New Phase 3)
const AssetInventoryWidget = ({ assets }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit mt-6">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span>📦</span> Asset Inventory
            </h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">Request Stock</button>
        </div>
        <div className="divide-y divide-slate-100">
            {assets.map((asset, index) => (
                <div key={index} className="p-4 flex items-center justify-between">
                    <div>
                        <div className="font-bold text-slate-700 text-sm">{asset.name}</div>
                        <div className="text-xs text-slate-500 mt-1">Required: {asset.required}</div>
                    </div>
                    <div className="text-right">
                        <div className={`font-bold text-lg ${asset.current < asset.required ? 'text-red-600' : 'text-emerald-600'}`}>
                            {asset.current}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Available</div>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-3 bg-red-50 text-red-700 text-xs font-bold text-center border-t border-red-100">
            ⚠️ Low Stock Alert: Tarpaulins (15x30)
        </div>
    </div>
);

const GodownDetails = () => {
    // ... existing hooks ...
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [godown, setGodown] = useState(null);
    const [lots, setLots] = useState([]);
    const [movements, setMovements] = useState([]);
    const [rail, setRail] = useState([]);

    // Mock Risk Factors (In real app, this comes from API)
    const riskFactors = [
        { label: 'Pest Control', level: 'Critical', icon: '🦗', details: 'Weevil infestation detected in Stack 4. Fumigation overdue by 5 days.' },
        { label: 'Moisture Levels', level: 'Moderate', icon: '💧', details: 'Slight elevation in Sector B (13.5%). Requires aeration.' },
        { label: 'Infrastructure', level: 'Low', icon: '🏗️', details: 'Roof integrity matches standards. No leaks reported in last rain.' },
        { label: 'Stack Safety', level: 'Moderate', icon: '📦', details: 'Stack #12 leaning slightly. Needs restacking protocol.' }
    ];

    // Mock Assets for Inventory Widget
    const assets = [
        { name: 'Tarpaulins (15\'x30\')', current: 42, required: 60 },
        { name: 'Moisture Meters', current: 5, required: 5 },
        { name: 'Sprayers (Weedicide)', current: 2, required: 3 },
        { name: 'Dunnage (Wooden)', current: 120, required: 150 },
    ];

    useEffect(() => {
        // Fetch Godown Profile
        api.get(`/api/godowns/${id}`).then(setGodown).catch(e => console.error(e));
        // Fetch Stock Lots
        api.get(`/api/stock/lots/${id}`).then(setLots).catch(e => console.error(e));
        // Fetch Recent Movement (Using outward as proxy for recent activity)
        api.get('/api/movement/outward').then(data => setMovements(data.slice(0, 3))).catch(e => console.error(e));
        // Fetch Rail (Mock filtering for dashboard widget)
        api.get('/api/movement/rail').then(data => setRail(data.slice(0, 2))).catch(e => console.error(e));
    }, [id]);

    if (!godown) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><LoadingSpinner text="Fetching Godown Details..." size="lg" /></div>;

    const getRiskColor = (risk) => {
        if (risk === 'High') return 'bg-red-500';
        if (risk === 'Medium') return 'bg-orange-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition-colors">
                            <span className="text-2xl">←</span>
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">{godown.name}</h1>
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span>ID: G-{id.padStart(3, '0')}</span>
                                <span>•</span>
                                <span>Lat: {godown.lat}, Lng: {godown.lng}</span>
                                <a
                                    href={`https://www.google.com/maps?layer=c&cbll=${godown.lat},${godown.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 bg-blue-600 hover:bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-bold no-underline inline-flex items-center gap-1"
                                >
                                    <span>👀</span> Street View
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`px-4 py-1 rounded-full text-sm font-bold ${getRiskColor(godown.risk)}`}>
                            {godown.risk} Risk
                        </div>
                        <div className="text-right text-xs text-slate-400">
                            <div>Last Inspection</div>
                            <div className="font-bold text-white">{godown.lastInspection}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Risk Drill-Down Section (NEW) */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-red-600">⚠️</span> Risk Factor Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {riskFactors.map((factor, index) => (
                            <RiskFactor key={index} {...factor} />
                        ))}
                    </div>
                    {/* Asset Inventory Widget (New Phase 3) */}
                    <AssetInventoryWidget assets={assets} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-sm text-slate-500 font-bold uppercase mb-1">{t('stockLevel') || 'Current Stock'}</div>
                        <div className="text-3xl font-bold text-slate-800">{godown.stock} MT</div>
                        <div className="text-xs text-emerald-600 font-bold mt-2">↑ 12% vs Last Month</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-sm text-slate-500 font-bold uppercase mb-1">Capacity Used</div>
                        <div className="text-3xl font-bold text-blue-600">85%</div>
                        <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                            <div className="bg-blue-600 h-full w-[85%]"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-sm text-slate-500 font-bold uppercase mb-1">{t('humidityThreshold') || 'Avg Humidity'}</div>
                        <div className={`text-3xl font-bold ${godown.humidity > 80 ? 'text-red-600' : 'text-slate-800'}`}>
                            {godown.humidity}%
                        </div>
                        <div className="text-xs text-slate-400 font-bold mt-2">Sensor Active</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-sm text-slate-500 font-bold uppercase mb-1">Stock Value</div>
                        <div className="text-3xl font-bold text-slate-800">₹ 2.5 Cr</div>
                        <div className="text-xs text-slate-400 font-bold mt-2">Estimated</div>
                    </div>
                </div>

                {/* Stock Lots Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-800">{t('stockLots') || 'Live Stock Position'}</h3>
                        <button className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-lg hover:bg-blue-100">
                            Download Report
                        </button>
                    </div>
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Stack No</th>
                                <th className="px-6 py-3">Commodity</th>
                                <th className="px-6 py-3">Grade</th>
                                <th className="px-6 py-3 text-right">Bags</th>
                                <th className="px-6 py-3 text-right">Weight</th>
                                <th className="px-6 py-3 text-center">Moisture</th>
                                <th className="px-6 py-3 text-center">Age</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {lots.map((lot) => (
                                <tr key={lot.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-mono font-bold text-slate-700">{lot.stackNo}</td>
                                    <td className="px-6 py-4 font-bold">{lot.commodity}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{lot.grade}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-slate-600">{lot.bags}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-800">{lot.weight}</td>
                                    <td className="px-6 py-4 text-center">
                                        {lot.moisture === 'N/A' ? (
                                            <span className="text-slate-400">-</span>
                                        ) : (
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${parseFloat(lot.moisture) > 13 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                {lot.moisture}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${parseInt(lot.age) > 90 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            {lot.age}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Rail Arrivals Widget */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl shadow-sm border border-orange-100 overflow-hidden mb-6">
                    <div className="p-6 border-b border-orange-200/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🚂</span>
                            <h3 className="text-lg font-bold text-orange-900">{t('expectedRail') || 'Expected Rail Arrivals'}</h3>
                        </div>
                        <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-lg font-bold">GPS Live</span>
                    </div>
                    <div className="p-0">
                        {rail.map((r, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border-b border-orange-200/50 last:border-0 hover:bg-orange-100/50">
                                <div>
                                    <div className="font-bold text-orange-950">{r.trainNo} - {r.wagons} Wagons</div>
                                    <div className="text-xs text-orange-700">{r.commodity} • From {r.source}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-orange-900">{r.eta}</div>
                                    <div className="text-xs text-orange-600 italic">{r.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800">Recent Movement</h3>
                    </div>
                    <div className="p-0">
                        {movements.map((move, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                        🚛
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-800">{move.commodity} - {move.quantity}</div>
                                        <div className="text-xs text-slate-500">{move.truckNo} • {move.destination}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{move.status}</div>
                                    <div className="text-xs text-slate-400 mt-1">{move.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GodownDetails;
