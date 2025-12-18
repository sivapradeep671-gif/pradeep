import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vibeConfig } from '../utils/vibeStyles';

// Simple progress bar component for conversational mode
const ProgressBar = ({ progress, colorClass, barColorClass }) => (
    <div className={`w-full h-1 ${colorClass} mt-4 fixed top-0 left-0 z-50`}>
        <div
            className={`h-full transition-all duration-500 ease-out ${barColorClass}`}
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

export default function FormPreview({ formSchema, vibe }) {
    const currentVibe = vibeConfig[vibe] || vibeConfig.playful;
    const styles = currentVibe.colors;
    const motionConfig = currentVibe.motion;

    // V2 Schema Support
    const blocks = formSchema?.blocks || formSchema?.fields || [];
    const layout = formSchema?.layout || currentVibe.layout || 'classic';
    const title = formSchema?.title || "Untitled Form";

    // Conversational State
    const [currentStep, setCurrentStep] = useState(0);

    // Reset step on new form
    useEffect(() => {
        setCurrentStep(0);
    }, [formSchema]);

    if (!formSchema) {
        return (
            <div className={`h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-12 bg-gray-50/50`}>
                <p>Your magic form will appear here ✨</p>
            </div>
        );
    }

    // --- Renderers ---

    const renderBlock = (block, idx) => {
        // Common Input Styles
        const inputClass = `w-full outline-none transition-all ${styles.input}`;
        const labelClass = `block mb-3 font-semibold text-lg ${styles.accent}`;

        switch (block.type) {
            case 'welcome_screen':
                return (
                    <div className="text-center py-10">
                        <h1 className={`text-4xl font-bold mb-4 ${styles.text}`}>{block.title}</h1>
                        <p className="text-lg text-gray-600 mb-8">{block.description}</p>
                        {layout === 'conversational' && (
                            <button onClick={() => setCurrentStep(curr => curr + 1)} className={`py-3 px-8 text-lg ${styles.button}`}>
                                {block.buttonText || "Start"}
                            </button>
                        )}
                    </div>
                );
            case 'select':
            case 'dropdown': // support both names
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <label className={labelClass}>{block.label || block.question}</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {block.options?.map((opt, i) => (
                                <button key={i} className={`p-4 text-left border rounded-lg hover:border-current transition-colors ${styles.bg === 'bg-black' ? 'border-gray-700' : 'border-gray-200'} ${styles.accent}`}>
                                    <span className="opacity-50 mr-2">{String.fromCharCode(65 + i)}</span> {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'rating':
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <label className={labelClass}>{block.label || block.question}</label>
                        <div className="flex gap-2">
                            {[...Array(block.max || 5)].map((_, i) => (
                                <button key={i} className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold hover:scale-110 transition-transform ${styles.accent} border-current opacity-70 hover:opacity-100`}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'textarea':
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <label className={labelClass}>
                            {block.label || block.question}
                            {block.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <textarea
                            placeholder={block.placeholder}
                            className={`${inputClass} min-h-[120px] resize-y py-3`}
                            rows={4}
                        />
                    </div>
                );
            case 'file':
            case 'upload':
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <label className={labelClass}>
                            {block.label || block.question}
                            {block.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className={`border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer group ${styles.accent?.replace('text-', 'border-')}`}>
                            <div className="mb-2 text-3xl">📂</div>
                            <p className="text-sm text-gray-500 group-hover:text-gray-700">
                                Drag & drop or <span className="font-semibold underline">browse</span> to upload
                            </p>
                            <input type="file" className="hidden" />
                        </div>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                            <input
                                type="checkbox"
                                className={`w-5 h-5 rounded border-gray-300 text-current focus:ring-0 ${styles.accent}`}
                            />
                            <span className="text-lg font-medium text-gray-700">{block.label || block.question}</span>
                        </label>
                    </div>
                );
            default: // Default Text Input
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <label className={labelClass}>
                            {block.label || block.question || "Untitled Question"}
                            {block.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <input
                            type={block.type || "text"}
                            placeholder={block.placeholder}
                            className={inputClass}
                            // Auto-focus logic for conversational
                            autoFocus={layout === 'conversational'}
                        />
                    </div>
                );
        }
    };

    // --- Layout Engines ---

    // 1. Conversational Layout (Typeform Style)
    if (layout === 'conversational') {
        const currentBlock = blocks[currentStep];
        const progress = ((currentStep + 1) / blocks.length) * 100;
        const isLast = currentStep === blocks.length - 1;

        return (
            <div className={`relative w-full h-full flex flex-col ${styles.bg} overflow-hidden rounded-xl`}>
                <ProgressBar progress={progress} colorClass={styles.progress} barColorClass={styles.progressBar} />

                <div className="flex-1 flex items-center justify-center p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="w-full max-w-2xl"
                        >
                            {/* Render Logic */}
                            {renderBlock(currentBlock, currentStep)}

                            {/* Navigation */}
                            {currentBlock.type !== 'welcome_screen' && (
                                <div className="mt-8 flex items-center gap-4">
                                    <button
                                        onClick={() => isLast ? alert("Demo Complete!") : setCurrentStep(c => c + 1)}
                                        className={`py-3 px-8 text-lg ${styles.button}`}
                                    >
                                        {isLast ? (formSchema.submitLabel || "Submit") : "OK ✓"}
                                    </button>
                                    {currentStep > 0 && (
                                        <button onClick={() => setCurrentStep(c => c - 1)} className="text-sm opacity-50 hover:opacity-100">
                                            Press <strong>Cmd + Enter</strong> ↵
                                        </button>
                                    )}
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Branding Footer */}
                <div className="absolute bottom-4 right-6 opacity-30 text-xs">
                    Powered by <strong>BharatForms</strong>
                </div>
            </div>
        );
    }

    // 2. Classic & Document Layouts (Scrollable)
    return (
        <motion.div
            initial={motionConfig.initial}
            animate={motionConfig.animate}
            transition={motionConfig.transition}
            className={`p-8 md:p-12 min-h-[500px] h-full overflow-y-auto ${styles.card} ${styles.bg}`}
        >
            <div className="mb-10 text-center md:text-left">
                <h2 className={`text-4xl font-bold mb-2 ${styles.text}`}>{title}</h2>
                {formSchema.description && <p className="text-gray-500">{formSchema.description}</p>}
                <div className={`w-12 h-1 mt-4 rounded-full ${styles.accent?.replace('text-', 'bg-') || 'bg-gray-200'} md:mx-0 mx-auto`}></div>
            </div>

            <div className={`space-y-8 ${layout === 'document' ? 'space-y-12' : ''}`}>
                {blocks.map((block, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group"
                    >
                        {renderBlock(block, idx)}
                    </motion.div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 mt-8 transition-all duration-200 text-lg ${styles.button}`}
                >
                    {formSchema.submitLabel || "Submit"}
                </motion.button>
            </div>

            <div className="mt-12 text-center opacity-30 text-xs">
                Powered by BharatForms • {currentVibe.theme} Mode
            </div>
        </motion.div>
    );
}
