// Simple In-Memory Database to replace the previous mock arrays
// Structured to look like Async ORM calls for easy swap to Prisma/TypeORM


class MockDB {
    constructor() {
        this.users = [
            { id: 1, name: 'S. Raghavan', email: 'admin@tncsc.tn.gov.in', role: 'HQ', district: 'State', password: 'hash_password' },
            { id: 2, name: 'K. Meera', email: 'rm.thanjavur@tncsc.tn.gov.in', role: 'RegionalManager', district: 'Thanjavur', password: 'hash_password' },
            { id: 3, name: 'P. Velu', email: 'clerk.mannargudi@tncsc.tn.gov.in', role: 'FieldOfficer', district: 'Thanjavur', password: 'hash_password' },
            { id: 4, name: 'M. Selvam', email: 'driver@tncsc.tn.gov.in', role: 'Driver', district: 'Thanjavur', password: 'hash_password' },
            { id: 5, name: 'A. Kumar', email: 'hq.analyst@tncsc.tn.gov.in', role: 'HQAnalyst', district: 'State', password: 'hash_password' }
        ];

        // Districts of Tamil Nadu (subset for mock)
        this.districts = [
            { id: 'TNJ', name: 'Thanjavur', riskLevel: 'High', activeIncidents: 12, slaCompliance: '88%' },
            { id: 'MDU', name: 'Madurai', riskLevel: 'Medium', activeIncidents: 5, slaCompliance: '92%' },
            { id: 'CBE', name: 'Coimbatore', riskLevel: 'Low', activeIncidents: 2, slaCompliance: '98%' },
            { id: 'CHE', name: 'Chennai', riskLevel: 'High', activeIncidents: 15, slaCompliance: '85%' }
        ];

        this.godowns = [
            { id: 'TNJ001', name: 'Thanjavur Central Godown', district: 'Thanjavur', capacity: 5000, lat: 10.7870, lng: 79.1378, status: 'Active', manager: 'K. Raghavan', riskScore: 85, lastInspection: '2025-12-10', stock: 4250, humidity: 82 },
            { id: 'MDU005', name: 'Madurai North Godown', district: 'Madurai', capacity: 3500, lat: 9.9252, lng: 78.1198, status: 'Active', manager: 'P. Velu', riskScore: 45, lastInspection: '2025-12-12', stock: 1200, humidity: 65 },
            { id: 'CBE002', name: 'Coimbatore Logistics Hub', district: 'Coimbatore', capacity: 8000, lat: 11.0168, lng: 76.9558, status: 'Active', manager: 'D. Karthik', riskScore: 12, lastInspection: '2025-12-14', stock: 6800, humidity: 55 },
            { id: 'CHE009', name: 'Chennai Harbor Storage', district: 'Chennai', capacity: 12000, lat: 13.0827, lng: 80.2707, status: 'Active', manager: 'R. Suresh', riskScore: 92, lastInspection: '2025-12-08', stock: 11500, humidity: 88 },
            { id: 'SAL003', name: 'Salem Regional Warehouse', district: 'Salem', capacity: 4200, lat: 11.6643, lng: 78.1460, status: 'Active', manager: 'G. Lakshmi', riskScore: 30, lastInspection: '2025-12-11', stock: 2100, humidity: 60 }
        ];

        this.trucks = [
            { id: 'TN-45-AQ-1234', driverId: 4, type: 'Heavy Duty', capacity: '10 Tons', status: 'In Transit' },
            { id: 'TN-49-BT-5678', driverId: null, type: 'Medium', capacity: '5 Tons', status: 'Idle' }
        ];

        this.trips = [
            { id: 1, truckId: 'TN-45-AQ-1234', driverId: 4, origin: 'TNJ001', destination: 'FPS-CHE-042', status: 'Started', startTime: '2025-12-23T10:00:00Z', geofenceViolation: false },
            { id: 2, truckId: 'TN-49-BT-5678', driverId: null, origin: 'MDU005', destination: 'FPS-MDU-101', status: 'Pending', startTime: null, geofenceViolation: false }
        ];

        this.inspections = [
            { id: 1, godownId: 'TNJ001', officerId: 3, date: '2025-12-20', moisture: 14.5, pests: 'None', photos: ['img1.jpg'], status: 'Synced' }
        ];

        this.incidents = [
            { id: 1, title: 'Moisture Spike', type: 'Quality', godownId: 'TNJ001', status: 'Open', severity: 'High', officerId: 3, assigneeId: 5, slaDeadline: '2025-12-24T10:00:00Z', history: [{ msg: 'Incident raised', time: '2025-12-23T12:00:00Z' }] }
        ];

        this.alerts = [
            { id: 1, godownId: 'TNJ001', type: 'Moisture', severity: 'Critical', message: 'Moisture level 18% detected', status: 'Open', date: '2025-12-14' }
        ];

        this.auditLog = [
            { id: 1, action: 'STOCK_MOVEMENT', details: '10 tons rice moved from TNJ001 to CHE009', timestamp: '2025-12-23T09:00:00Z', hash: '5f3c...' }
        ];

        this.config = [
            { id: 1, type: 'system_rules', humidityThreshold: 80, moistureThreshold: 14, stockAgeAlert: 90 }
        ];

        console.log('Mock Database Initialized with Extended Schema');
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

    async logAction(action, details) {
        const entry = {
            id: this.auditLog.length + 1,
            action,
            details,
            timestamp: new Date().toISOString(),
            hash: Buffer.from(`${action}-${details}-${Date.now()}`).toString('hex').substring(0, 16)
        };
        this.auditLog.push(entry);
        return entry;
    }
}

module.exports = new MockDB();

