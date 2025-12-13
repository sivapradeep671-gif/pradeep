import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const UserManagement = () => {
    const { t } = useLanguage();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/admin/users').then(res => res.json()).then(setUsers);
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">{t('userManagement') || 'User Management'}</h3>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow hover:bg-blue-700">
                    + {t('newUser') || 'Add User'}
                </button>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                    <tr>
                        <th className="px-6 py-3">{t('name') || 'Name'}</th>
                        <th className="px-6 py-3">{t('role') || 'Role'}</th>
                        <th className="px-6 py-3">{t('region') || 'Region'}</th>
                        <th className="px-6 py-3">{t('lastActive') || 'Last Active'}</th>
                        <th className="px-6 py-3">{t('action') || 'Action'}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                            <td className="px-6 py-4 font-bold text-slate-700">{user.name}</td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded text-xs">{user.role}</span>
                            </td>
                            <td className="px-6 py-4">{user.region}</td>
                            <td className="px-6 py-4 text-emerald-600 font-medium">{user.lastActive}</td>
                            <td className="px-6 py-4">
                                <button className="text-slate-400 hover:text-red-600 font-bold text-xs uppercase">
                                    {t('revoke') || 'Revoke'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
