const express = require('express');
const router = express.Router();
const db = require('../../database/db');
const riskService = require('../risk-engine/risk.service');

router.get('/dashboard', async (req, res) => {
    // Aggregated Metrics
    const godowns = await db.find('godowns');
    const alerts = await db.find('alerts');

    // Calculate realtime risk for all godowns (heavy operation in real life, cached here)
    let highRiskCount = 0;
    for (const g of godowns) {
        const score = await riskService.calculateRisk(g.id);
        if (score > 75) highRiskCount++;
    }

    res.json({
        success: true,
        data: {
            totalGodowns: godowns.length,
            highRiskGodowns: highRiskCount,
            activeAlerts: alerts.filter(a => a.status === 'Open').length,
            spoilagePreventedValue: '₹ 4.2 Cr' // Dummy for now
        }
    });
});

module.exports = router;
