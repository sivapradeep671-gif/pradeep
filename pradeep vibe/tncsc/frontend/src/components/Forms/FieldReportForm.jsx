import React, { useState } from 'react';
import { Camera, X, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FieldReportForm = ({ onClose }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    // Initial State Structure matching Government Schema
    const [formData, setFormData] = useState({
        metadata: {
            district: 'Thanjavur',
            taluk: '',
            godownId: '',
            inspectionType: 'Routine',
            officerName: 'Ram Kumar',
            designation: 'Inspector',
            teamMembers: ''
        },
        checklist: {
            stockPosition: 'Yes',
            qualityCondition: 'Yes',
            storageSafety: 'Yes',
            recordsMaintained: 'Yes',
            cleanliness: 'Yes',
            grievances: 'No', // "No" grievances pending is good
            remarks: ''
        },
        compliance: {
            rulesFollowed: 'Yes',
            irregularities: [],
            nfsaCompliance: 'High'
        },
        action: {
            recommendations: '',
            deadline: '',
            disciplinaryRecommended: false
        }
    });

    const updateField = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/reports/field', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert(t('inspectionReport') + ' Submitted Successfully!');
                onClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const renderStep1_Metadata = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h4 className="font-bold text-emerald-800 border-b pb-2 mb-4">{t('metadata')}</h4>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t('district')}</label>
                    <input type="text" value={formData.metadata.district} readOnly className="w-full bg-gray-100 border rounded p-2 text-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t('taluk')}</label>
                    <input
                        type="text"
                        value={formData.metadata.taluk}
                        onChange={(e) => updateField('metadata', 'taluk', e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                        placeholder="Taluk Name"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t('godownId')}</label>
                    <select
                        value={formData.metadata.godownId}
                        onChange={(e) => updateField('metadata', 'godownId', e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                    >
                        <option value="">Select Godown...</option>
                        <option value="TNJ001">TNJ001 - Thanjavur Main</option>
                        <option value="TNJ002">TNJ002 - Kumbakonam Central</option>
                        <option value="MDU005">MDU005 - Madurai Kappalur</option>
                        <option value="CHE012">CHE012 - Ambattur FCI</option>
                        <option value="TVR008">TVR008 - Mannargudi DPC</option>
                        <option value="CBE003">CBE003 - Coimbatore West</option>
                        <option value="VPM004">VPM004 - Villupuram Junction</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Upload Photo</label>
                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-blue-50 text-blue-600 px-3 py-2 rounded text-xs font-bold border border-blue-200 hover:bg-blue-100 flex items-center gap-1">
                            <Camera size={14} /> Capture / Upload
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => updateField('metadata', 'photo', e.target.files[0])} />
                        </label>
                        {formData.metadata.photo && <span className="text-xs text-green-600 font-bold">✓ Attached</span>}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t('inspectionType')}</label>
                    <select
                        value={formData.metadata.inspectionType}
                        onChange={(e) => updateField('metadata', 'inspectionType', e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                    >
                        <option value="Routine">{t('routine')}</option>
                        <option value="Surprise">{t('surprise')}</option>
                        <option value="Special">{t('special')}</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t('designation')}</label>
                    <select
                        value={formData.metadata.designation}
                        onChange={(e) => updateField('metadata', 'designation', e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                    >
                        <option value="Inspector">{t('inspector')}</option>
                        <option value="TSO">{t('tso')}</option>
                        <option value="DSO">{t('dso')}</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{t('teamMembers')}</label>
                    <input
                        type="text"
                        value={formData.metadata.teamMembers}
                        onChange={(e) => updateField('metadata', 'teamMembers', e.target.value)}
                        className="w-full border rounded p-2 text-sm"
                        placeholder="Names..."
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2_Checklist = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h4 className="font-bold text-blue-800 border-b pb-2 mb-4">{t('checklist')}</h4>
            {[
                { key: 'stockPosition', label: t('stockPosition') },
                { key: 'qualityCondition', label: t('qualityCondition') },
                { key: 'storageSafety', label: t('storageSafety') },
                { key: 'recordsMaintained', label: t('recordsMaintained') },
                { key: 'cleanliness', label: t('cleanliness') }
            ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => updateField('checklist', item.key, 'Yes')}
                            className={`px-3 py-1 rounded text-xs font-bold ${formData.checklist[item.key] === 'Yes' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                        >
                            {t('yes')}
                        </button>
                        <button
                            type="button"
                            onClick={() => updateField('checklist', item.key, 'No')}
                            className={`px-3 py-1 rounded text-xs font-bold ${formData.checklist[item.key] === 'No' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                        >
                            {t('no')}
                        </button>
                    </div>
                </div>
            ))}
            <textarea
                className="w-full border rounded p-2 text-sm mt-4"
                rows="2"
                placeholder="Overall Remarks / Observations..."
                value={formData.checklist.remarks}
                onChange={(e) => updateField('checklist', 'remarks', e.target.value)}
            />
        </div>
    );

    const renderStep3_Compliance = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h4 className="font-bold text-orange-800 border-b pb-2 mb-4">{t('compliance')}</h4>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('rulesFollowed')}</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="rules"
                            checked={formData.compliance.rulesFollowed === 'Yes'}
                            onChange={() => updateField('compliance', 'rulesFollowed', 'Yes')}
                        />
                        <span className="text-sm">Fully Compliant</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="rules"
                            checked={formData.compliance.rulesFollowed === 'No'}
                            onChange={() => updateField('compliance', 'rulesFollowed', 'No')}
                        />
                        <span className="text-sm font-bold text-red-600">Deviations Found</span>
                    </label>
                </div>
            </div>

            {formData.compliance.rulesFollowed === 'No' && (
                <div className="bg-red-50 p-3 rounded border border-red-200">
                    <label className="block text-xs font-bold text-red-800 mb-1">{t('irregularities')}</label>
                    <select
                        className="w-full border rounded p-2 text-sm text-red-700 font-medium"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val && !formData.compliance.irregularities.includes(val)) {
                                updateField('compliance', 'irregularities', [...formData.compliance.irregularities, val]);
                            }
                        }}
                    >
                        <option value="">Select Irregularity Type...</option>
                        <option value="Shortage">Stock Shortage (Physical vs Book)</option>
                        <option value="Diversion">Suspected Diversion</option>
                        <option value="Quality">Poor Quality / Adulteration</option>
                        <option value="Records">Record Tampering</option>
                    </select>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.compliance.irregularities.map((irr, idx) => (
                            <span key={idx} className="bg-red-200 text-red-800 text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1">
                                {irr}
                                <button type="button" onClick={() => {
                                    const newList = formData.compliance.irregularities.filter(i => i !== irr);
                                    updateField('compliance', 'irregularities', newList);
                                }}>×</button>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep4_Action = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <h4 className="font-bold text-purple-800 border-b pb-2 mb-4">{t('action')}</h4>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('recommendations')}</label>
                <textarea
                    className="w-full border rounded p-2 text-sm h-24"
                    placeholder="Directives given to Godown In-charge..."
                    value={formData.action.recommendations}
                    onChange={(e) => updateField('action', 'recommendations', e.target.value)}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('deadline')}</label>
                <input
                    type="date"
                    className="w-full border rounded p-2 text-sm"
                    value={formData.action.deadline}
                    onChange={(e) => updateField('action', 'deadline', e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                <input
                    type="checkbox"
                    id="disciplinary"
                    className="w-5 h-5 text-red-600 rounded"
                    checked={formData.action.disciplinaryRecommended}
                    onChange={(e) => updateField('action', 'disciplinaryRecommended', e.target.checked)}
                />
                <label htmlFor="disciplinary" className="text-sm font-bold text-red-700 cursor-pointer">
                    {t('disciplinary')}
                </label>
            </div>
            {formData.action.disciplinaryRecommended && (
                <p className="text-xs text-red-500 mt-1 pl-8">⚠️ This will escalate the report directly to the Vigilance Cell.</p>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="font-bold text-xl text-slate-800">{t('inspectionReport')}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            Step {step} of 4: {
                                step === 1 ? t('metadata') :
                                    step === 2 ? t('checklist') :
                                        step === 3 ? t('compliance') : t('action')
                            }
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shadow-sm border border-slate-100">
                        <X size={20} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-1.5">
                    <div
                        className="bg-emerald-500 h-1.5 transition-all duration-300 ease-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8">
                    {step === 1 && renderStep1_Metadata()}
                    {step === 2 && renderStep2_Checklist()}
                    {step === 3 && renderStep3_Compliance()}
                    {step === 4 && renderStep4_Action()}
                </form>

                {/* Footer / Navigation */}
                <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                        className="px-6 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all flex items-center gap-2"
                    >
                        {step > 1 ? <><ChevronLeft size={16} /> Back</> : t('cancel')}
                    </button>

                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            className="px-6 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700 shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
                        >
                            {submitting ? 'Submitting...' : <>{t('submit')} <Save size={16} /></>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FieldReportForm;
