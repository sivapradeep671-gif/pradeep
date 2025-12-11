const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Data
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

app.get('/api/field-tasks', (req, res) => {
    res.json(FIELD_TASKS);
});

// Trigger Calculation Job (Simulated Cron)
app.post('/api/jobs/calc-risk', (req, res) => {
    res.json({ message: 'Risk calculation job triggered' });
});

/**
 * POST /api/reports/field
 * Field level inspection reports
 */
app.post('/api/reports/field', (req, res) => {
    console.log('Field Report Received:', req.body);
    res.json({ success: true, message: 'Report submitted successfully' });
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
