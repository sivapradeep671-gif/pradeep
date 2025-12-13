const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// --- MOCK DATA ---
const MOVEMENT_INWARD = [
    { id: 'TR-2023-001', date: '2025-12-11', truckNo: 'TN-45-AZ-1234', commodity: 'Paddy (Gbr)', quantity: '12 MT', source: 'Thanjavur DPC', status: 'Unloading' },
    { id: 'TR-2023-002', date: '2025-12-11', truckNo: 'TN-63-XY-9876', commodity: 'Rice (Raw)', quantity: '20 MT', source: 'Mannargudi Mill', status: 'Weighbridge' },
    { id: 'TR-2023-003', date: '2025-12-10', truckNo: 'TN-49-BC-5678', commodity: 'Paddy (Common)', quantity: '15 MT', source: 'Orathanadu DPC', status: 'Completed' }
];

const MOVEMENT_OUTWARD = [
    { id: 'OUT-2023-889', date: '2025-12-11', truckNo: 'TN-45-H-4455', commodity: 'Boiled Rice', quantity: '10 MT', destination: 'Pudukkottai FPS', status: 'In Transit' },
    { id: 'OUT-2023-890', date: '2025-12-10', truckNo: 'TN-33-L-1122', commodity: 'Wheat', quantity: '8 MT', destination: 'Trichy Dist Warehouse', status: 'Delivered' }

];

const RAIL_CONSIGNMENTS = [
    { id: 'R-9901', trainNo: 'TRN-22451', wagons: 42, commodity: 'Paddy', source: 'Punjab Depot', destination: 'Thanjavur Main', eta: '2025-12-12', status: 'In Transit (GPS Verified)' },
    { id: 'R-9902', trainNo: 'TRN-12888', wagons: 55, commodity: 'Wheat', source: 'Bhopal Central', destination: 'Coimbatore', eta: '2025-12-14', status: 'Dispatched' }
];

const STOCK_LOTS = [
    { id: 'L-101', stackNo: 'S-01', commodity: 'Paddy (Gbr)', bags: 1200, weight: '60 MT', moisture: '13.5%', age: '45 Days', grade: 'A' },
    { id: 'L-102', stackNo: 'S-02', commodity: 'Rice (Boiled)', bags: 850, weight: '42.5 MT', moisture: '11.0%', age: '120 Days', grade: 'FAQ' },
    { id: 'L-103', stackNo: 'S-03', commodity: 'Wheat', bags: 500, weight: '25 MT', moisture: '10.2%', age: '15 Days', grade: 'A' },
    { id: 'L-104', stackNo: 'S-04', commodity: 'Sugar', bags: 200, weight: '10 MT', moisture: 'N/A', age: '10 Days', grade: 'S-30' },
    { id: 'L-105', stackNo: 'S-05', commodity: 'Palm Oil', bags: 500, weight: '500 L', moisture: 'N/A', age: '5 Days', grade: 'Refined' }
];

const ADMIN_USERS = [
    { id: 1, name: 'S. Raghavan', role: 'HQ Admin', region: 'State', lastActive: 'Now' },
    { id: 2, name: 'K. Meera', role: 'Regional Manager', region: 'Thanjavur', lastActive: '2 hrs ago' },
    { id: 3, name: 'P. Velu', role: 'Godown In-charge', region: 'Mannargudi', lastActive: '5 mins ago' }
];

const ADMIN_RULES = {
    humidityThreshold: 80,
    moistureThreshold: 14,
    stockAgeAlert: 90, // days
    slaResolutionHours: 24
};

const LOCATIONS = [
    { id: 1, name: 'Thanjavur Main', lat: 10.7870, lng: 79.1378, risk: 'High', stock: 4500, humidity: 82, lastInspection: '2025-12-01' },
    { id: 2, name: 'Kumbakonam', lat: 10.9601, lng: 79.3874, risk: 'Medium', stock: 3200, humidity: 75, lastInspection: '2025-12-08' },
    { id: 3, name: 'Mannargudi', lat: 10.6660, lng: 79.4440, risk: 'Low', stock: 1800, humidity: 65, lastInspection: '2025-12-10' }
];

const FIELD_TASKS = [
    { id: 101, title: 'Verify Stock Levels', location: 'Thanjavur Main', priority: 'Critical', dueDate: '2025-12-12', riskReason: 'High Humidity Alert' },
    { id: 102, title: 'Inspect Roof Leak', location: 'Kumbakonam', priority: 'High', dueDate: '2025-12-13', riskReason: 'Reported by Staff' },
    { id: 103, title: 'Routine Audit', location: 'Mannargudi', priority: 'Normal', dueDate: '2025-12-15', riskReason: 'Scheduled' }
];

