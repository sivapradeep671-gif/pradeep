import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Clock, CheckCircle, Package, Truck, QrCode, X } from 'lucide-react';
import DeliveryQR from './Logistics/DeliveryQR';
import { api } from '../services/api';

const DriverDashboard = () => {
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [trips, setTrips] = useState([]); // Added missing state
    const [error] = useState(null);
    const [showQR, setShowQR] = useState(null);
    const [isOnline] = useState(true);
    const [location, setLocation] = useState({ lat: 10.7870, lng: 79.1378 });

    useEffect(() => {
        // Mock fetching active trip
        const fetchTrips = async () => {
            try {
                const response = await api.get('/trips');
                if (response.success) {
                    setTrips(response.data);
                    const active = response.data.find(t => t.status === 'In Transit' || t.status === 'Started');
                    if (active) setTrip(active); // Fixed setState
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load trips');
            }
        };
        fetchTrips();

        // Mock GPS tracking
        const interval = setInterval(() => {
            setLocation(prev => ({ ...prev, lng: prev.lng + 0.01 }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleStartTrip = async (id) => {
        try {
            const response = await api.post(`/trips/${id}/start`, {});
            if (response.success) {
                setTrips(trips.map(t => t.id === id ? { ...t, status: 'In Transit' } : t));
                setTrip(prev => ({ ...prev, status: 'In Transit' }));
                alert('Trip Started. Geofencing Active.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to start trip.');
        }
    };

    const handleCompleteDelivery = async (id) => {
        try {
            const response = await api.post(`/trips/${id}/confirm`, {
                lat: 13.0827,
                lng: 80.2707 // Mock arrival coords
            });
            if (response.success) {
                setTrips(trips.map(t => t.id === id ? { ...t, status: 'Delivered' } : t));
                setTrip(null);
                alert('Delivery Confirmed. Immutable Log Updated.');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to complete delivery.');
        }
    };

    return (
        <div className="h-screen bg-slate-900 text-white font-sans flex flex-col">
            {/* Dark Mode Header */}
            <header className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-black text-slate-900">
                        D
                    </div>
                    <div>
                        <h1 className="text-sm font-bold uppercase tracking-widest">Driver Flow</h1>
                        <p className="text-[10px] text-slate-400 font-medium">TN-45-AQ-1234 • Selvam M.</p>
                    </div>
                </div>
                <button onClick={() => navigate('/')} className="text-xs bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-600 font-bold hover:bg-red-900/40 transition-colors">Sign Out</button>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Connection Status */}
                <div className={`p-2 rounded-lg text-center text-[10px] font-black uppercase tracking-[0.2em] shadow-inner ${isOnline ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' : 'bg-red-900/30 text-red-400 border border-red-800/50'}`}>
                    {isOnline ? '● Live GPS Tracking Active' : '○ Offline Mode - Sync Pending'}
                </div>

                {!trip ? (
                    <div className="h-40 flex items-center justify-center text-slate-500 italic">No active trips. Check with HQ.</div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Current Trip Card */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider ${trip.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                                    {trip.status}
                                </span>
                                <span className="text-xs font-mono text-slate-500">#{trip.id}</span>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <div className="w-0.5 h-12 border-l-2 border-dashed border-slate-600 my-1"></div>
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Origin</p>
                                            <p className="text-sm font-bold text-slate-200">{trip.origin}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Destination</p>
                                            <p className="text-sm font-bold text-slate-200">{trip.destination}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-700 pt-6">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Commodity</p>
                                    <p className="text-xs font-bold">{trip.commodity}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase">Load</p>
                                    <p className="text-xs font-bold">{trip.quantity}</p>
                                </div>
                            </div>
                        </div>

                        {/* Live Map Mock */}
                        <div className="bg-slate-800 rounded-2xl h-48 border border-slate-700 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[#0f172a] opacity-50">
                                {/* Synthetic Map Grid */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                            </div>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse"></div>
                            </div>
                            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md p-2 rounded text-[10px] font-mono border border-slate-700">
                                LOC: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 h-24">
                            {trip.status === 'Assigned' && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleStartTrip(trip.id)}
                                        className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
                                    >
                                        Start Trip
                                    </button>
                                    <button
                                        onClick={() => setShowQR(trip.id)}
                                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-200"
                                        title="Show Delivery QR"
                                    >
                                        <QrCode size={20} />
                                    </button>
                                </div>
                            )}
                            {trip.status === 'In Transit' && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleCompleteDelivery(trip.id)}
                                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Complete Delivery
                                    </button>
                                    <button
                                        onClick={() => setShowQR(trip.id)}
                                        className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-200"
                                        title="Show Delivery QR"
                                    >
                                        <QrCode size={20} />
                                    </button>
                                </div>
                            )}
                            {trip.status === 'Delivered' && (
                                <div className="w-full h-16 bg-slate-800 border-2 border-emerald-500/50 text-emerald-400 rounded-2xl flex items-center justify-center font-black uppercase tracking-widest">
                                    Completed ✓
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer Navigation (Mock) */}
            <footer className="h-16 bg-slate-800 border-t border-slate-700 flex items-center justify-around px-6">
                <button className="text-blue-400 flex flex-col items-center gap-1 opacity-100">
                    <span className="text-xl">🚚</span>
                    <span className="text-[10px] font-bold uppercase">Trip</span>
                </button>
                <button className="text-slate-500 flex flex-col items-center gap-1 opacity-50">
                    <span className="text-xl">🛡️</span>
                    <span className="text-[10px] font-bold uppercase">Safety</span>
                </button>
                <button className="text-slate-500 flex flex-col items-center gap-1 opacity-50">
                    <span className="text-xl">⚙️</span>
                    <span className="text-[10px] font-bold uppercase">Settings</span>
                </button>
            </footer>
            {/* QR Code Modal */}
            {showQR && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-sm w-full relative">
                        <button
                            onClick={() => setShowQR(null)}
                            className="absolute top-2 right-2 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                        >
                            <X size={20} />
                        </button>
                        <div className="p-4">
                            <DeliveryQR tripId={showQR} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverDashboard;
