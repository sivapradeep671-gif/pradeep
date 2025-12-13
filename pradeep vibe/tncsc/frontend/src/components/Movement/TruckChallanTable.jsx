import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const TruckChallanTable = ({ data, type }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-3">{t('date') || 'Date'}</th>
                            <th className="px-6 py-3">{t('truckNo') || 'Truck No'}</th>
                            <th className="px-6 py-3">{t('commodity') || 'Commodity'}</th>
                            <th className="px-6 py-3">{t('quantity') || 'Quantity'}</th>
                            <th className="px-6 py-3">{type === 'INWARD' ? (t('source') || 'Source') : (t('destination') || 'Destination')}</th>
                            <th className="px-6 py-3">{t('status') || 'Status'}</th>
                            <th className="px-6 py-3">{t('action') || 'Action'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-slate-500">{row.date}</td>
                                <td className="px-6 py-4 font-bold text-slate-700">{row.truckNo}</td>
                                <td className="px-6 py-4">{row.commodity}</td>
                                <td className="px-6 py-4 font-bold">{row.quantity}</td>
                                <td className="px-6 py-4">{type === 'INWARD' ? row.source : row.destination}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.status === 'Completed' || row.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            row.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 font-bold text-xs underline">
                                        {t('viewManifest') || 'View Manifest'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TruckChallanTable;
