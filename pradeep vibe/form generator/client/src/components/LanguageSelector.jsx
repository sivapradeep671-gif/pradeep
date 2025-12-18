export const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi (हिंदी)' },
    { code: 'ta', label: 'Tamil (தமிழ்)' },
    { code: 'te', label: 'Telugu (తెలుగు)' },
    { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
    { code: 'mr', label: 'Marathi (मराठी)' },
    { code: 'bn', label: 'Bengali (বাংলা)' },
];

export default function LanguageSelector({ selectedLang, onSelect }) {
    return (
        <div className="flex gap-2 mb-6 flex-wrap">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onSelect(lang.code)}
                    className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors border
            ${selectedLang === lang.code
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}
          `}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
