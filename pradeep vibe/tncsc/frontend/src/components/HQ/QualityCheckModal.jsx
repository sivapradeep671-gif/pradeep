import React, { useState } from 'react';
import { api } from '../../services/api';

const QualityCheckModal = ({ godown, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        moisture: 12.5,
        pests: 'None',
        notes: '',
        samplePhoto: null
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/inspections', {
                godownId: godown.id,
                ...formData
            });
            if (response.success) {
                alert('Quality Check Recorded Successfully. Risk scores updated.');
                onSave();
            }
        } catch (err) {
            console.error(err);
            alert('Failed to record inspection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-tight">Quality Inspection</h2>
                        <p className="text-[10px] font-bold uppercase opacity-80">{godown.name} (G-00{godown.id})</p>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors text-xl">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Moisture Content (%)</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range" min="5" max="25" step="0.1"
                                className="flex-1 accent-emerald-600"
                                value={formData.moisture}
                                onChange={(e) => setFormData({ ...formData, moisture: parseFloat(e.target.value) })}
                            />
                            <span className={`text-lg font-black w-14 text-right ${formData.moisture > 14 ? 'text-red-600' : 'text-emerald-600'}`}>
                                {formData.moisture}%
                            </span>
                        </div>
                        {formData.moisture > 14 && (
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-tight animate-pulse">⚠️ Alert: Exceeds safe storage limit</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Pest Activity</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['None', 'Trace', 'Active'].map(p => (
                                <button
                                    key={p} type="button"
                                    onClick={() => setFormData({ ...formData, pests: p })}
                                    className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.pests === p ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Inspection Notes</label>
                        <textarea
                            className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-bold outline-none transition-all resize-none h-24"
                            placeholder="Describe any visible issues..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-emerald-200'}`}
                        >
                            {loading ? 'Submitting Report...' : 'Finalize Inspection Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default QualityCheckModal;
