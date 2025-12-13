import React, { useState } from 'react';
import UserManagement from './UserManagement';
import RiskConfig from './RiskConfig';
import ComplianceWidget from './ComplianceWidget';
import { useLanguage } from '../../context/LanguageContext';

const AdminPanel = () => {
    const { t } = useLanguage();
    const [subTab, setSubTab] = useState('USERS');

    return (
        <div className="space-y-6 animate-slide-in">
            <div className="bg-white p-1 rounded-lg border border-slate-200 inline-flex shadow-sm mb-4">
                <button
                    onClick={() => setSubTab('USERS')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${subTab === 'USERS' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {t('users') || 'Users & Roles'}
                </button>
                <button
                    onClick={() => setSubTab('CONFIG')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${subTab === 'CONFIG' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {t('configuration') || 'System Configuration'}
                </button>
                <button
                    onClick={() => setSubTab('RESOURCES')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${subTab === 'RESOURCES' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    {t('resources') || 'Resources & Compliance'}
                </button>
            </div>

            <div className="space-y-6">
                {subTab === 'USERS' && <UserManagement />}
                {subTab === 'CONFIG' && <RiskConfig />}
                {subTab === 'RESOURCES' && <ComplianceWidget />}
            </div>
            {/* Audit Log Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 opacity-60">
                <h3 className="font-bold text-slate-700 mb-2">{t('auditLog') || 'System Audit Log'}</h3>
                <div className="space-y-3">
                    <div className="text-xs text-slate-500 border-b pb-2">Admin updated humidity threshold to 82% • 2 mins ago</div>
                    <div className="text-xs text-slate-500 border-b pb-2">User K. Meera logged in from Thanjavur • 2 hours ago</div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
