import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('field');

    const handleLogin = (e) => {
        e.preventDefault();
        if (role === 'hq') navigate('/hq');
        else navigate('/field');
    };

    return (
        <div className="h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="field">Field Officer</option>
                            <option value="hq">HQ Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter username" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input type="password" className="w-full border rounded-lg p-2" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;
