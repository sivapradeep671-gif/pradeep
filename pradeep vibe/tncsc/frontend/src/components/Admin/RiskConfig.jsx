import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';

const RiskConfig = () => {
    const { t } = useLanguage();
    const [rules, setRules] = useState({ humidityThreshold: 80, moistureThreshold: 14, stockAgeAlert: 90 });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await api.get('/admin/rules');
                if (res.success) setRules(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRules();
    }, []);

    const handleChange = (key, value) => {
        setRules(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await api.post('/admin/rules', rules);
            if (res.success) alert('System Rules Updated Successfully');
        } catch (err) {
            alert('Failed to update rules');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading configurations...</div>;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-slide-in">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t('riskConfig') || 'System Governance & Thresholds'}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Configure automated alert triggers for the entire network</p>
            </div>

            <div className="p-8 space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-widest">
                            {t('humidityThreshold') || 'Ambient Humidity Threshold'}
                        </label>
                        <span className={`text-lg font-black ${rules.humidityThreshold > 80 ? 'text-red-500' : 'text-indigo-600'}`}>{rules.humidityThreshold}%</span>
                    </div>
                    <input
                        type="range" min="50" max="100"
                        value={rules.humidityThreshold}
                        onChange={(e) => handleChange('humidityThreshold', parseInt(e.target.value))}
                        className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <p className="text-[10px] text-slate-400 font-bold italic">Alerts will be raised if godown humidity exceeds this value for more than 4 hours.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-widest">
                            {t('moistureThreshold') || 'Max Grain Moisture (Safe Limit)'}
                        </label>
                        <span className={`text-lg font-black ${rules.moistureThreshold > 14 ? 'text-red-500' : 'text-emerald-600'}`}>{rules.moistureThreshold}%</span>
                    </div>
                    <input
                        type="range" min="10" max="25" step="0.1"
                        value={rules.moistureThreshold}
                        onChange={(e) => handleChange('moistureThreshold', parseFloat(e.target.value))}
                        className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <p className="text-[10px] text-slate-400 font-bold italic">Standard safe storage moisture is 14%. Values above this trigger quality incidents.</p>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-widest block">
                        {t('stockAge') || 'Stock Aging Threshold (FIFO Violation)'}
                    </label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="number"
                            value={rules.stockAgeAlert}
                            onChange={(e) => handleChange('stockAgeAlert', parseInt(e.target.value))}
                            className="bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-black text-slate-800 outline-none focus:border-indigo-500 w-32"
                        />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Days in Storage</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl transition-all ${saving ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-black active:scale-[0.98] shadow-slate-100 font-black'}`}
                    >
                        {saving ? 'Synchronizing Governance Rules...' : 'Apply Global Thresholds'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RiskConfig;
