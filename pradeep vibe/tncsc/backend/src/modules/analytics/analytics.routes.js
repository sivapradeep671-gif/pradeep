const express = require('express');
const router = express.Router();
const riskService = require('../risk-engine/risk.service');
const db = require('../../database/db');

// Feature 2: Inventory Loss Trends
router.get('/loss-trends', async (req, res) => {
    try {
        const godowns = await db.find('godowns'); // Get all godowns
        const trends = await Promise.all(godowns.map(async (g) => {
            const lossData = await riskService.calculateInventoryLoss(g.id);
            return {
                ...g,
                ...lossData
            };
        }));

        res.json({ success: true, data: trends });
    } catch (error) {
        console.error('Loss Trends Error:', error);
        res.status(500).json({ success: false, message: 'Failed to calculate loss trends' });
    }
});

// Feature 3: Impact Analytics (New)
router.get('/impact', async (req, res) => {
    try {
        // Mock Data - In a real scenario, this would aggregate from historical logs
        const data = {
            preventionData: [
                { district: 'Thanjavur', prevented: 450, cost: 85 },
                { district: 'Tiruvarur', prevented: 380, cost: 72 },
                { district: 'Nagapattinam', prevented: 320, cost: 60 },
                { district: 'Trichy', prevented: 280, cost: 52 },
                { district: 'Madurai', prevented: 210, cost: 40 },
            ],
            comparisonData: [
                { month: 'Jan', pilot: 1.2, nonPilot: 3.5 },
                { month: 'Feb', pilot: 1.0, nonPilot: 3.8 },
                { month: 'Mar', pilot: 0.8, nonPilot: 4.2 },
                { month: 'Apr', pilot: 0.9, nonPilot: 4.0 },
                { month: 'May', pilot: 0.7, nonPilot: 4.5 },
                { month: 'Jun', pilot: 0.6, nonPilot: 4.3 },
            ],
            financial: {
                totalSaved: '12.4 Cr',
                yoyGrowth: 15,
                roi: '8.5x',
                mitigationCost: '1.45 Cr'
            },
            beneficiary: {
                familiesServed: '2.4 Crore',
                cardHoldersImpacted: 98.2
            },
            operational: {
                turnaroundTime: '4.2 Hrs',
                stockIntegrity: 99.8
            },
            infrastructureGaps: [
                { district: 'Dharmapuri', riskScore: 88, gap: 'Inadequate Dryer Coverage', action: 'Procure 12 Mobile Dryers' },
                { district: 'Villupuram', riskScore: 82, gap: 'Roof Leakages (G4/G5)', action: 'Urgent Civil Repair' },
                { district: 'Salem', riskScore: 64, gap: 'Low Ventilation', action: 'Install Exhaust Systems' }
            ]
        };

        res.json({ success: true, data });
    } catch (error) {
        console.error('Impact Analytics Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch impact analytics' });
    }
});

// Feature 4: Inventory Aging Analytics (New)
router.get('/inventory', async (req, res) => {
    try {
        const data = {
            agingData: [
                { range: '0-3 Months', rice: 4500, wheat: 2400, paddy: 6700 },
                { range: '3-6 Months', rice: 3200, wheat: 1800, paddy: 4100 },
                { range: '6-9 Months', rice: 1800, wheat: 900, paddy: 2200 },
                { range: '9-12 Months', rice: 800, wheat: 400, paddy: 1100 },
                { range: '> 1 Year', rice: 200, wheat: 150, paddy: 600 },
            ],
            pieData: [
                { name: 'Fresh Stock', value: 65, color: '#10b981' }, // Green
                { name: 'Aging', value: 25, color: '#f59e0b' },      // Amber
                { name: 'Critical', value: 10, color: '#ef4444' },   // Red
            ],
            commodities: [
                { name: 'Paddy', totalStock: "12,500", oldStock: "12%", days: "145", color: "text-yellow-500" },
                { name: 'Rice (Boiled)', totalStock: "8,400", oldStock: "5%", days: "85", color: "text-teal-500" },
                { name: 'Wheat', totalStock: "4,200", oldStock: "2%", days: "45", color: "text-amber-700" },
                { name: 'Sugar', totalStock: "1,800", oldStock: "0.5%", days: "20", color: "text-blue-500" }
            ],
            healthIndex: 89,
            recommendation: "Prioritize dispatch of 200 MT Rice from Thanjavur Godown A due to aging > 1 year."
        };

        res.json({ success: true, data });
    } catch (error) {
        console.error('Inventory Analytics Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch inventory analytics' });
    }
});

module.exports = router;
