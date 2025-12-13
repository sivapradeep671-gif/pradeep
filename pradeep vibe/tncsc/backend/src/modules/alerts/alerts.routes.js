const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// Controller Logic Inline for simplicity in this artifact
router.get('/', async (req, res) => {
    const alerts = await db.find('alerts');
    res.json({ success: true, count: alerts.length, data: alerts });
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
