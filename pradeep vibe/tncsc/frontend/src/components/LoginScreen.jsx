import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    // Force deployment update
    const navigate = useNavigate();
    const [role, setRole] = useState('FieldOfficer');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Clear session on mount to ensure clean slate
        localStorage.removeItem('tncsc_user');
        localStorage.removeItem('tncsc_role');
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Mock Auth Persistence
        const mockUser = { id: Date.now(), username, role };
        localStorage.setItem('tncsc_user', JSON.stringify(mockUser));
        localStorage.setItem('tncsc_role', role);

        if (role === 'HQAnalyst' || role === 'Admin') navigate('/dashboard');
        else if (role === 'FieldOfficer') navigate('/field'); // Added specific navigation for FieldOfficer
        else navigate('/dashboard'); // Fallback for any other role
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-100 font-sans p-4">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
                <div className="flex flex-col items-center mb-8">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg" alt="TN Emblem" className="w-16 h-16 mb-4" />
                    <h1 className="text-xl font-extrabold text-slate-900 uppercase tracking-tighter text-center">TNCSC RiskGuard</h1>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Government of Tamil Nadu (v2.0)</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Your Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border-2 border-slate-100 rounded-xl p-3 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all outline-none font-medium"
                        >
                            <option value="FieldOfficer">Field Officer (Godown/DPC)</option>
                            <option value="HQAnalyst">HQ/District Analyst</option>
                            <option value="Admin">System Administrator</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Government ID / Username</label>
                            <input type="text" required className="w-full border-2 border-slate-100 rounded-xl p-3 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all outline-none" placeholder="e.g. tncsc-off-123" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Password</label>
                            <input type="password" required className="w-full border-2 border-slate-100 rounded-xl p-3 bg-slate-50 focus:border-emerald-500 focus:bg-white transition-all outline-none" placeholder="••••••••" />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-700 transform active:scale-[0.98] transition-all shadow-lg shadow-emerald-200">
                        Secure Sign In
                    </button>

                    <div className="pt-4 text-center">
                        <a href="#" className="text-xs text-blue-600 font-bold hover:underline">Forgot Credentials?</a>
                    </div>
                </form>

                <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Authorized Access Only • TNeGA Secure Layer</p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
