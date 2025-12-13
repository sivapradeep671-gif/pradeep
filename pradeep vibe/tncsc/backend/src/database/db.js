// Simple In-Memory Database to replace the previous mock arrays
// Structured to look like Async ORM calls for easy swap to Prisma/TypeORM

class MockDB {
    constructor() {
        this.users = [
            { id: 1, name: 'S. Raghavan', email: 'admin@tncsc.tn.gov.in', role: 'HQ', district: 'State', password: 'hash_password' },
            { id: 2, name: 'K. Meera', email: 'rm.thanjavur@tncsc.tn.gov.in', role: 'RegionalManager', district: 'Thanjavur', password: 'hash_password' },
            { id: 3, name: 'P. Velu', email: 'clerk.mannargudi@tncsc.tn.gov.in', role: 'GodownClerk', district: 'Thanjavur', password: 'hash_password' }
        ];

        this.godowns = [
            { id: 'TNJ001', name: 'Thanjavur Main Godown', district: 'Thanjavur', capacity: 15000, lat: 10.7870, lng: 79.1378, status: 'Active', manager: 'K. Raghavan' },
            { id: 'TNJ002', name: 'Kumbakonam Central', district: 'Thanjavur', capacity: 8500, lat: 10.9601, lng: 79.3874, status: 'Active', manager: 'S. Priya' },
            { id: 'MDU005', name: 'Madurai Kappalur', district: 'Madurai', capacity: 12000, lat: 9.9252, lng: 78.1198, status: 'Active', manager: 'P. Velu' },
            { id: 'CHE012', name: 'Ambattur FCI', district: 'Chennai', capacity: 20000, lat: 13.1143, lng: 80.1548, status: 'Active', manager: 'R. Suresh' },
            { id: 'TVR008', name: 'Mannargudi DPC', district: 'Tiruvarur', capacity: 5000, lat: 10.6660, lng: 79.4440, status: 'Active', manager: 'M. Anitha' },
            { id: 'CBE003', name: 'Coimbatore West', district: 'Coimbatore', capacity: 10000, lat: 11.0168, lng: 76.9558, status: 'Active', manager: 'D. Karthik' },
            { id: 'VPM004', name: 'Villupuram Junction', district: 'Villupuram', capacity: 7500, lat: 11.9401, lng: 79.4861, status: 'Maintenance', manager: 'G. Lakshmi' }
        ];

        this.inventory = [
            { id: 1, godownId: 'TNJ001', commodity: 'Paddy (Common)', quantity: 12400, receivedDate: '2025-11-20', status: 'Good' },
            { id: 2, godownId: 'TNJ001', commodity: 'Rice (Boiled)', quantity: 1200, receivedDate: '2025-10-01', status: 'Good' },
            { id: 3, godownId: 'TVR008', commodity: 'Paddy (Grade A)', quantity: 4800, receivedDate: '2025-09-15', status: 'Risk' }, // High Moisture
            { id: 4, godownId: 'MDU005', commodity: 'Wheat', quantity: 8000, receivedDate: '2025-11-05', status: 'Good' },
            { id: 5, godownId: 'TNJ002', commodity: 'Paddy', quantity: 6000, receivedDate: '2025-12-01', status: 'Good' }
        ];

        this.alerts = [
            { id: 1, godownId: 'TVR008', type: 'Moisture', severity: 'Critical', message: 'Moisture level 18% detected (Max 14%)', status: 'Open', date: '2025-12-14' },
            { id: 2, godownId: 'VPM004', type: 'Infrastructure', severity: 'Medium', message: 'Roof leakage reported in Sector 4', status: 'In Progress', date: '2025-12-12' },
            { id: 3, godownId: 'MDU005', type: 'Stock', severity: 'Low', message: 'Stock aging > 45 days', status: 'Open', date: '2025-12-10' }
        ];

        console.log('Mock Database Initialized');
    }

    // --- Generic Helpers ---
    async findOne(collection, predicate) {
        return this[collection].find(predicate) || null;
    }

    async find(collection, predicate = () => true) {
        return this[collection].filter(predicate);
    }

    async create(collection, data) {
        const newItem = { id: this[collection].length + 1, ...data };
        this[collection].push(newItem);
        return newItem;
    }

    async update(collection, id, data) {
        const index = this[collection].findIndex(item => item.id == id);
        if (index === -1) return null;
        this[collection][index] = { ...this[collection][index], ...data };
        return this[collection][index];
    }
}

module.exports = new MockDB();
