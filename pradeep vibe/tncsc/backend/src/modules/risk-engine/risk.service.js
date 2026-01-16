const db = require('../../database/db');
const config = require('../../config/config');

class RiskService {
    async calculateRisk(godownId) {
        const godown = await db.findOne('godowns', g => g.id === godownId);
        if (!godown) return 0;

        let totalRisk = 0;

        // 1. Inventory Age Factor (0-30 points)
        const inventory = await db.find('inventory', i => i.godownId === godownId);
        let maxAge = 0;
        inventory.forEach(item => {
            if (item.age > maxAge) maxAge = item.age;
        });

        if (maxAge > 90) totalRisk += 30;
        else totalRisk += (maxAge / 90) * 30;

        // 2. Capacity Utilization (0-20 points)
        const utilization = (godown.stock / godown.capacity) * 100;
        if (utilization > 90) totalRisk += 20;

        // 3. Environmental & Sensor Data (0-30 points)
        // If humidity > 75%, add risk
        if (godown.humidity > 75) totalRisk += 15;

        // Check latest inspection moisture
        const latestInspection = await db.findOne('inspections', i => i.godownId === godownId);
        if (latestInspection && latestInspection.moisture > 14) {
            totalRisk += 15;
        }

        // 4. Active Alerts (0-20 points)
        const activeAlerts = await db.find('alerts', a => a.godownId === godownId && a.status === 'Open');
        totalRisk += Math.min(activeAlerts.length * 10, 20);

        return Math.min(Math.round(totalRisk), 100);
    }

    // Feature 2: Inventory Loss Detection & History Simulation
    async calculateInventoryLoss(godownId) {
        // Mocking 7-day history since we don't have a real historical DB yet
        const today = new Date();
        const history = [];
        let currentStock = 5000; // Base stock
        let abnormalDetected = false;

        // Generate 7 days of data
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            // Simulate daily consumption/loss
            // Normal loss: 0.1% - 0.2% (evaporation/handling)
            // Abnormal loss (Anomaly): > 0.5% (Theft/Spoilage)

            let lossPercent = (Math.random() * 0.15) + 0.05; // Normal: 0.05% - 0.2%

            // Inject anomaly for specific Godown (e.g., TNJ001) for demo
            if (godownId === 'TNJ001' && i === 1) { // 1 day ago
                lossPercent = 3.5; // HUGE loss (Theft)
                abnormalDetected = true;
            }

            const lossAmount = Math.round(currentStock * (lossPercent / 100));
            currentStock -= lossAmount;

            history.push({
                date: date.toISOString().split('T')[0],
                stock: Math.round(currentStock),
                lossAmount,
                lossPercent: parseFloat(lossPercent.toFixed(2)),
                status: lossPercent > 0.5 ? 'Abnormal' : 'Normal'
            });
        }

        // Calculate average loss
        const avgLoss = history.reduce((sum, day) => sum + day.lossPercent, 0) / history.length;

        return {
            godownId,
            currentStock: history[history.length - 1].stock,
            avgLoss: parseFloat(avgLoss.toFixed(2)),
            abnormalDetected,
            history
        };
    }
}

module.exports = new RiskService();
