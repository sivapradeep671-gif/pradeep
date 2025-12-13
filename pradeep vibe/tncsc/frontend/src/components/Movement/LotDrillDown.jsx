import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LotDrillDown = ({ godownId, onClose }) => {
    const { t } = useLanguage();
    const [lots, setLots] = useState([]);

    useEffect(() => {
        fetch(`/api/stock/lots/${godownId}`)
            .then(res => res.json())
            .then(data => setLots(data));
    }, [godownId]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{t('stockLots') || 'Stock Lot Details'}</h3>
                        <p className="text-xs text-slate-500">{t('godown') || 'Godown'}: {godownId}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-100 text-xs uppercase text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Stack No</th>
                                <th className="px-4 py-3">Commodity</th>
                                <th className="px-4 py-3 text-right">Bags</th>
                                <th className="px-4 py-3 text-right">Weight</th>
                                <th className="px-4 py-3 text-center">Moisture</th>
                                <th className="px-4 py-3 text-center">Age</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {lots.map(lot => (
                                <tr key={lot.id} className="hover:bg-blue-50/50">
                                    <td className="px-4 py-3 font-mono font-bold text-slate-700">{lot.stackNo}</td>
                                    <td className="px-4 py-3">{lot.commodity} <span className="text-xs text-gray-400">({lot.grade})</span></td>
                                    <td className="px-4 py-3 text-right">{lot.bags}</td>
                                    <td className="px-4 py-3 text-right font-bold">{lot.weight}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${parseFloat(lot.moisture) > 13 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {lot.moisture}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center text-slate-500">{lot.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50 border-t flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold text-sm">
                        {t('close') || 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LotDrillDown;
