import React, { useState } from 'react';
import { api } from '../../services/api';

const AddGodownModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        district: 'Thanjavur',
        capacity: 5000,
        manager: '',
        lat: 10.7870,
        lng: 79.1378
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/godowns', formData);
            if (res.success) {
                alert('Storage Facility Registered');
                onSave();
            }
        } catch (err) {
            alert('Registration Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
                <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-tight">Register New Facility</h2>
                        <p className="text-[10px] font-bold uppercase opacity-80">TNCSC Strategic Storage Expansion</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors text-xl">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Facility ID</label>
                            <input
                                required placeholder="e.g. TNJ002"
                                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.id}
                                onChange={e => setFormData({ ...formData, id: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Facility Name</label>
                            <input
                                required placeholder="e.g. Kumbakonam Unit 2"
                                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">District Jurisdiction</label>
                            <select
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-2 py-3 text-xs font-black uppercase tracking-tighter outline-none focus:border-emerald-500"
                                value={formData.district}
                                onChange={e => setFormData({ ...formData, district: e.target.value })}
                            >
                                <option value="Thanjavur">Thanjavur</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Madurai">Madurai</option>
                                <option value="Salem">Salem</option>
                                <option value="Coimbatore">Coimbatore</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Max Capacity (MT)</label>
                            <input
                                type="number"
                                className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                                value={formData.capacity}
                                onChange={e => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Facility Manager</label>
                        <input
                            placeholder="Full Name of Nodal Officer"
                            className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all"
                            value={formData.manager}
                            onChange={e => setFormData({ ...formData, manager: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-lg ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-emerald-100'}`}
                        >
                            {loading ? 'Initializing Asset...' : 'Authorize Facility Deployment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGodownModal;
