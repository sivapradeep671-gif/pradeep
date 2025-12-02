import React from 'react';

export const ImpactMatrix: React.FC = () => {
    const data = [
        { dimension: 'Consumer Safety', advantage: '70% reduction in counterfeit products (vs. 20% today)' },
        { dimension: 'Business Protection', advantage: 'Prevents brand misuse; legal recourse is easier' },
        { dimension: 'Municipal Revenue', advantage: '₹3-10 Crore annually (vs. ₹50-60 Lakh today)' },
        { dimension: 'Technology', advantage: 'World-class AI, blockchain, cloud infrastructure' },
        { dimension: 'Scalability', advantage: 'Can be replicated to other states and countries' },
        { dimension: 'Transparency', advantage: 'Citizens can verify businesses instantly' },
        { dimension: 'Enforcement', advantage: 'Proactive AI-based (vs. manual complaint-based)' },
        { dimension: 'Time Efficiency', advantage: 'Instant verification (vs. 7 days today)' },
        { dimension: 'Data Accuracy', advantage: 'Automated validation (vs. manual entry errors)' },
        { dimension: 'Institutional Trust', advantage: 'Banks and investors can verify businesses digitally' },
    ];

    return (
        <div className="bg-slate-900 py-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Impact Matrix</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Measuring the revolution. How TN-MBNR transforms the business landscape.
                    </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
                    <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-950">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                                    Dimension
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Advantage
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-slate-900 divide-y divide-slate-800">
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {item.dimension}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {item.advantage}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
