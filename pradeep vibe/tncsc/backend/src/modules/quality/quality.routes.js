const express = require('express');
const router = express.Router();
const qualityService = require('./quality.service');

// Get Live Sensor Data
router.get('/sensors', async (req, res) => {
    try {
        const data = await qualityService.getSensorData();
        res.json({ success: true, data });
    } catch (error) {
        console.error('Quality Sensor Error:', error);
        res.status(500).json({ success: false, message: 'Sensor Network Unreachable' });
    }
});

module.exports = router;
