import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Calendar, Clock, Plus, Search, Filter, MoreHorizontal, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';

const Logistics = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTrip, setNewTrip] = useState({ truckId: '', origin: '', destination: '', driverId: '' });

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const res = await api.get('/trips');
            if (res.success) {
                setTrips(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch trips", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTrip = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/trips', newTrip);
            if (res.success) {
                setShowCreateModal(false);
                setNewTrip({ truckId: '', origin: '', destination: '', driverId: '' });
                fetchTrips(); // Refresh list
            }
        } catch (error) {
            console.error("Failed to create trip", error);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading Logistics Data...</div>;

    const activeTrips = trips.filter(t => t.status === 'In Transit' || t.status === 'Started').length;
    const delayedTrips = trips.filter(t => t.status === 'Delayed').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Logistics Operations</h1>
                    <p className="text-slate-500">Manage active trips, fleet assignment, and supply chain flow.</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                    <button className="flex items-center space-x-2 bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-600">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                        <Plus size={16} />
                        <span>Create Trip</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Total Trips</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">{trips.length}</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Active / In-Transit</p>
                            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{activeTrips}</h3>
                        </div>
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><MapPin size={20} /></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Delayed</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">{delayedTrips}</h3>
                        </div>
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg"><Clock size={20} /></div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">Efficiency</p>
                            <h3 className="text-2xl font-bold text-slate-800 mt-1">94%</h3>
                        </div>
                        <div className="p-2 bg-slate-50 text-slate-600 rounded-lg"><CheckCircle size={20} /></div>
                    </div>
                </div>
            </div>

            {/* Trips Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Recent Movements</h3>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Trip ID or Truck..."
                            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Trip ID</th>
                            <th className="px-6 py-4">Origin & Destination</th>
                            <th className="px-6 py-4">Truck / Driver</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {trips.length > 0 ? trips.map((trip) => (
                            <tr key={trip.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-600">#{trip.id.substring(0, 8)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                        <span className="font-medium text-slate-900">{trip.origin}</span>
                                    </div>
                                    <div className="h-4 border-l border-slate-300 ml-1 my-0.5"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="font-medium text-slate-900">{trip.destination}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-800">{trip.truckId}</div>
                                    <div className="text-xs text-slate-500">{trip.driverId || 'Unassigned'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${trip.status === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            trip.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                trip.status === 'Delayed' || trip.geofenceViolation ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-slate-50 text-slate-600 border-slate-200'
                                        }`}>
                                        {trip.status}
                                    </span>
                                    {trip.geofenceViolation && (
                                        <div className="text-[10px] text-red-600 font-bold mt-1">⚠️ Route Deviation</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No active trips found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Trip Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Create New Trip</h2>
                        <form onSubmit={handleCreateTrip} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Truck Number</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="TN-45-AA-1234"
                                    value={newTrip.truckId}
                                    onChange={e => setNewTrip({ ...newTrip, truckId: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Origin</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Thanjavur G1"
                                        value={newTrip.origin}
                                        onChange={e => setNewTrip({ ...newTrip, origin: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Destination</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Madurai FPS-20"
                                        value={newTrip.destination}
                                        onChange={e => setNewTrip({ ...newTrip, destination: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Driver ID (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="DRV-2023-001"
                                    value={newTrip.driverId}
                                    onChange={e => setNewTrip({ ...newTrip, driverId: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                                >
                                    Confirm Trip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logistics;
