import { useState } from 'react';
import VibePicker from './components/VibePicker';
import PromptInput from './components/PromptInput';
import FormPreview from './components/FormPreview';
import CodeExport from './components/CodeExport';
import LanguageSelector from './components/LanguageSelector';

function App() {
  const [selectedVibe, setSelectedVibe] = useState('playful');
  const [selectedLang, setSelectedLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedForm, setGeneratedForm] = useState(null);

  const handleGenerate = async (prompt) => {
    setIsLoading(true);
    setGeneratedForm(null); // Clear previous
    console.log("Generating with:", prompt, selectedVibe);

    try {
      console.log("Attempting fetch to /api/generate...");
      // Use relative path to leverage Vite proxy in dev and same-origin in prod
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, vibe: selectedVibe, lang: selectedLang })
      });
      console.log("Response received:", response.status);

      const data = await response.json();
      console.log("Data received:", data);

      if (data.formSchema) {
        setGeneratedForm(data.formSchema);
      } else {
        console.error("No schema returned", data);
      }
    } catch (err) {
      console.error("API Error - Fetch failed:", err);
      alert("Failed to generate form. Ensure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">

      {/* Header */}
      <header className="py-6 px-8 flex items-center justify-between bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-400 to-green-600"></div>
          <h1 className="text-xl font-bold tracking-tight">BharatForms</h1>
        </div>
        <a href="#" className="font-medium text-gray-500 hover:text-orange-600 transition">Dashboard</a>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Panel: Controls */}
        <div className="flex flex-col justify-center max-w-xl mx-auto lg:mx-0 w-full">
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">
              Bharat<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600">Forms</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              India's first AI Form Generator. Use your language, get your vibe.
            </p>
          </div>

          <LanguageSelector selectedLang={selectedLang} onSelect={setSelectedLang} />
          <VibePicker selectedVibe={selectedVibe} onSelect={setSelectedVibe} />
          <PromptInput onSubmit={handleGenerate} isLoading={isLoading} />

          <div className="mt-8 flex gap-4 text-sm text-gray-400">
            <span>✨ React + Tailwind</span>
            <span>🚀 Framer Motion</span>
            <span>💎 Production Ready</span>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-coral-100 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
          <div className="relative h-full flex flex-col gap-6">
            <FormPreview formSchema={generatedForm} vibe={selectedVibe} />

            {generatedForm && (
              <CodeExport formSchema={generatedForm} vibe={selectedVibe} />
            )}
          </div>
        </div>

      </main>
    </div>
  )
}

export default App
