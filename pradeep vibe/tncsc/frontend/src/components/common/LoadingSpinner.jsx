import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className={`relative ${sizeClasses[size]}`}>
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            {text && <div className="text-slate-500 font-medium text-sm animate-pulse">{text}</div>}
        </div>
    );
};

export default LoadingSpinner;
