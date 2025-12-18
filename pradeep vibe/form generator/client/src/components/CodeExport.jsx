import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { generateReactCode } from '../utils/codeGenerator';

export default function CodeExport({ formSchema, vibe }) {
    const [copied, setCopied] = useState(false);
    const code = generateReactCode(formSchema, vibe);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VibeForm.jsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mt-8 bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-800">
                <span className="text-gray-400 text-sm font-mono">Generates: VibeForm.jsx</span>
                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                        title="Copy Code"
                    >
                        {copied ? <Check size={18} className="text-teal-400" /> : <Copy size={18} />}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                        title="Download File"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-gray-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
