const db = require('../../database/db');
const config = require('../../config/config');

class RiskService {
    // Logic: (Inventory Age * 0.4) + (Utilization > 90% ? 20 : 0) + (Manual Reports)
    async calculateRisk(godownId) {
        const godown = await db.findOne('godowns', g => g.id === godownId);
        if (!godown) return 0;

        let totalRisk = 0;

        // 1. Inventory Age Factor
        const inventory = await db.find('inventory', i => i.godownId === godownId);
        let maxAge = 0;
        // Mocking age calculation from receivedDate
        const now = new Date();
        inventory.forEach(item => {
            const received = new Date(item.receivedDate);
            const ageDays = Math.floor((now - received) / (1000 * 60 * 60 * 24));
            if (ageDays > maxAge) maxAge = ageDays;
        });

        if (maxAge > config.risk.agingThresholdDays) {
            totalRisk += 40; // High risk if very old stock
        } else {
            totalRisk += (maxAge / 180) * 40; // Scaled up to 40 points
        }

        // 2. Capacity Utilization
        const currentStock = inventory.reduce((sum, i) => sum + i.quantity, 0);
        const utilization = (currentStock / godown.capacity) * 100;

        if (utilization > config.risk.utilizationThreshold) {
            totalRisk += 20;
        }

        // 3. Alerts History / Manual Reports
        const activeAlerts = await db.find('alerts', a => a.godownId === godownId && a.status === 'Open');
        totalRisk += activeAlerts.length * 15;

        return Math.min(Math.round(totalRisk), 100);
    }
}

module.exports = new RiskService();
