import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Shield, CloudRain, AlertTriangle, Activity, Database, Smartphone, Map as MapIcon, Server, Lock, ChevronRight, Layers, CreditCard, Truck, Users, Sprout } from 'lucide-react';

import logo from '../assets/logo.png';

const GradientText = ({ children, className = "" }) => (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 ${className}`}>
        {children}
    </span>
);

const LandingPage = () => {
    const navigate = useNavigate();
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-emerald-500/30">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
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

            {/* Tamil Nadu Risk Map Section */}
            <section className="py-24 bg-[#0B1120] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Real-time Visibility</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Tamil Nadu <GradientText>Risk Map & Stock Flow</GradientText>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Live visualization of commodity movements across all 38 districts.
                        </p>
                    </div>

                    <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Map Background Illustration (Abstract) */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M400 100 Q 450 150 420 200 T 500 300 T 450 450 T 350 500 T 250 400 T 300 250 T 400 100" stroke="#10b981" strokeWidth="2" strokeDasharray="10 10" className="animate-pulse" />
                                {/* Simplified connections */}
                                <circle cx="400" cy="100" r="4" className="fill-emerald-500" />
                                <circle cx="420" cy="200" r="4" className="fill-emerald-500" />
                                <circle cx="500" cy="300" r="4" className="fill-emerald-500" />
                                <circle cx="350" cy="500" r="4" className="fill-emerald-500" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                            {/* Map Interaction Area (Simulated) */}
                            <div className="lg:col-span-2 min-h-[400px] relative bg-[#0f172a] rounded-2xl border border-slate-700 p-6 shadow-2xl overflow-hidden group">
                                <div className="absolute top-4 left-4 z-20 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-lg border border-white/10">
                                    <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Active Commodity Routes</h4>
                                    <div className="flex items-center gap-4 text-[10px] text-slate-300">
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-white"></div> Rice (Delta)</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div> Wheat</div>
                                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-600"></div> Palm Oil</div>
                                    </div>
                                </div>

                                {/* Simulated Districts Grid for Visual */}
                                <div className="absolute inset-0 p-8 grid grid-cols-4 md:grid-cols-6 gap-4 content-center opacity-80">
                                    {['சென்னை', 'திருவள்ளூர்', 'காஞ்சிபுரம்', 'செங்கல்பட்டு', 'வேலூர்', 'ராணிப்பேட்டை', 'திருப்பத்தூர்', 'திருவண்ணாமலை', 'விழுப்புரம்', 'கள்ளக்குறிச்சி', 'தர்மபுரி', 'கிருஷ்ணகிரி', 'சேலம்', 'ஈரோடு', 'திருப்பூர்', 'கோவை', 'நீலகிரி', 'நாமக்கல்', 'கரூர்', 'திருச்சி', 'பெரம்பலூர்', 'அரியலூர்', 'கடலூர்', 'நாகை', 'மயிலாடுதுறை', 'திருவாரூர்', 'தஞ்சை', 'புதுக்கோட்டை', 'திண்டுக்கல்', 'தேனி', 'மதுரை', 'சிவகங்கை', 'விருதுநகர்', 'ராமநாதபுரம்', 'தூத்துக்குடி', 'தென்காசி', 'நெல்லை', 'கன்னியாகுமரி'].map((dist, i) => (
                                        <div key={i} className="text-[10px] md:text-xs text-slate-500 hover:text-emerald-400 transition-colors cursor-default select-none flex items-center justify-center p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10">
                                            {dist}
                                        </div>
                                    ))}
                                </div>

                                {/* Animated Flow Lines (CSS) */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Flow 1: Delta to Chennai */}
                                    <div className="absolute top-[60%] left-[60%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-[flow_3s_infinite_linear]" style={{ '--tx': '-100px', '--ty': '-200px' }}></div>
                                    <div className="absolute top-[60%] left-[60%] w-[100px] h-[200px] border-t-2 border-l-2 border-white/20 rounded-tl-full transform -rotate-12 translate-x-[-100px] translate-y-[-200px]"></div>

                                    {/* Flow 2: Madurai to South */}
                                    <div className="absolute top-[70%] left-[40%] w-1 h-1 bg-amber-400 rounded-full shadow-[0_0_10px_orange] animate-[flow_4s_infinite_linear_1s]" style={{ '--tx': '50px', '--ty': '100px' }}></div>
                                </div>
                            </div>

                            {/* Sidebar Stats */}
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Stock Movement</div>
                                            <div className="text-2xl font-bold text-white">42,500 MT</div>
                                        </div>
                                        <Activity className="text-emerald-500" size={20} />
                                    </div>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                        <div className="w-[75%] h-full bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div className="mt-3 text-xs text-slate-400 flex justify-between">
                                        <span>Capacity Utilization</span>
                                        <span className="text-emerald-400">75%</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Active Alerts</div>
                                            <div className="text-2xl font-bold text-white">12</div>
                                        </div>
                                        <AlertTriangle className="text-amber-500" size={20} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                            <span>Weather Risk: coastal (Nagai)</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                            <span>Delay: Trichy to Madurai</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg text-white">
                                    <div className="flex gap-3 mb-3">
                                        <Truck size={20} />
                                        <span className="font-bold text-sm">Live Fleet</span>
                                    </div>
                                    <div className="text-3xl font-bold mb-1">1,240</div>
                                    <div className="text-emerald-100 text-xs opacity-80">Trucks on road right now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>

            {/* New District Coverage Section */}
            <section className="py-24 bg-gradient-to-b from-[#0B1120] to-[#0f172a] border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                <MapIcon size={14} />
                                <span>State-wide Command Center</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                District-wise <br />
                                <GradientText>RiskGuard Coverage</GradientText>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                                From Chennai to Kanyakumari, RiskGuard digitizes and secures the supply chain across all 38 districts of Tamil Nadu. Monitor stock health and logistical flow at a regional level.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <div className="text-2xl font-bold text-emerald-400">38</div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Districts</div>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                                    <div className="text-2xl font-bold text-blue-400">12,500+</div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fair Price Shops</div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/dashboard/districts')}
                                className="group px-8 py-4 bg-white text-slate-900 font-bold rounded-xl transition-all hover:bg-emerald-50 flex items-center justify-center gap-2 shadow-xl hover:shadow-emerald-500/10"
                            >
                                View District Dashboard
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="lg:w-1/2 relative group">
                            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
                            <div className="relative z-10 bg-[#1e293b]/50 border border-slate-700 rounded-3xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden border-dashed">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="space-y-1">
                                        <div className="text-xs font-bold text-slate-500 uppercase">Live Operations</div>
                                        <div className="text-xl font-bold text-white">TN Regional Map</div>
                                    </div>
                                    <div className="flex gap-2 text-[10px] font-bold">
                                        <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30">High Risk</span>
                                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Optimal</span>
                                    </div>
                                </div>

                                {/* Simplified Abstract Map for Landing Page */}
                                <div className="space-y-4">
                                    {[
                                        { name: 'Chennai', risk: 30, color: 'bg-emerald-500' },
                                        { name: 'Madurai', risk: 72, color: 'bg-amber-500' },
                                        { name: 'Thanjavur', risk: 85, color: 'bg-red-500' },
                                        { name: 'Coimbatore', risk: 45, color: 'bg-emerald-500' }
                                    ].map((d, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item">
                                            <div className="text-sm font-bold text-slate-300 w-24">{d.name}</div>
                                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                                <div className={`h-full ${d.color} opacity-80 group-hover/item:opacity-100 transition-opacity`} style={{ width: `${d.risk}%` }} />
                                            </div>
                                            <div className="text-xs font-mono text-slate-500">{d.risk}%</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-700/50 flex items-center justify-between text-slate-500">
                                    <span className="text-xs italic">Syncing across 38 administrative hubs...</span>
                                    <Layers className="text-slate-600" size={16} />
                                </div>
                            </div>
                        </div>
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
                            { title: 'feature1', desc: 'feature1Desc', icon: MapIcon, bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
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

            {/* Tech Architecture Platform (TN Stack) */}
            <section className="py-20 bg-slate-900 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20 mb-4">
                            <Layers size={14} />
                            <span>Interoperable Architecture</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Built for <GradientText>Tamil Nadu Stack</GradientText></h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Seamlessly integrated with existing state infrastructure for unified governance.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-[#0f172a] border border-slate-700 hover:border-emerald-500/50 transition-all group">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <CreditCard size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">ePDS Integration</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">Authenticates ration-card entitlements and verifies shop-level disbursement data in real-time.</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">Verify Card</span>
                                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">Stock Sync</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#0f172a] border border-slate-700 hover:border-emerald-500/50 transition-all group">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                                <Sprout size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">e-DPC Connection</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">Syncs farmer procurement data directly from Direct Purchase Centers to godown inventory logs.</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">Farmer Pay</span>
                                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">Paddy Inflow</span>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl bg-[#0f172a] border border-slate-700 hover:border-emerald-500/50 transition-all group">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <Server size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">TNeGA Data Exchange</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">Compliant with State API policies for secure, encrypted cross-departmental data sharing.</p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">Secure API</span>
                                <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">Zero Copy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Driver App & Security Section (Phase 5) */}
            <section className="py-20 bg-slate-800/50 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                <Shield size={14} />
                                <span>AIS-140 Compliant</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white">
                                Driver Empowerment & <GradientText>Theft Protection</GradientText>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                A dedicated mobile app for TNCSC truck drivers, transforming every vehicle into a smart, trackable asset.
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 h-fit">
                                        <MapIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-200">Live GPS Tracking</h4>
                                        <p className="text-sm text-slate-400 mt-1">Real-time location sharing with HQ. Eliminates unapproved stops and route deviations.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="p-3 bg-red-500/10 rounded-lg text-red-400 h-fit">
                                        <Lock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-200">Anti-Theft Geofencing</h4>
                                        <p className="text-sm text-slate-400 mt-1">Instant alerts if a truck exits the approved corridor or halts unexpectedly.</p>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg flex items-center gap-2 transition-all">
                                <Smartphone size={20} />
                                <span>Download Driver App</span>
                            </button>
                        </div>

                        {/* Visual Representation */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl rounded-full"></div>
                            <div className="relative z-10 bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                                <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Driver Mode</span>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                        <div className="text-xs text-slate-400 mb-1">Current Route</div>
                                        <div className="font-bold text-white">Thanjavur Hub ➝ Chennai CPC</div>
                                    </div>
                                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                                        <div>
                                            <div className="text-xs text-slate-400 mb-1">ETA</div>
                                            <div className="font-bold text-emerald-400">2 hrs 15 mins</div>
                                        </div>
                                        <MapIcon className="text-slate-600" />
                                    </div>
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mt-4">
                                        <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-1">
                                            <Shield size={14} />
                                            <span>Secure Mode Active</span>
                                        </div>
                                        <p className="text-[10px] text-red-300/70">Geofence lock enabled. Do not deviate.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tamil Benefits Section */}
            <section className="py-20 bg-emerald-950/30 border-t border-emerald-900/50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 font-serif">
                                <span className="block text-xl text-emerald-400 font-sans mb-2 font-bold tracking-wider uppercase">Public Welfare</span>
                                ஏன் TNCSC RiskGuard? <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-white text-2xl md:text-4xl mt-2 block">
                                    நம்ம விவசாயிகளுக்கும் <br />ரேஷன் கார்டு வைத்தவர்களுக்கும்
                                </span>
                            </h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                        <Shield size={20} />
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        <span className="font-bold text-white block mb-1">தரமான உணவுப் பாதுகாப்பு</span>
                                        களஞ்சியத்தில் இருக்கும் அரிசி, கோதுமை, பருப்பு வெப்பம், ஈரப்பதம், பூச்சி தாக்கம் எல்லாமே சென்சார் மூலம் 24x7 கண்காணிப்பு – கெடுதல் குறைந்து, தரம் காக்கப்படும்.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                        <MapIcon size={20} />
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        <span className="font-bold text-white block mb-1">பேரிடர் முன்னெச்சரிக்கை</span>
                                        மழை, வெள்ளம், தீ விபத்து போன்ற அபாயங்கள் முன்கூட்டியே வரைபடத்தில் புலப்படும்; அதனால் பக்கத்து மாவட்டத்துக்கு ஸ்டாக் விரைவில் மாற்ற முடியும்.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                                        <Truck size={20} />
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        <span className="font-bold text-white block mb-1">வெளிப்படையான போக்குவரத்து</span>
                                        டிரக் ஒவ்வொன்றும் GPS மூலம் லைவ் டிராக்கிங்; வழி மாறினாலோ, இடைவேளையில்லாமல் நிறுத்தினாலோ உடனடி அலர்ட் – திருட்டு, சோர் ஒழுங்கு குறையும்.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                        <Users size={20} />
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        <span className="font-bold text-white block mb-1">துரித சேவை</span>
                                        இருப்பு நிலை, குணநிலை எல்லாம் டிஜிட்டல் ரெக்கார்டாக சேமிப்பு; ஆய்வு அதிகாரிகள் எங்கு சென்றாலும் மொபைல் ஆப்பில் உடனடி அப்டேட்.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
                            <div className="relative bg-[#0f172a] p-8 rounded-3xl border border-slate-700 shadow-2xl text-center space-y-8">
                                <div className="inline-block p-4 rounded-full bg-emerald-100/10 mb-4">
                                    <img src={logo} alt="TNCSC" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    இதை எல்லாம் சேர்த்து பார்த்தா...
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed italic">
                                    "நம்ம ரேஷன் கடையில் வரும் அரிசி தரம் மேம்பட்டு, வீணாகும் தானியம் குறைக்கு; அதுதான் RiskGuard நோக்கம்."
                                </p>
                                <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25">
                                    மேலும் அறிய (Learn More)
                                </button>
                            </div>
                        </div>
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
                        <p className="text-sm font-medium text-slate-400">
                            Developed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold text-base hover:scale-105 inline-block transition-transform cursor-default">Sivapradeep Maharajan</span>
                        </p>
                        <p className="pt-4 border-t border-slate-800 mt-4 text-slate-500 italic max-w-2xl mx-auto">
                            "Concept solution for TNCSC, aligned with Govt. of Tamil Nadu policies on digital PDS and GPS-based tracking. Not an official government platform."
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
