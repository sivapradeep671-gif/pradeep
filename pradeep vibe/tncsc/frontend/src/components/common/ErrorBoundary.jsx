import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-6">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-200">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 mb-2">Something went wrong</h1>
                        <p className="text-slate-500 mb-6">
                            We encountered an unexpected error. The technical team has been notified.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
                        >
                            Refresh Application
                        </button>
                        {import.meta.env.DEV && (
                            <div className="mt-8 p-4 bg-red-50 rounded text-left text-xs font-mono text-red-800 overflow-auto max-h-40">
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.error && this.state.error.stack}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
