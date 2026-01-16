const db = require('../../database/db');

// Feature 3: IoT Sensor Simulation Service
class QualityService {
    async getSensorData() {
        // Fetch all godowns
        const godowns = await db.find('godowns');

        // Generate simulated IoT data for each godown
        const report = godowns.map(godown => {
            // Simulate random sensor readings
            // Temperature (Safe: 20-30°C)
            const temperature = parseFloat(((Math.random() * 20) + 15).toFixed(1)); // 15 - 35

            // Humidity (Safe: < 70%)
            const humidity = Math.floor(Math.random() * 50) + 40; // 40 - 90

            // Grain Moisture (Safe: 13-14%)
            const grainMoisture = parseFloat(((Math.random() * 5) + 11).toFixed(1)); // 11 - 16

            // Pest Detection
            const pestLevels = ['None', 'Low', 'Low', 'Medium', 'High'];
            const pests = pestLevels[Math.floor(Math.random() * pestLevels.length)];

            // Logic for Alerts & Recommendations
            const alerts = [];
            const recommendations = [];

            if (temperature > 30) {
                alerts.push({ type: 'Temperature', severity: 'Warning', msg: `High Temp (${temperature}°C)` });
                recommendations.push('Increase Cooling / Aeration');
            }

            if (humidity > 75) {
                alerts.push({ type: 'Humidity', severity: 'Critical', msg: `High Humidity (${humidity}%)` });
                recommendations.push('Active Ventilation Required');
            }

            if (grainMoisture > 14.5) {
                alerts.push({ type: 'Moisture', severity: 'Critical', msg: `Grain Moisture High (${grainMoisture}%)` });
                recommendations.push('Immediate Drying Process');
            }

            if (pests === 'High' || pests === 'Medium') {
                alerts.push({ type: 'Pest', severity: 'High', msg: `Pest Activity: ${pests}` });
                recommendations.push('Schedule Fumigation');
            }

            return {
                godownId: godown.id,
                godownName: godown.name,
                district: godown.district,
                sensors: {
                    temperature,
                    humidity,
                    grainMoisture,
                    pests
                },
                status: alerts.length > 0 ? (alerts.some(a => a.severity === 'Critical') ? 'Critical' : 'Warning') : 'Optimal',
                alerts,
                recommendations
            };
        });

        // Calculate aggregate stats
        const stats = {
            total: godowns.length,
            critical: report.filter(r => r.status === 'Critical').length,
            warning: report.filter(r => r.status === 'Warning').length,
            optimal: report.filter(r => r.status === 'Optimal').length
        };

        return { stats, report };
    }
}

module.exports = new QualityService();
