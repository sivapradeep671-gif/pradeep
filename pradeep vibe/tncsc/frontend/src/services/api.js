const API_BASE_URL = import.meta.env.PROD ? 'https://tncsc-risk-guard.onrender.com/api/v1' : '/api/v1';

// MOCK DATA FALLBACK (For GitHub Pages Static Demo)
const MOCK_DATA = {
    '/godowns': {
        success: true,
        data: [
            { id: 'TNJ001', name: 'Thanjavur Central Godown', district: 'Thanjavur', capacity: 5000, riskScore: 85, lat: 10.7870, lng: 79.1378, risk: 'High', lastInspection: '2025-12-10', stock: 4250, humidity: 82 },
            { id: 'MDU005', name: 'Madurai North Godown', district: 'Madurai', capacity: 3500, riskScore: 45, lat: 9.9252, lng: 78.1198, risk: 'Medium', lastInspection: '2025-12-12', stock: 1200, humidity: 65 },
            { id: 'CBE002', name: 'Coimbatore Logistics Hub', district: 'Coimbatore', capacity: 8000, riskScore: 12, lat: 11.0168, lng: 76.9558, risk: 'Low', lastInspection: '2025-12-14', stock: 6800, humidity: 55 },
            { id: 'CHE009', name: 'Chennai Harbor Storage', district: 'Chennai', capacity: 12000, riskScore: 92, lat: 13.0827, lng: 80.2707, risk: 'High', lastInspection: '2025-12-08', stock: 11500, humidity: 88 },
            { id: 'SAL003', name: 'Salem Regional Warehouse', district: 'Salem', capacity: 4200, riskScore: 30, lat: 11.6643, lng: 78.1460, risk: 'Low', lastInspection: '2025-12-11', stock: 2100, humidity: 60 }
        ]
    },
    '/stock/lots': [
        { id: 1, stackNo: 'S-01', commodity: 'Paddy', grade: 'A', bags: 150, weight: 7.5, moisture: '13.2', age: 45 },
        { id: 2, stackNo: 'S-02', commodity: 'Rice', grade: 'Common', bags: 200, weight: 10.0, moisture: '11.5', age: 12 },
        { id: 3, stackNo: 'S-03', commodity: 'Wheat', grade: 'FAQ', bags: 120, weight: 6.0, moisture: '10.8', age: 95 },
        { id: 4, stackNo: 'S-04', commodity: 'Paddy', grade: 'A', bags: 180, weight: 9.0, moisture: '14.5', age: 60 },
        { id: 5, stackNo: 'S-05', commodity: 'Rice', grade: 'A', bags: 300, weight: 15.0, moisture: '11.2', age: 5 }
    ],
    '/reports/dashboard': {
        success: true,
        data: {
            totalGodowns: 342,
            highRiskGodowns: 15,
            spoilagePreventedValue: '₹4.2 Cr',
            procurementEfficiency: '94%'
        }
    },
    // Movement Mocks
    '/api/movement/inward': [
        { id: 1, date: '2025-12-14', truckNo: 'TN-45-AZ-1234', commodity: 'Paddy', bags: 450, weight: 22.5, from: 'Thanjavur CPC', status: 'Arrived' },
        { id: 2, date: '2025-12-14', truckNo: 'TN-67-H-9876', commodity: 'Wheat', bags: 200, weight: 10.0, from: 'Madurai Center', status: 'In Transit' }
    ],
    '/api/movement/outward': [
        { id: 101, date: '2025-12-14', truckNo: 'TN-22-BY-5544', commodity: 'Rice', bags: 300, weight: 15.0, to: 'FPS-Trichy-001', status: 'Dispatched' },
        { id: 102, date: '2025-12-13', truckNo: 'TN-33-ZZ-9988', commodity: 'Wheat', bags: 450, weight: 22.5, to: 'FPS-Madurai-04', status: 'Delivered' },
        { id: 103, date: '2025-12-12', truckNo: 'TN-01-AB-1122', commodity: 'Sugar', bags: 100, weight: 5.0, to: 'FPS-Chennai-12', status: 'Dispatched' }
    ],
    '/api/movement/rail': [
        { id: 'R-7788', trainNo: 'TK-Express', wagons: 42, commodity: 'Rice', eta: '14:30', source: 'Punjab', status: 'On Time' },
        { id: 'R-9900', trainNo: 'Goods-404', wagons: 28, commodity: 'Wheat', eta: '18:45', source: 'Andhra', status: 'Delayed' }
    ],
    // Analytics Mocks
    '/api/analytics/kpi': {
        riskScore: 72,
        activeAlerts: 12,
        pendingInspections: 8,
        storageUtilization: 84
    },
    '/api/analytics/risk-trend': [
        { month: 'Jan', risk: 45 }, { month: 'Feb', risk: 52 }, { month: 'Mar', risk: 38 },
        { month: 'Apr', risk: 65 }, { month: 'May', risk: 58 }, { month: 'Jun', risk: 72 }
    ],
    '/api/analytics/district-stats': [
        { name: 'Thanjavur', risk: 85 }, { name: 'Madurai', risk: 60 }, { name: 'Chennai', risk: 40 },
        { name: 'Trichy', risk: 55 }, { name: 'Salem', risk: 25 }
    ],
    '/api/analytics/alerts': [
        { id: 1, type: 'Moisture', message: 'High moisture (14.2%) details in TNJ001', severity: 'Critical', time: '2 hrs ago' },
        { id: 2, type: 'Stock', message: 'Low stock warning in MDU005', severity: 'Warning', time: '5 hrs ago' }
    ]
};

