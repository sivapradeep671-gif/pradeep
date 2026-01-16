import React, { useState } from 'react';
import { api } from '../../services/api';

const IntegrationsHub = () => {
    const [activeTab, setActiveTab] = useState('EPDS');

    const pillars = [
        {
            id: 'EPDS',
            name: 'ePDS Integration',
            tagline: 'Verify CardStock Sync',
            icon: '🛒',
            color: 'border-blue-500',
            bg: 'bg-blue-50',
            textColor: 'text-blue-700',
            description: 'Connects RiskGuard to the electronic Public Distribution System (ePDS), which manages ration cards, entitlements, and fair price shop transactions in Tamil Nadu.',
            points: [
                {
                    title: 'Authenticates ration-card entitlements',
                    desc: 'Cross-checks each family card’s allowed quantity (rice, wheat, sugar, etc.) against NFSA/PDS rules in real time before treating any anomaly as a risk signal.'
                },
                {
                    title: 'Verifies shop-level disbursement data',
                    desc: 'Compares what a fair price shop claims to have distributed with ePDS transaction logs to detect diversion, over-billing, or under-supply.'
                }
            ],
            consistencyCheck: {
                title: 'Data Consistency Check',
                content: 'Automated validation between Card-level entitlement usage (from ePDS) and Stock position at each fair price shop and godown (from TNCSC inventory/PDS systems). If issued quantity to cards > stock movement records, RiskGuard flags mismatch or leakage.'
            },
            status: 'Online',
            lastSync: '14 mins ago'
        },
        {
            id: 'EDPC',
            name: 'e-DPC Connection',
            tagline: 'Farmer PayPaddy Inflow',
            icon: '🌾',
            color: 'border-emerald-500',
            bg: 'bg-emerald-50',
            textColor: 'text-emerald-700',
            description: 'Links RiskGuard with e-DPC, the digital platform used at Direct Purchase Centres (DPCs) where TNCSC procures paddy from farmers.',
            points: [
                {
                    title: 'Syncs farmer procurement data',
                    desc: 'Each paddy purchase (farmer ID, quantity, MSP, date, center) flows automatically from e-DPC into RiskGuard to match with godown inventory and transport records.'
                },
                {
                    title: 'Procured vs. Stored Analysis',
                    desc: 'Detects gaps between procured vs. stored vs. transported paddy (spillage, pilferage, or data errors) using dual-ledger verification.'
                }
            ],
            consistencyCheck: {
                title: 'Monitoring Paddy Inflow',
                content: 'Tracks both the physical side (Paddy inflow into DPCs) and the financial side (MSP payments to farmers). Highlighting abnormal drops in inflow or payment delays as risk indicators for farmer trust.'
            },
            status: 'Synced',
            lastSync: '22 mins ago'
        },
        {
            id: 'TNEGA',
            name: 'TNeGA Data Exchange',
            tagline: 'Secure APIZero Copy',
            icon: '🛡️',
            color: 'border-slate-800',
            bg: 'bg-slate-50',
            textColor: 'text-slate-900',
            description: 'Uses Tamil Nadu e-Governance Agency (TNeGA) standards to exchange data securely between TNCSC, PDS, agriculture, and other departments.',
            points: [
                {
                    title: 'Compliant with State API policies',
                    desc: 'Using approved API gateways, authentication, and encryption following the Tamil Nadu Data Policy for storage, sharing, and anonymization.'
                },
                {
                    title: 'Zero Duplicate Databases',
                    desc: 'RiskGuard does not create unnecessary duplicate databases of sensitive citizen data. It fetches data through APIs when needed (read/compute) and caches minimally.'
                }
            ],
            consistencyCheck: {
                title: 'Privacy & Ownership',
                content: 'Adheres to the "APIZero Copy" philosophy, respecting departmental data ownership and using secure state-approved API gateways for all cross-departmental data read operations.'
            },
            status: 'Secured',
            lastSync: 'Real-time'
        }
    ];

    const activePillar = pillars.find(p => p.id === activeTab);

    return (
        <div className="space-y-8 animate-slide-in">
            {/* Header */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight">System Integration Hub</h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Unified Government Data Interoperability Layer</p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl">🔗</div>
            </div>

            {/* Pillar Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pillars.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActiveTab(p.id)}
                        className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-4 shadow-sm hover:shadow-xl ${activeTab === p.id ? `${p.color} ${p.bg} scale-[1.02]` : 'border-slate-100 bg-white hover:border-slate-300'} group`}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-3xl">{p.icon}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${p.status === 'Online' || p.status === 'Synced' || p.status === 'Secured' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                ● {p.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight">{p.name}</h3>
                            <p className={`text-[10px] font-black uppercase tracking-widest ${p.textColor}`}>{p.tagline}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Pillar Details Section */}
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-2xl transition-all">
                <div className={`p-8 border-b border-slate-100 flex justify-between items-center ${activePillar.bg}`}>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Pillar Analysis: {activePillar.name}</h3>
                        <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${activePillar.textColor}`}>{activePillar.tagline}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Latency: 12ms</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Uptime: 99.99%</p>
                    </div>
                </div>

                <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Functional Description</h4>
                            <p className="text-slate-700 font-semibold leading-relaxed">
                                {activePillar.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Core Integration Functions</h4>
                            {activePillar.points.map((pt, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-slate-900 border border-slate-200 flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{pt.title}</p>
                                        <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">{pt.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className={`p-8 rounded-[32px] border-2 border-dashed ${activePillar.color} ${activePillar.bg} relative overflow-hidden group/consist`}>
                            <h4 className="text-slate-900 font-black uppercase text-sm tracking-tighter mb-4 flex items-center gap-2">
                                🛡️ {activePillar.consistencyCheck.title}
                            </h4>
                            <p className="text-slate-600 text-xs font-bold leading-relaxed relative z-10">
                                {activePillar.consistencyCheck.content}
                            </p>
                            <div className="mt-6 flex justify-between items-center relative z-10">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white rounded-full ${activePillar.textColor} border border-slate-100`}>
                                    Verification: PASSED
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    Last Sync: {activePillar.lastSync}
                                </span>
                            </div>
                            <div className="absolute -bottom-4 -right-4 text-6xl opacity-1 transition-transform group-hover/consist:scale-110">
                                {activePillar.icon}
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[32px] p-8 text-white">
                            <h4 className="text-emerald-400 font-black uppercase text-[10px] tracking-widest mb-2">Technical Compliance</h4>
                            <p className="text-sm font-bold tracking-tight mb-4 leading-snug">
                                Full compliance with TNeGA Data Security Architecture & State Interoperability Standards.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Enc Type</p>
                                    <p className="text-xs font-bold font-mono">AES-256GCM</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Auth Layer</p>
                                    <p className="text-xs font-bold font-mono">mTLS 2.0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrationsHub;
