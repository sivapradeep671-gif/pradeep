import React, { useState } from 'react';
import { api } from '../../services/api';
import { ScanLine, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

const ShopAcceptance = () => {
    const [tripId, setTripId] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await api.post(`/trips/${tripId}/scan`, {
                scannedTripId: tripId,
                receivedWeight: parseFloat(weight),
                shopId: 'SHOP-TEST-001'
            });

            if (res.success) {
                if (res.alert) {
                    setResult({ status: 'fraud', message: res.alert.message, data: res.data });
                } else {
                    setResult({ status: 'success', message: 'Delivery Verified & Accepted', data: res.data });
                }
            } else {
                setResult({ status: 'error', message: res.message });
            }
        } catch (err) {
            setResult({ status: 'error', message: 'Verification Failed. Invalid ID or Network Error.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-10">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <ScanLine size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Shop Acceptance</h2>
                    <p className="text-xs text-slate-500">Scan QR or Enter Trip details</p>
                </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Trip ID / QR Data</label>
                    <input
                        type="text"
                        value={tripId}
                        onChange={(e) => setTripId(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                        placeholder="TRIP-..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Received Weight (Kg)</label>
                    <div className="relative">
                        <Scale className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. 10000"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                    {loading ? 'Verifying...' : 'Verify & Accept'}
                </button>
            </form>

            {result && (
                <div className={`mt-6 p-4 rounded-lg border flex items-start gap-3 ${result.status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                        result.status === 'fraud' ? 'bg-red-50 border-red-200 text-red-800' :
                            'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                    {result.status === 'success' && <CheckCircle className="shrink-0" />}
                    {result.status === 'fraud' && <AlertTriangle className="shrink-0 animate-pulse" />}

                    <div>
                        <h4 className="font-bold text-sm uppercase mb-1">
                            {result.status === 'success' ? 'Verified' : result.status === 'fraud' ? 'FRAUD ALERT' : 'Error'}
                        </h4>
                        <p className="text-sm font-medium">{result.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopAcceptance;
