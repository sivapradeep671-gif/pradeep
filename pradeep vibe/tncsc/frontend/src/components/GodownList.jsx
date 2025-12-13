import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const GodownList = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [godowns, setGodowns] = useState([]);

    useEffect(() => {
        // Fetch same data as map for list view
        fetch('/api/risk-map')
            .then(res => res.json())
            .then(data => setGodowns(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">{t('inventory')}</h3>
                <span className="text-xs text-slate-500">Updated: Just now</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                {godowns.map(g => (
                    <div
                        key={g.id}
                        onClick={() => navigate(`/godown/${g.id}`)}
                        className="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-center"
                    >
                        <div>
                            <div className="font-bold text-slate-800">{g.name}</div>
                            <div className="text-xs text-slate-500 mt-1">ID: G-00{g.id} • Last Insp: {g.lastInspection}</div>
                        </div>
                        <div className="text-right">
                            <div className={`text-xs font-bold px-2 py-1 rounded inline-block mb-1 ${g.risk === 'High' ? 'bg-red-100 text-red-700' :
                                    g.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                }`}>
                                {g.risk}
                            </div>
                            <div className="text-xs text-slate-600 font-medium">{g.stock} MT</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GodownList;
