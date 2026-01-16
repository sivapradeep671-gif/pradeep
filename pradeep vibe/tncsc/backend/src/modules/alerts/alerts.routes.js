const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// Controller Logic Inline for simplicity in this artifact
// Controller Logic Inline for simplicity in this artifact
router.get('/', async (req, res) => {
    // In a real app, this would come from the DB
    const alerts = [
        { id: 1, priority: 'Critical', title: 'Excess Moisture Detected', location: 'Thanjavur Main Godown', date: '2 hrs ago', status: 'Open', type: 'Moisture' },
        { id: 2, priority: 'High', title: 'Aging Threshold Breached', location: 'Mannargudi G1', date: '5 hrs ago', status: 'In Progress', type: 'Aging' },
        { id: 3, priority: 'Medium', title: 'Pest Control Overdue', location: 'Madurai North', date: '1 day ago', status: 'Open', type: 'Pest' },
        { id: 4, priority: 'Medium', title: 'Stock Discrepancy', location: 'Trichy Buffer', date: '2 days ago', status: 'Resolved', type: 'Stock' },
    ];

    // Also fetch tasks if needed, or separate route
    const tasks = [
        { id: 101, title: "Conduct manual moisture test", assignee: "R. Kumar (QM)", status: "In Progress" },
        { id: 102, title: "Verify aeration fan functionality", assignee: "S. Singh (Tech)", status: "Open" },
        { id: 103, title: "Notify Regional Manager", assignee: "System", status: "Resolved" }
    ];

    res.json({ success: true, count: alerts.length, data: { alerts, tasks } });
});

router.post('/', async (req, res) => {
    const newAlert = await db.create('alerts', {
        ...req.body,
        status: 'Open',
        date: new Date().toISOString()
    });
    res.json({ success: true, message: 'Alert Created', data: newAlert });
});

module.exports = router;
