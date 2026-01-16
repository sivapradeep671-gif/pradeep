import React, { useState } from 'react';

const ConsignmentForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        commodity: 'Rice',
        quantity: 50,
        origin: 'TNJ001 (Thanjavur)',
        destination: 'CHE009 (Chennai)',
        driverId: 'D-102',
        truckNo: 'TN-01-AX-4567'
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const newMovement = {
                id: Date.now(),
                ...formData,
                status: 'PENDING',
                timestamp: new Date().toISOString()
            };
            onSave(newMovement);
            setLoading(false);
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up border border-slate-200">
                <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Create Consignment</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Movement Authorization Form</p>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-500 transition-all">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Commodity</label>
                            <select
                                className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.commodity}
                                onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                            >
                                <option>Rice</option>
                                <option>Wheat</option>
                                <option>Sugar</option>
                                <option>Paddy</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Quantity (MT)</label>
                            <input
                                type="number"
                                className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Origin Godown</label>
                        <input
                            type="text"
                            className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                            value={formData.origin}
                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Destination</label>
                        <input
                            type="text"
                            className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Driver ID</label>
                            <input
                                type="text"
                                className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.driverId}
                                onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Truck Reg No.</label>
                            <input
                                type="text"
                                className="w-full bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.truckNo}
                                onChange={(e) => setFormData({ ...formData, truckNo: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-emerald-200'}`}
                        >
                            {loading ? 'Authorizing Movement...' : 'Confirm & Authorize Dispatch'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConsignmentForm;
