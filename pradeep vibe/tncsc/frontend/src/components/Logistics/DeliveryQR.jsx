import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { api } from '../../services/api';
import { Truck, Package, MapPin } from 'lucide-react';

const DeliveryQR = ({ tripId }) => {
    const [qrData, setQrData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (tripId) fetchQR();
    }, [tripId]);

    const fetchQR = async () => {
        try {
            const res = await api.get(`/trips/${tripId}/qr`);
            if (res.success) {
                setQrData(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-4 text-center">Generating Digital Handshake...</div>;

    if (!qrData) return <div className="p-4 text-red-500">Failed to load QR Code</div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col items-center text-center max-w-sm mx-auto">
            <h3 className="font-bold text-lg text-slate-800 mb-2">Delivery Handshake</h3>
            <p className="text-sm text-slate-500 mb-6">Present this to the Shop Keeper</p>

            <div className="p-4 bg-white border-4 border-slate-900 rounded-xl mb-6">
                <QRCodeCanvas
                    value={JSON.stringify(qrData)}
                    size={200}
                    level={"H"}
                />
            </div>

            <div className="w-full space-y-3 text-left bg-slate-50 p-4 rounded-lg text-sm">
                <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><Truck size={14} /> Truck ID</span>
                    <span className="font-bold">{qrData.truckId}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><Package size={14} /> Cargo</span>
                    <span className="font-bold">{qrData.sentWeight}kg ({qrData.commodity})</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><MapPin size={14} /> Origin</span>
                    <span className="font-bold">{qrData.origin}</span>
                </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">Signed by TNCSC Logistics Authority</p>
        </div>
    );
};

export default DeliveryQR;
