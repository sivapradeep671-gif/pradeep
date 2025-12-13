import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg" alt="TN Emblem" className="w-12 h-12" />
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{t('tncscFull')}</h1>
                        <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold">{t('govtTN')}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 text-xs font-bold rounded-md border border-white/20 hover:bg-white/10 transition-colors"
                    >
                        {language === 'en' ? 'தமிழ்' : 'English'}
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
                    >
                        {t('fieldOfficerLogin')}
                    </button>
                </div>
            </nav>

            {/* Hero */}
            <main className="container mx-auto px-6 mt-20 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {t('operationalDistrict')}
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        {t('subtitle')}
                    </h2>

                    <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                        Integrating real-time weather data with stock levels to predict risks, prevent spoilage, and optimize logistics across the state.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => navigate('/hq')}
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                        >
                            {t('launchDashboard')}
                            <span>→</span>
                        </button>
                    </div>
                </div>

                {/* Visual / Feature Grid */}
                <div className="flex-1 grid grid-cols-2 gap-4 opacity-80">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h3 className="font-bold text-lg mb-2 text-emerald-400">Risk Mapping</h3>
                        <p className="text-sm text-slate-400">Geospatial visualization of high-risk zones.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-8">
                        <h3 className="font-bold text-lg mb-2 text-blue-400">Stock Safety</h3>
                        <p className="text-sm text-slate-400">Automated alerts for moisture and age.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h3 className="font-bold text-lg mb-2 text-purple-400">Logistics</h3>
                        <p className="text-sm text-slate-400">Optimize movement based on weather forecasts.</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm mt-8">
                        <h3 className="font-bold text-lg mb-2 text-orange-400">Field Ops</h3>
                        <p className="text-sm text-slate-400">Mobile reporting for on-ground verification.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
