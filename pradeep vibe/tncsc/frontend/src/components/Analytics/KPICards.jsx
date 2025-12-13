import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const KPICards = ({ data }) => {
    const { t } = useLanguage();

    const items = [
        { label: 'highRiskGodowns', value: data.highRiskGodowns, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'stockAtRisk', value: `${data.stockAtRisk} MT`, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'incidentsToday', value: data.incidentsToday, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'slaBreaches', value: data.slaBreaches, color: 'text-purple-600', bg: 'bg-purple-50' }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {items.map((item, index) => (
                <div key={index} className={`${item.bg} p-4 rounded-xl border border-slate-200 shadow-sm`}>
                    <p className="text-sm text-slate-500 font-medium mb-1">{t(item.label) || item.label}</p>
                    <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
            ))}
        </div>
    );
};

export default KPICards;
