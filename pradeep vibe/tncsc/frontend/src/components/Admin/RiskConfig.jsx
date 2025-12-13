import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const RiskConfig = () => {
    const { t } = useLanguage();
    const [rules, setRules] = useState({ humidityThreshold: 0, moistureThreshold: 0, stockAgeAlert: 0 });

    useEffect(() => {
        fetch('/api/admin/rules').then(res => res.json()).then(setRules);
    }, []);

    const handleChange = (key, value) => {
        setRules(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        fetch('/api/admin/rules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rules)
        })
            .then(res => res.json())
            .then(data => alert(data.message));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
                <h3 className="font-bold text-slate-700">{t('riskConfig') || 'Risk Configuration'}</h3>
            </div>

            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        {t('humidityThreshold') || 'Max Humidity Allowed'} (%)
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range" min="50" max="100"
                            value={rules.humidityThreshold || 0}
                            onChange={(e) => handleChange('humidityThreshold', e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="font-bold text-lg w-12 text-center text-blue-600">{rules.humidityThreshold}%</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        {t('moistureThreshold') || 'Max Grain Moisture'} (%)
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range" min="10" max="25" step="0.1"
                            value={rules.moistureThreshold || 0}
                            onChange={(e) => handleChange('moistureThreshold', e.target.value)}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                        />
                        <span className="font-bold text-lg w-12 text-center text-orange-600">{rules.moistureThreshold}%</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                        {t('stockAge') || 'Stock Aging Alert'} (Days)
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            value={rules.stockAgeAlert || 0}
                            onChange={(e) => handleChange('stockAgeAlert', e.target.value)}
                            className="border border-slate-300 rounded px-3 py-2 w-full font-bold text-slate-700"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <button
                        onClick={handleSave}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md transition-colors"
                    >
                        {t('saveConfig') || 'Update Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RiskConfig;
