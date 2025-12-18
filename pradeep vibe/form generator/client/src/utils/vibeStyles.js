export const vibeConfig = {
    official: {
        theme: 'Official',
        layout: 'classic',
        colors: {
            bg: 'bg-slate-50',
            card: 'bg-white border-t-4 border-[#003366] shadow-md max-w-2xl mx-auto',
            text: 'text-[#003366]',
            input: 'rounded-sm border-gray-400 focus:border-[#003366] focus:ring-1 focus:ring-[#003366]',
            button: 'bg-[#003366] hover:bg-blue-900 text-white rounded-sm font-medium shadow-sm',
            accent: 'text-gray-600',
        },
        font: 'font-sans',
        motion: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    },
    festival: {
        theme: 'Festival',
        layout: 'classic',
        colors: {
            bg: 'bg-orange-50',
            card: 'bg-white/90 backdrop-blur-sm border-[3px] border-[#FF3366] rounded-2xl shadow-xl shadow-orange-200 max-w-2xl mx-auto',
            text: 'text-[#9e330a]',
            input: 'rounded-lg border-2 border-orange-200 focus:border-[#FFB700] focus:ring-[#FFB700]',
            button: 'bg-gradient-to-r from-[#FF3366] to-[#FFB700] text-white rounded-lg font-bold shadow-md hover:shadow-orange-300 transform hover:-translate-y-0.5',
            accent: 'text-[#FF3366]',
        },
        font: 'font-serif',
        motion: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { type: "spring", bounce: 0.5 } }
    },
    minimal: {
        theme: 'Minimal',
        layout: 'document',
        colors: {
            bg: 'bg-white',
            card: 'bg-transparent border-none shadow-none max-w-3xl mx-auto',
            text: 'text-gray-900 tracking-tight',
            input: 'rounded-none border-0 border-b border-gray-200 bg-transparent px-0 focus:ring-0 focus:border-black transition-colors placeholder:text-gray-300',
            button: 'bg-black text-white rounded-none hover:bg-gray-800',
            accent: 'text-gray-400',
        },
        font: 'font-mono',
        motion: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } }
    },
    playful: {
        theme: 'Playful',
        layout: 'conversational',
        colors: {
            bg: 'bg-purple-50',
            card: 'bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(167,139,250,0.5)] border-2 border-purple-100 max-w-xl mx-auto',
            text: 'text-gray-800', // Better contrast for questions
            input: 'rounded-xl border-2 border-purple-100 bg-gray-50 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-2xl p-4',
            button: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-200 hover:-translate-y-1',
            accent: 'text-purple-600',
            progress: 'bg-purple-200',
            progressBar: 'bg-gradient-to-r from-pink-500 to-indigo-500'
        },
        font: 'font-sans',
        motion: { initial: { opacity: 0, y: 30, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { type: "spring", stiffness: 200, damping: 20 } }
    }
};
