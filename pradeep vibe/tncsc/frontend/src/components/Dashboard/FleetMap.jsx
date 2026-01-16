import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

// Custom Icons
const createTruckIcon = (status) => {
    let color = '#10b981'; // Green (In Transit)
    if (status === 'Stopped' || status === 'Delayed') color = '#ef4444'; // Red
    if (status === 'Loading' || status === 'Unloading') color = '#f59e0b'; // Yellow

    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
    });
};

const FleetMap = () => {
    const [trucks, setTrucks] = useState([]);
    const [socket, setSocket] = useState(null);
    const [selectedTruck, setSelectedTruck] = useState(null);

    useEffect(() => {
        // Connect to WebSocket
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.on('fleet_update', (data) => {
            setTrucks(data);
        });

        return () => newSocket.disconnect();
    }, []);

    // Center map on Tamil Nadu
    const center = [11.1271, 78.6569];

    return (
        <div className="h-full relative">
            <MapContainer center={center} zoom={7} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {trucks.map((truck) => (
                    <Marker
                        key={truck.id}
                        position={[truck.lat, truck.lng]}
                        icon={createTruckIcon(truck.status)}
                        eventHandlers={{
                            click: () => setSelectedTruck(truck),
                        }}
                    >
                        <Popup>
                            <div className="text-xs font-sans">
                                <b>{truck.id}</b><br />
                                Status: {truck.status}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Truck Detail Overlay */}
            {selectedTruck && (
                <div className="absolute top-4 right-4 w-64 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-[1000] text-white animate-in slide-in-from-right-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">{selectedTruck.id}</h3>
                        <button onClick={() => setSelectedTruck(null)} className="text-slate-400 hover:text-white">✕</button>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Status</span>
                            <span className={`font-bold ${selectedTruck.status === 'In Transit' ? 'text-emerald-400' : 'text-red-400'}`}>{selectedTruck.status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Driver</span>
                            <span className="font-medium">{selectedTruck.driver}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Cargo</span>
                            <span className="font-medium">{selectedTruck.cargo} ({selectedTruck.weight})</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Speed</span>
                            <span className="font-medium">{selectedTruck.speed} km/h</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Destination</span>
                            <span className="font-medium">{selectedTruck.destination}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors">
                            Track Full Route
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Overlay */}
            <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur border border-slate-700 px-4 py-2 rounded-lg z-[1000] text-xs font-mono text-slate-300">
                Active Fleet: <span className="text-emerald-400 font-bold">{trucks.length} Units</span> |
                Moving: <span className="text-blue-400 font-bold">{trucks.filter(t => t.status === 'In Transit').length}</span>
            </div>
        </div>
    );
};

export default FleetMap;
