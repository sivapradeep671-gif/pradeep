import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import FieldDashboard from './components/FieldDashboard';
import GodownDetails from './components/GodownDetails';
import DashboardLayout from './components/Layout/DashboardLayout';
import Overview from './components/Dashboard/Overview';
import GodownNetwork from './components/Dashboard/GodownNetwork';
import InventoryAging from './components/Dashboard/InventoryAging';
import AlertsTasks from './components/Dashboard/AlertsTasks';
import ImpactAnalytics from './components/Dashboard/ImpactAnalytics';
import { LanguageProvider } from './context/LanguageContext';

function App() {
    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/field" element={<FieldDashboard />} />

                    {/* Public/Direct Godown Link (Legacy/Field view) */}
                    <Route path="/godown/:id" element={<GodownDetails />} />

                    {/* New RiskGuard Dashboard Routes */}
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="network" element={<GodownNetwork />} />
                        <Route path="inventory" element={<InventoryAging />} />
                        <Route path="alerts" element={<AlertsTasks />} />
                        <Route path="analytics" element={<ImpactAnalytics />} />
                        <Route path="settings" element={<div className="p-4">Settings Page (Coming Soon)</div>} />
                    </Route>
                </Routes>
            </Router>
        </LanguageProvider>
    );
}

export default App;
