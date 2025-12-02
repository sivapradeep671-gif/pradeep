import React from 'react';
import { Shield } from 'lucide-react';

interface NavbarProps {
    currentView: string;
    setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
    return (
        <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('HOME')}>
                        <Shield className="h-8 w-8 text-yellow-500" />
                        <span className="ml-2 text-xl font-bold tracking-wider">TN-MBNR</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button
                                onClick={() => setCurrentView('HOME')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'HOME' ? 'bg-slate-800 text-yellow-500' : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => setCurrentView('REGISTER')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'REGISTER' ? 'bg-slate-800 text-yellow-500' : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                Register Business
                            </button>
                            <button
                                onClick={() => setCurrentView('MAP')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'MAP' ? 'bg-slate-800 text-yellow-500' : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                Map Explorer
                            </button>
                            <button
                                onClick={() => setCurrentView('REPORT')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === 'REPORT' ? 'bg-slate-800 text-yellow-500' : 'text-slate-300 hover:text-white'
                                    }`}
                            >
                                Report Fake
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
