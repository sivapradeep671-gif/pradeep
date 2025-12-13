import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield, CloudRain, AlertTriangle, Activity, Database, Smartphone, Map, Server, Lock, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t, language, toggleLanguage } = useLanguage();

    const GradientText = ({ children, className = "" }) => (
        <span className={`bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 ${className}`}>
            {children}
        </span>
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-emerald-500/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/83/TamilNadu_Logo.svg"
                            alt="TN Emblem"
                            className="w-10 h-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                        />
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white leading-none">{t('tncscFull')}</h1>
                            <p className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold mt-1">{t('govtTN')}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={toggleLanguage}
                            className="px-4 py-2 text-xs font-bold rounded-lg border border-white/10 hover:bg-white/5 transition-all uppercase tracking-wider text-slate-400 hover:text-white"
                        >
                            {language === 'en' ? 'தமிழ்' : 'English'}
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="hidden md:block px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                        >
                            {t('fieldOfficerLogin')}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0f172a] to-[#0f172a]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                            {t('operationalDistrict')}
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                            {t('heroTitle')} <br />
                            <GradientText>{t('heroSubtitle')}</GradientText>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            {t('heroProblem')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <button
                                onClick={() => navigate('/dashboard/overview')}
                                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 flex items-center justify-center gap-2 group focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                            >
                                {t('tryDemo')}
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl border border-white/10 transition-all hover:border-white/20 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                            >
                                {t('viewProblem')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section id="problem" className="py-20 bg-slate-900/50 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">{t('problemTitle')}</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">{t('problemDesc')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'problem1', desc: 'problem1Desc', icon: CloudRain, color: 'text-blue-400' },
                            { title: 'problem2', desc: 'problem2Desc', icon: Activity, color: 'text-orange-400' },
                            { title: 'problem3', desc: 'problem3Desc', icon: AlertTriangle, color: 'text-red-400' }
                        ].map((item, idx) => (
                            <div key={idx} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/[0.07]">
                                <item.icon className={`${item.color} w-10 h-10 mb-6`} />
                                <h3 className="text-xl font-bold mb-3 text-slate-200">{t(item.title)}</h3>
                                <p className="text-slate-400 leading-relaxed">{t(item.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution & Tech Stack */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-3xl rounded-full" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-4"><GradientText>{t('solutionTitle')}</GradientText></h2>
                        <p className="text-slate-400 max-w-2xl">{t('solutionDesc')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'feature1', desc: 'feature1Desc', icon: Map, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                            { title: 'feature2', desc: 'feature2Desc', icon: Lock, bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                            { title: 'feature3', desc: 'feature3Desc', icon: Smartphone, bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                            { title: 'feature4', desc: 'feature4Desc', icon: Database, bg: 'bg-orange-500/10', border: 'border-orange-500/20' }
                        ].map((feature, idx) => (
                            <div key={idx} className={`p-6 rounded-2xl border ${feature.border} ${feature.bg} backdrop-blur-sm`}>
                                <feature.icon className="w-8 h-8 text-white mb-4" />
                                <h4 className="font-bold text-lg mb-2">{t(feature.title)}</h4>
                                <p className="text-sm text-slate-300 opacity-80">{t(feature.desc)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack Mini Bar */}
                    <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full" /> React 18</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> Node.js</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-400 rounded-full" /> Firebase</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full" /> Ledger Logic</div>
                    </div>
                </div>
            </section>

            {/* Impact Metrics */}
            <section className="py-20 bg-emerald-900/10 border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-12 uppercase tracking-widest text-emerald-400">{t('impactTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">250+</div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider">{t('metric1')}</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">94%</div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider">{t('metric2')}</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-white mb-2">₹12Cr</div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider">{t('metric3')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center text-white">{t('roadmapTitle')}</h2>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500/50 to-emerald-500/20"></div>

                        {[
                            { title: 'phase1', desc: 'phase1Desc', status: 'current' },
                            { title: 'phase2', desc: 'phase2Desc', status: 'next' },
                            { title: 'phase3', desc: 'phase3Desc', status: 'future' }
                        ].map((phase, idx) => (
                            <div key={idx} className="relative pt-8 text-center group">
                                <div className={`w-8 h-8 rounded-full border-4 mx-auto mb-6 relative z-10 flex items-center justify-center ${phase.status === 'current' ? 'bg-emerald-500 border-emerald-900 shadow-[0_0_20px_#10b981]' :
                                    'bg-slate-900 border-slate-700'
                                    }`}>
                                    {phase.status === 'current' && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${phase.status === 'current' ? 'text-emerald-400' : 'text-slate-300'}`}>
                                    {t(phase.title)}
                                </h3>
                                <p className="text-slate-400 text-sm">{t(phase.desc)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-[#0f172a] border-t border-white/10 text-center">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        <span className="font-bold text-lg tracking-tight">TNCSC RiskGuard</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-8">{t('heroSubtitle')}</p>
                    <div className="text-xs text-slate-600 space-y-2">
                        <p>{t('builtBy')}</p>
                        <p>{t('forSIH')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
