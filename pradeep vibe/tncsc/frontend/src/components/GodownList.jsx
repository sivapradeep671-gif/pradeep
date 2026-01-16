import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import QualityCheckModal from './HQ/QualityCheckModal';

const GodownList = ({ searchTerm = '' }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [godowns, setGodowns] = useState([]);
    const [selectedGodown, setSelectedGodown] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/godowns');
                if (response.success) setGodowns(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const filteredGodowns = godowns.filter(g =>
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">{t('inventory')}</h3>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest text-emerald-600">● Live Sensors</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {filteredGodowns.map(g => (
                    <div
                        key={g.id}
                        className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center group cursor-default"
                    >
                        <div onClick={() => navigate(`/godown/${g.id}`)} className="cursor-pointer flex-1">
                            <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{g.name}</div>
                            <div className="text-xs text-slate-500 mt-1 font-medium">ID: G-00{g.id} • {g.district}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className={`text-[10px] font-black px-2 py-0.5 rounded inline-block mb-1 uppercase tracking-tighter ${g.risk === 'High' ? 'bg-red-100 text-red-700' :
                                    g.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                    {g.risk} Risk
                                </div>
                                <div className="text-xs text-slate-600 font-bold tracking-tight">{g.stock} MT</div>
                            </div>
                            <button
                                onClick={() => setSelectedGodown(g)}
                                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center font-bold text-xs"
                                title="Quick Inspection"
                            >
                                🔍
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedGodown && (
                <QualityCheckModal
                    godown={selectedGodown}
                    onClose={() => setSelectedGodown(null)}
                    onSave={() => {
                        setSelectedGodown(null);
                        // Refresh data
                    }}
                />
            )}
        </div>
    );
};

export default GodownList;
