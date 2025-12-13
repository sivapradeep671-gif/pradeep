const API_BASE_URL = import.meta.env.PROD ? 'https://tncsc-risk-guard.onrender.com/api/v1' : '/api/v1';

// MOCK DATA FALLBACK (For GitHub Pages Static Demo)
const MOCK_DATA = {
    '/godowns': {
        success: true,
        data: [
            { id: 'TNJ001', name: 'Thanjavur Central Godown', district: 'Thanjavur', capacity: 5000, riskScore: 85, lat: 10.7870, lng: 79.1378 },
            { id: 'MDU005', name: 'Madurai North Godown', district: 'Madurai', capacity: 3500, riskScore: 45, lat: 9.9252, lng: 78.1198 },
            { id: 'CBE002', name: 'Coimbatore Logistics Hub', district: 'Coimbatore', capacity: 8000, riskScore: 12, lat: 11.0168, lng: 76.9558 },
            { id: 'CHE009', name: 'Chennai Harbor Storage', district: 'Chennai', capacity: 12000, riskScore: 92, lat: 13.0827, lng: 80.2707 },
            { id: 'SAL003', name: 'Salem Regional Warehouse', district: 'Salem', capacity: 4200, riskScore: 30, lat: 11.6643, lng: 78.1460 }
        ]
    },
    '/reports/dashboard': {
        success: true,
        data: {
            totalGodowns: 342,
            highRiskGodowns: 15,
            spoilagePreventedValue: '₹4.2 Cr',
            procurementEfficiency: '94%'
        }
    }
};

export const api = {
    get: async (endpoint) => {
        try {
            // Check if running on GitHub Pages (Mock Mode)
            if (window.location.hostname.includes('github.io')) {
                console.warn('Running in Static Mode (GitHub Pages). Serving Mock Data for:', endpoint);
                const mockKey = Object.keys(MOCK_DATA).find(k => endpoint.includes(k));
                if (mockKey) return MOCK_DATA[mockKey];
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Request Failed:', error);
            // Fallback to Mock Data on Failure
            const mockKey = Object.keys(MOCK_DATA).find(k => endpoint.includes(k));
            if (mockKey) {
                console.log('Serving Mock Data fallback');
                return MOCK_DATA[mockKey];
            }
            throw error;
        }
    },
    post: async (endpoint, data) => {
        try {
            if (window.location.hostname.includes('github.io')) {
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
    }
};
