const express = require('express');
const router = express.Router();
const db = require('../../database/db');
const riskService = require('../risk-engine/risk.service');

router.get('/dashboard', async (req, res) => {
    // Aggregated Metrics
    const godowns = await db.find('godowns');
    const alerts = await db.find('alerts');
    const incidents = await db.find('incidents');

    // Calculate realtime risk for all godowns
    let highRiskCount = 0;
    const regionRisk = {};

    for (const g of godowns) {
        const score = await riskService.calculateRisk(g.id);
        if (score > 75) highRiskCount++;

        if (!regionRisk[g.district]) regionRisk[g.district] = { total: 0, count: 0 };
        regionRisk[g.district].total += score;
        regionRisk[g.district].count += 1;
    }

    // SLA Compliance Calculation
    const closedIncidents = incidents.filter(i => i.status === 'Closed');
    const slaComp = closedIncidents.length > 0 ? (closedIncidents.length / incidents.length) * 100 : 85; // Mock fallback

    res.json({
        success: true,
        data: {
            totalGodowns: godowns.length,
            highRiskGodowns: highRiskCount,
            activeAlerts: alerts.filter(a => a.status === 'Open').length,
            spoilagePreventedValue: '₹ 4.2 Cr',
            slaCompliance: `${Math.round(slaComp)}%`,
            regionalRisk: Object.entries(regionRisk).map(([district, stats]) => ({
                district,
                avgRisk: Math.round(stats.total / stats.count)
            }))
        }
    });
});

// Feature 6: CAG Audit Data Aggregation
router.get('/cag-audit', async (req, res) => {
    // 1. Inventory Stats
    const totalCapacity = 450000; // Mock Total
    const currentStock = await db.find('godowns').then(gs => gs.reduce((acc, g) => acc + (g.currentStock || 1000), 0));

    // 2. Loss Anomalies (Feature 2 Logic reused/mocked)
    const anomalies = [
        { godown: 'TNJ001', month: 'Oct', loss: '0.8%', status: 'Critical' },
        { godown: 'MDU005', month: 'Oct', loss: '0.6%', status: 'Warning' }
    ];

    // 3. Critical Incidents
    const incidents = await db.find('incidents');
    const criticalIncidents = incidents.filter(i => i.status === 'Open' || i.type === 'Theft').slice(0, 5);

    // 4. Financial Impact (Mock)
    const lossValue = 250000; // Rs

    res.json({
        success: true,
        data: {
            date: new Date().toISOString(),
            generatedBy: 'System Authority',
            stats: {
                totalCapacity,
                currentStock,
                utilization: ((currentStock / totalCapacity) * 100).toFixed(1),
                lossValue
            },
            anomalies,
            criticalIncidents: criticalIncidents.map(i => ({ id: i.id, title: i.title, type: i.type, status: i.status }))
        }
    });
});

module.exports = router;
