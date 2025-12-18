export function generateReactCode(schema, vibe) {
  if (!schema) return '';

  const styles = {
    playful: {
      container: 'bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(167,139,250,0.5)] border-2 border-purple-100',
      header: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent',
      label: 'text-gray-600 font-bold tracking-wide',
      input: 'bg-gray-50 border-2 border-purple-100 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100',
      button: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-200 hover:-translate-y-1',
      accent: 'from-pink-500 to-violet-500'
    },
    minimal: {
      container: 'bg-white rounded-none shadow-sm border border-gray-200',
      header: 'text-gray-900 tracking-tight',
      label: 'text-gray-500 text-xs uppercase tracking-widest font-semibold',
      input: 'bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus:ring-0 focus:border-gray-900 transition-colors',
      button: 'bg-gray-900 text-white rounded-none hover:bg-black',
      accent: 'from-gray-800 to-gray-900'
    },
    official: {
      container: 'bg-white border-t-4 border-[#003366] shadow-md', // Matching #003366
      header: 'text-[#003366] border-b border-gray-200 pb-4',
      label: 'text-gray-800 font-semibold',
      input: 'bg-white border border-gray-400 rounded-sm focus:ring-2 focus:ring-[#003366] focus:border-transparent',
      button: 'bg-[#003366] text-white font-medium rounded-sm hover:bg-blue-900 shadow-sm',
      accent: 'from-blue-700 to-blue-900'
    },
    festival: {
      container: 'bg-orange-50 border-[3px] border-[#FF3366] rounded-2xl shadow-orange-200/50 shadow-xl',
      header: 'text-[#9e330a] font-serif decoration-[#FF3366] underline underline-offset-4',
      label: 'text-[#9e330a] font-medium',
      input: 'bg-white/80 border-2 border-orange-200 rounded-lg focus:border-[#FFB700] focus:ring-2 focus:ring-[#FFB700]',
      button: 'bg-gradient-to-r from-[#FF3366] to-[#FFB700] text-white font-serif tracking-wide rounded-lg shadow-md hover:shadow-orange-300',
      accent: 'from-[#FF3366] to-[#FFB700]'
    }
  };

  const currentStyle = styles[vibe] || styles.playful;

  const fieldsCode = schema.fields.map((field, index) => {
    // Generate unique ID for accessibility
    const fieldId = `field-${index}-${field.label.toLowerCase().replace(/\s+/g, '-')}`;

    return `
          <div className="space-y-2">
            <label 
              htmlFor="${fieldId}" 
              className="text-sm block ${currentStyle.label}"
            >
              ${field.label}
            </label>
            <input
              id="${fieldId}"
              type="${field.type || 'text'}"
              placeholder="${field.placeholder || ''}"
              className="w-full px-4 py-3 outline-none transition-all ${currentStyle.input}"
              aria-label="${field.label}"
            />
          </div>`;
  }).join('\n');

  return `import React from 'react';
import { motion } from 'framer-motion';

export default function GeneratedForm() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden ${currentStyle.container}"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 ${currentStyle.header}">
            ${schema.title}
          </h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            ${fieldsCode}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 px-6 transition-all duration-200 ${currentStyle.button}"
            >
              ${schema.submitLabel || 'Submit'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}`;
}
