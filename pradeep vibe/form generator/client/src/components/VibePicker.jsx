import { motion } from 'framer-motion';
import { Sparkles, Minus, Zap, Building2, PartyPopper } from 'lucide-react';

export const vibes = [
    { id: 'playful', label: 'Playful', icon: Sparkles, color: 'bg-teal-500', desc: 'Bouncy, colorful, fun' },
    { id: 'minimal', label: 'Minimal', icon: Minus, color: 'bg-gray-800', desc: 'Clean, spacious, modern' },
    { id: 'brutal', label: 'Brutal', icon: Zap, color: 'bg-coral-500', desc: 'Bold, raw, high contrast' },
    { id: 'official', label: 'Official', icon: Building2, color: 'bg-vibe-official', desc: 'Sarkari sleek, Blue & Saffron' },
    { id: 'festival', label: 'Festival', icon: PartyPopper, color: 'bg-vibe-festival', desc: 'Vibrant, decorative, desi' },
];

export default function VibePicker({ selectedVibe, onSelect }) {
    return (
        <div className="flex gap-4 mb-8">
            {vibes.map((vibe) => {
                const Icon = vibe.icon;
                const isSelected = selectedVibe === vibe.id;

                return (
                    <motion.button
                        key={vibe.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(vibe.id)}
                        className={`
              relative overflow-hidden rounded-xl p-4 flex-1 text-left transition-all duration-300
              ${isSelected
                                ? 'ring-2 ring-offset-2 ring-teal-500 shadow-lg'
                                : 'hover:bg-white/50 opacity-70 hover:opacity-100'}
              bg-white/40 border border-white/20 backdrop-blur-sm
            `}
                    >
                        <div className={`p-2 rounded-lg w-fit mb-3 ${isSelected ? vibe.color + ' text-white' : 'bg-gray-100 text-gray-600'}`}>
                            <Icon size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">{vibe.label}</h3>
                        <p className="text-xs text-gray-500 mt-1">{vibe.desc}</p>

                        {isSelected && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