export const api = {
    get: async (endpoint) => {
        try {
            // Check if running on GitHub Pages (Mock Mode) or if Force Mock is enabled
            // Also enable mock mode if we are in development but backend is unresponsive (simplified for this context)
            // Check if running on GitHub Pages (Mock Mode) - Localhost should use real backend if available
            // Only force mock if explicitly requested or on static host
            if (window.location.hostname.includes('github.io') || import.meta.env.VITE_USE_MOCK === 'true') {
                console.warn('Using Mock Data for:', endpoint);

                // 1. Direct Match
                if (MOCK_DATA[endpoint]) return MOCK_DATA[endpoint];

                // 2. Dynamic Match: /api/godowns/:id
                if (endpoint.includes('/api/godowns/')) {
                    const id = endpoint.split('/').pop();
                    const godownProxy = MOCK_DATA['/godowns'].data.find(g => g.id === id);
                    if (godownProxy) return godownProxy;
                    // Fallback to first if ID not found (for demo robustness)
                    return MOCK_DATA['/godowns'].data[0];
                }

                // 3. Dynamic Match: /api/stock/lots/:id
                if (endpoint.includes('/api/stock/lots/')) {
                    // Return random subset of lots for demo
                    return MOCK_DATA['/stock/lots'];
                }

                // 4. Movement/Partial Match
                const partialKey = Object.keys(MOCK_DATA).find(k => endpoint.endsWith(k));
                if (partialKey) return MOCK_DATA[partialKey];
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            // Fallback strategy for errors
            if (endpoint.includes('/godowns')) return MOCK_DATA['/godowns'];
            if (endpoint.includes('movement/outward')) return MOCK_DATA['/api/movement/outward'];
            if (endpoint.includes('movement/rail')) return MOCK_DATA['/api/movement/rail'];

            throw error;
        }
    },
    post: async (endpoint, data) => {
        try {
            if (window.location.hostname.includes('github.io') || import.meta.env.VITE_USE_MOCK === 'true') {
                console.log('Mock POST success');
                return { success: true, message: 'Operation simulated successfully (Static Mode)' };
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    },
    patch: async (endpoint, data) => {
        try {
            if (window.location.hostname.includes('github.io') || import.meta.env.VITE_USE_MOCK === 'true') {
                console.log('Mock PATCH success');
                return { success: true, data: { ...data, status: 'Updated' } };
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            throw error;
        }
    }
};
