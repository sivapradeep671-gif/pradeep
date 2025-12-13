import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ComplianceWidget = () => {
    const { t } = useLanguage();

    const resources = [
        { title: 'Stock Verification Form (Form A)', type: 'PDF', size: '2.4 MB' },
        { title: 'Inspection Template (High Risk)', type: 'DOCX', size: '1.1 MB' },
        { title: 'Standard Operating Procedure (SOP) v4.2', type: 'PDF', size: '5.6 MB' },
        { title: 'Latest Circulars - Monsoon Prep', type: 'PDF', size: '890 KB' }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span>📚</span> {t('forms') || 'Official Downloads'}
                </h3>
                <div className="space-y-3">
                    {resources.map((res, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="bg-white px-2 py-1 rounded border border-slate-200 text-xs font-bold text-slate-500">{res.type}</span>
                                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{res.title}</span>
                            </div>
                            <span className="text-xs text-slate-400">{res.size}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-100 transition-all">
                    View All Repository
                </button>
            </div>

            {/* Escalation Matrix */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span>⚠️</span> {t('escalation') || 'Escalation Matrix'}
                </h3>
                <div className="relative">
                    {/* Visual Workflow */}
                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200"></div>

                    <div className="space-y-6 relative">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center z-10 font-bold text-emerald-700 shadow-sm text-xs">
                                L1
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Godown In-Charge</h4>
                                <p className="text-xs text-slate-500">Immediate resolution of moisture/pest alerts.</p>
                                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded mt-1 inline-block">SLA: 4 Hours</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center z-10 font-bold text-orange-700 shadow-sm text-xs">
                                L2
                            </div>
                            <div>
                                <p className="text-xs text-slate-500">If stock value at risk &gt; ₹50L or unresolved L1.</p>
                                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded mt-1 inline-block">SLA: 24 Hours</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white border-2 border-red-500 rounded-full flex items-center justify-center z-10 font-bold text-red-700 shadow-sm text-xs">
                                L3
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">HQ General Manager</h4>
                                <p className="text-xs text-slate-500">Critical structural failure or mass spoilage risk.</p>
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded mt-1 inline-block">SLA: Immediate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplianceWidget;
