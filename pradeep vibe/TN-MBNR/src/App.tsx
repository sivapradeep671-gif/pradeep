import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactMatrix } from './components/ImpactMatrix';
import { BusinessRegistration } from './components/BusinessRegistration';
import { MapExplorer } from './components/MapExplorer';
import { CitizenReport } from './components/CitizenReport';
import type { Business } from './types/types';

const mockBusinessData: Business[] = [
  {
    id: '1',
    legalName: 'Sri Krishna Sweets Pvt Ltd',
    tradeName: 'Sri Krishna Sweets',
    type: 'Private Limited',
    address: '123, M.G. Road, Adyar, Chennai',
    branchName: 'Adyar Branch',
    contactNumber: '9876543210',
    email: 'contact@srikrishnasweets.com',
    status: 'Verified',
    registrationDate: '2023-01-15',
    riskScore: 5,
  },
  {
    id: '2',
    legalName: 'A2B Adyar Ananda Bhavan',
    tradeName: 'A2B',
    type: 'Private Limited',
    address: '45, Anna Salai, T. Nagar, Chennai',
    branchName: 'T. Nagar Branch',
    contactNumber: '9876543211',
    email: 'info@a2b.com',
    status: 'Verified',
    registrationDate: '2023-02-20',
    riskScore: 2,
  }
];

function App() {
  const [currentView, setCurrentView] = useState('HOME');
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinessData);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/businesses`);
        if (response.ok) {
          const data = await response.json();
          // Ensure data.data is an array before setting
          if (Array.isArray(data.data)) {
            setBusinesses(data.data);
          }
        } else {
          console.warn("Failed to fetch businesses from API, falling back to mock data.");
          setBusinesses(mockBusinessData);
        }
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
        // Fallback to mock data if backend is not running or network error
        setBusinesses(mockBusinessData);
      }
    };

    fetchBusinesses();
  }, []);

  const handleRegister = async (newBusiness: Business) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/businesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBusiness),
      });

      if (response.ok) {
        setBusinesses(prev => [newBusiness, ...prev]);
        setCurrentView('HOME');
        alert("Business Registered Successfully!");
      } else {
        alert("Failed to register business. Please try again.");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      // Fallback for demo without backend
      setBusinesses(prev => [newBusiness, ...prev]);
      setCurrentView('HOME');
      alert("Business Registered (Demo Mode - Backend Unreachable)!");
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return (
          <>
            <Hero onRegister={() => setCurrentView('REGISTER')} />
            <ImpactMatrix />
          </>
        );
      case 'REGISTER':
        return (
          <BusinessRegistration
            existingBusinesses={businesses}
            onRegister={handleRegister}
          />
        );
      case 'MAP':
        return <MapExplorer businesses={businesses} />;
      case 'REPORT':
        return <CitizenReport />;
      default:
        return <Hero onRegister={() => setCurrentView('REGISTER')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-500/30">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      <main>
        {renderContent()}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
        <p>© 2024 Tamil Nadu Municipal Business Name Revolution (TN-MBNR). All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
