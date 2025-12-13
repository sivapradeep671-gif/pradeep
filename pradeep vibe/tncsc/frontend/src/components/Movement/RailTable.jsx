import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const RailTable = ({ data }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3">{t('trainNo') || 'Train No'}</th>
                            <th className="px-6 py-3">{t('wagons') || 'Wagons'}</th>
                            <th className="px-6 py-3">{t('commodity') || 'Commodity'}</th>
                            <th className="px-6 py-3">{t('source') || 'Source Depot'}</th>
                            <th className="px-6 py-3">{t('destination') || 'Destination'}</th>
                            <th className="px-6 py-3">{t('eta') || 'ETA'}</th>
                            <th className="px-6 py-3">{t('status') || 'Status'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono font-bold text-slate-700">{row.trainNo}</td>
                                <td className="px-6 py-4">{row.wagons}</td>
                                <td className="px-6 py-4">{row.commodity}</td>
                                <td className="px-6 py-4">{row.source}</td>
                                <td className="px-6 py-4">{row.destination}</td>
                                <td className="px-6 py-4 font-bold">{row.eta}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.status.includes('Verified') ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RailTable;
