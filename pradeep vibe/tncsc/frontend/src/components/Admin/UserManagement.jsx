import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';

const UserManagement = () => {
    const { t } = useLanguage();
    const [users, setUsers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'FieldOfficer', district: 'Thanjavur' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/users');
            if (res.success) setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/admin/users', formData);
            if (res.success) {
                alert('User added successfully');
                setShowAddModal(false);
                fetchUsers();
            }
        } catch (err) {
            alert('Failed to add user');
        }
    };

    const handleRevoke = async (id) => {
        if (!window.confirm('Are you sure you want to revoke access?')) return;
        try {
            const res = await api.delete(`/admin/users/${id}`);
            if (res.success) {
                alert('Access Revoked');
                fetchUsers();
            }
        } catch (err) {
            alert('Revoke failed');
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-slide-in">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{t('userManagement') || 'User Management'}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Total Active Personel: {users.length}</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 transition-all"
                >
                    + {t('newUser') || 'Deploy Personnel'}
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50/80 border-b">
                        <tr>
                            <th className="px-6 py-4 font-black">{t('name') || 'Personnel Name'}</th>
                            <th className="px-6 py-4 font-black">{t('role') || 'Access Role'}</th>
                            <th className="px-6 py-4 font-black">{t('region') || 'Assigned District'}</th>
                            <th className="px-6 py-4 font-black">{t('lastActive') || 'Last Sync'}</th>
                            <th className="px-6 py-4 font-black">{t('action') || 'Authorization'}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan="5" className="p-10 text-center text-slate-400 font-bold">Loading personnel data...</td></tr>
                        ) : users.map((user) => (
                            <tr key={user.id} className="bg-white hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="font-black text-slate-800">{user.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{user.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${user.role === 'HQ' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs font-bold text-slate-600">{user.district}</td>
                                <td className="px-6 py-4 text-xs font-bold text-emerald-600">{user.lastActive || 'Today'}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRevoke(user.id)}
                                        className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        {t('revoke') || 'Revoke Access'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                            <h2 className="text-lg font-black uppercase tracking-tight">Deploy Personnel</h2>
                            <button onClick={() => setShowAddModal(false)}>✕</button>
                        </div>
                        <form onSubmit={handleAddUser} className="p-8 space-y-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</label>
                                <input
                                    required
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Identity</label>
                                <input
                                    required type="email"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-indigo-500 transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Access Role</label>
                                    <select
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-2 py-3 text-xs font-black uppercase tracking-tighter outline-none focus:border-indigo-500"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="HQ">HQ Command</option>
                                        <option value="FieldOfficer">Field Officer</option>
                                        <option value="Driver">Driver</option>
                                        <option value="HQAnalyst">Analyst</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">District</label>
                                    <select
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-2 py-3 text-xs font-black uppercase tracking-tighter outline-none focus:border-indigo-500"
                                        value={formData.district}
                                        onChange={e => setFormData({ ...formData, district: e.target.value })}
                                    >
                                        <option value="Thanjavur">Thanjavur</option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Madurai">Madurai</option>
                                        <option value="Salem">Salem</option>
                                    </select>
                                </div>
                            </div>
                            <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all mt-4">
                                Confirm Authorization
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
