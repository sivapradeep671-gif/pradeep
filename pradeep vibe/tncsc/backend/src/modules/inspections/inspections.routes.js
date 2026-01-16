const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// Get all inspections
router.get('/', async (req, res) => {
    const inspections = await db.find('inspections');
    res.json({ success: true, data: inspections });
});

// Record new inspection (Offline sync logic simulated)
router.post('/', async (req, res) => {
    const { godownId, officerId, moisture, pests, photos, syncedAt } = req.body;

    const inspection = await db.create('inspections', {
        godownId,
        officerId,
        moisture,
        pests,
        photos,
        date: new Date().toISOString().split('T')[0],
        status: syncedAt ? 'Synced' : 'Pending Sync'
    });

    // If moisture is high, automatically create an alert
    if (moisture > 14) {
        await db.create('alerts', {
            godownId,
            type: 'Moisture',
            severity: 'Critical',
            message: `High moisture level (${moisture}%) recorded in inspection ${inspection.id}`,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        });
    }

    res.json({ success: true, data: inspection });
});

module.exports = router;
