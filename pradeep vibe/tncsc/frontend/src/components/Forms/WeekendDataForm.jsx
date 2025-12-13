import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const WeekendDataForm = ({ onClose }) => {
    const { t } = useLanguage();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/reports/weekend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                alert('Weekend Data Submitted Successfully');
                onClose();
            }
        } catch (error) {
            console.error('Submission failed', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-50">
                    <h3 className="font-bold text-gray-800">{t('uploadWeekend')}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('weekNumber')}</label>
                        <input name="weekNumber" type="number" required className="w-full border rounded p-2 text-sm" placeholder="e.g., 42" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('godownId')}</label>
                        <input name="godownId" type="text" required className="w-full border rounded p-2 text-sm" placeholder="e.g., ALL or Specific ID" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('stockLevel')}</label>
                        <input name="stockLevel" type="number" required className="w-full border rounded p-2 text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('staffAttendance')}</label>
                        <input name="staffAttendance" type="number" min="0" max="100" className="w-full border rounded p-2 text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('maintenance')}</label>
                        <textarea name="maintenance" rows="2" className="w-full border rounded p-2 text-sm" placeholder="Any maintenance required..."></textarea>
                    </div>

                    <div className="pt-2 flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 border border-gray-300 rounded text-gray-600 text-sm font-medium hover:bg-gray-50"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitting ? 'Sending...' : t('submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WeekendDataForm;
