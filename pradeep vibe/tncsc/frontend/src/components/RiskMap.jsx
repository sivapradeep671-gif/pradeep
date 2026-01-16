import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { api } from '../services/api';

// Fix for default marker icon in React Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RiskMap = () => {
    // const { t } = useLanguage(); // Unused
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await api.get('/godowns');
                if (response.success) {
                    const mappedData = response.data.map(g => ({
                        id: g.id,
                        lat: g.lat,
                        lng: g.lng,
                        name: g.name,
                        risk: g.riskScore > 75 ? 'High' : g.riskScore > 40 ? 'Medium' : 'Low',
                        stock: Math.floor(g.capacity * 0.8), // Simulated visual stock
                        humidity: g.riskScore > 75 ? 18 : 12 // Simulated correlation
                    }));
                    setLocations(mappedData);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchLocations();
    }, []);

    const getColor = (risk) => {
        if (risk === 'High') return '#ef4444';
        if (risk === 'Medium') return '#f97316';
        return '#10b981';
    };

    return (
        <div className="h-[500px] w-full bg-slate-100 rounded-xl overflow-hidden shadow-inner border border-slate-200 relative z-0">
            <MapContainer center={[10.7905, 78.7047]} zoom={7} scrollWheelZoom={true} className="h-full">
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Street Map">
                        <TileLayer
                            attribution='&copy; OpenStreetMap contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite (Precision)">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay checked name="Risk Locations">
                        <React.Fragment>
                            {locations.map(loc => (
                                <CircleMarker
                                    key={loc.id}
                                    center={[loc.lat, loc.lng]}
                                    pathOptions={{ color: getColor(loc.risk), fillColor: getColor(loc.risk), fillOpacity: 0.7 }}
                                    radius={12}
                                >
                                    <Popup>
                                        <div className="p-1 min-w-[200px]">
                                            <strong className="text-sm font-bold block mb-1">{loc.name}</strong>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`text-xs px-2 py-0.5 rounded text-white ${loc.risk === 'High' ? 'bg-red-500' : 'bg-green-500'}`}>
                                                    {loc.risk} Risk
                                                </span>
                                                <a
                                                    href={`https://www.google.com/maps?layer=c&cbll=${loc.lat},${loc.lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 text-xs font-bold underline"
                                                >
                                                    Street View 360°
                                                </a>
                                            </div>
                                            <div className="text-xs text-gray-600 space-y-1">
                                                <div>Stock: <b>{loc.stock} MT</b></div>
                                                <div>Humidity: <b>{loc.humidity}%</b></div>
                                            </div>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            ))}
                        </React.Fragment>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    );
};

export default RiskMap;
