import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginScreen from './components/LoginScreen';
import FieldDashboard from './components/FieldDashboard';
import FieldOfficerDashboard from './components/FieldOfficerDashboard';
import DriverDashboard from './components/DriverDashboard';
import GodownDetails from './components/GodownDetails';
// ... rest of imports
import DashboardLayout from './components/Layout/DashboardLayout';
import Overview from './components/Dashboard/Overview';
import GodownNetwork from './components/Dashboard/GodownNetwork';
import InventoryAging from './components/Dashboard/InventoryAging';
import AlertsTasks from './components/Dashboard/AlertsTasks';
import ImpactAnalytics from './components/Dashboard/ImpactAnalytics';
import { LanguageProvider } from './context/LanguageContext';
import HQDashboard from './components/HQDashboard';
import Logistics from './components/Dashboard/Logistics'; // Switched to new component
import DistrictDashboard from './components/Dashboard/DistrictDashboard';
import DistrictDetail from './components/Dashboard/DistrictDetail';
import FleetMap from './components/Dashboard/FleetMap';
import LossAnalytics from './components/Dashboard/LossAnalytics';
import QualityDashboard from './components/Dashboard/QualityDashboard';
import ShopAcceptance from './components/Logistics/ShopAcceptance';
import PerformanceLeaderboard from './components/HQ/PerformanceLeaderboard';
import AuditGenerator from './components/Reports/AuditGenerator';


import ErrorBoundary from './components/common/ErrorBoundary';

// Role-Based Route Protection
const ProtectedRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('tncsc_role');
    const user = localStorage.getItem('tncsc_user');

    if (!user || !role) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" replace />;

    return children;
};

function App() {
    return (
        <LanguageProvider>
            <ErrorBoundary>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginScreen />} />

                        {/* Protected Role-Based Routes */}
                        <Route path="/field" element={
                            <ProtectedRoute allowedRoles={['FieldOfficer', 'Admin']}>
                                <FieldDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/driver" element={
                            <ProtectedRoute allowedRoles={['Driver', 'Admin']}>
                                <DriverDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/hq" element={
                            <ProtectedRoute allowedRoles={['HQAnalyst', 'Admin']}>
                                <HQDashboard />
                            </ProtectedRoute>
                        } />

                        {/* Public/Direct Godown Link */}
                        <Route path="/godown/:id" element={<GodownDetails />} />

                        {/* Legacy Dashboard Routes (Shared/Admin) */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute allowedRoles={['HQAnalyst', 'Admin']}>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="overview" replace />} />
                            <Route path="overview" element={<Overview />} />
                            <Route path="network" element={<GodownNetwork />} />
                            <Route path="districts" element={<DistrictDashboard />} />
                            <Route path="district/:id" element={<DistrictDetail />} />
                            <Route path="inventory" element={<InventoryAging />} />
                            <Route path="logistics" element={<Logistics />} />
                            <Route path="alerts" element={<AlertsTasks />} />
                            <Route path="analytics" element={<ImpactAnalytics />} />
                            <Route path="loss" element={<LossAnalytics />} />
                            <Route path="quality" element={<QualityDashboard />} /> {/* Feature 3 */}
                            <Route path="shop" element={<ShopAcceptance />} /> {/* Feature 4 */}
                            <Route path="performance" element={<PerformanceLeaderboard />} /> {/* Feature 5 */}
                            <Route path="reports" element={<AuditGenerator />} /> {/* Feature 6 */}
                            <Route path="fleet" element={<div className="h-[calc(100vh-6rem)]"><FleetMap /></div>} />
                            <Route path="settings" element={<div className="p-4">Settings Page (Coming Soon)</div>} />
                        </Route>
                    </Routes>
                </Router>
            </ErrorBoundary>
        </LanguageProvider>
    );
}

export default App;