// Routes
app.get('/api/risk-map', (req, res) => {
    res.json(LOCATIONS);
});

app.get('/api/godowns/:id', (req, res) => {
    const godown = LOCATIONS.find(l => l.id == req.params.id) || LOCATIONS[0];
    res.json(godown);
});

app.get('/api/field-tasks', (req, res) => {
    res.json(FIELD_TASKS);
});

// Analytics: KPI Summary
app.get('/api/analytics/kpi', (req, res) => {
    res.json({
        highRiskGodowns: 12,
        stockAtRisk: 8500, // MT
        incidentsToday: 3,
        slaBreaches: 1,
        activeAlerts: 5
    });
});

// Analytics: Risk Trend (Mock Time Series)
app.get('/api/analytics/risk-trend', (req, res) => {
    const dates = ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07'];
    const data = dates.map(date => ({
        date,
        incidents: Math.floor(Math.random() * 5),
        resolved: Math.floor(Math.random() * 4)
    }));
    res.json(data);
});

// Analytics: District Stats
app.get('/api/analytics/district-stats', (req, res) => {
    const districts = [
        { name: 'Thanjavur', riskScore: 85, stock: 45000 },
        { name: 'Trichy', riskScore: 65, stock: 32000 },
        { name: 'Madurai', riskScore: 45, stock: 28000 },
        { name: 'Coimbatore', riskScore: 30, stock: 15000 },
        { name: 'Erode', riskScore: 55, stock: 22000 }
    ];
    res.json(districts);
});

// Analytics: Active Alerts Queue
app.get('/api/analytics/alerts', (req, res) => {
    const alerts = [
        { id: 201, type: 'Moisture', location: 'Thanjavur G-01', severity: 'Critical', status: 'New', time: '10:30 AM', assignee: 'Ram Kumar' },
        { id: 202, type: 'Pest', location: 'Trichy G-04', severity: 'High', status: 'In Progress', time: '11:15 AM', assignee: 'Suresh' },
        { id: 203, type: 'Structural', location: 'Madurai G-02', severity: 'Medium', status: 'Pending', time: '09:00 AM', assignee: 'Unassigned' },
        { id: 204, type: 'Temp', location: 'Erode G-09', severity: 'High', status: 'New', time: '12:45 PM', assignee: 'Unassigned' }
    ];
    res.json(alerts);
});



// --- MOVEMENT & LOGISTICS ENDPOINTS ---
app.get('/api/movement/inward', (req, res) => res.json(MOVEMENT_INWARD));
app.get('/api/movement/outward', (req, res) => res.json(MOVEMENT_OUTWARD));
app.get('/api/movement/rail', (req, res) => res.json(RAIL_CONSIGNMENTS));
app.get('/api/stock/lots/:godownId', (req, res) => res.json(STOCK_LOTS)); // Mocking same lots for any godown for now

// --- ADMIN ENDPOINTS ---
app.get('/api/admin/users', (req, res) => res.json(ADMIN_USERS));
app.get('/api/admin/rules', (req, res) => res.json(ADMIN_RULES));
app.post('/api/admin/rules', (req, res) => {
    // In a real app, we would update the DB here
    console.log('Rules updated:', req.body);
    res.json({ success: true, message: 'Configuration Updated' });
});

// Trigger Calculation Job (Simulated Cron)
app.post('/api/jobs/calc-risk', (req, res) => {
    res.json({ message: 'Risk calculation job triggered' });
});

/**
 * POST /api/reports/field
 * Field level inspection reports - Structured & Statutory Compliant
 */
app.post('/api/reports/field', (req, res) => {
    const report = {
        id: `INS-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        ...req.body,
        status: 'Submitted', // Default status
        workflowLog: [
            { status: 'Submitted', timestamp: new Date().toISOString(), actor: req.body.metadata?.officerName || 'Field Officer' }
        ]
    };
    console.log('Structured Field Report Received:', JSON.stringify(report, null, 2));
    // In a real app, save to MongoDB/Postgres
    res.json({ success: true, message: 'Inspection Report Filed Successfully', reportId: report.id });
});

/**
 * POST /api/reports/weekend
 * Weekly stock and status data
 */
app.post('/api/reports/weekend', (req, res) => {
    console.log('Weekend Data Received:', req.body);
    res.json({ success: true, message: 'Weekend data submitted successfully' });
});

// Serve Static Frontend Assets (Production)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`TNCSC Decision Support API running on port ${PORT}`);
});
