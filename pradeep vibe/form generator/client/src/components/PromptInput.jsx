import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

export default function PromptInput({ onSubmit, isLoading }) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            onSubmit(prompt);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-coral-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your dream form..."
                        disabled={isLoading}
                        className="block w-full p-4 pl-6 pr-16 text-lg text-gray-900 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-0 placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="absolute right-2 p-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <Wand2 size={24} />
                            </motion.div>
                        ) : (
                            <Wand2 size={24} />
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
