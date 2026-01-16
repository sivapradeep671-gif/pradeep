const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3004;
const BASE_URL = `http://localhost:${PORT}/api/v1/quality`;

async function runTests() {
    console.log('--- Testing Quality Monitoring API ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        console.log('[TEST 1] Fetching Sensor Data...');
        const res = await axios.get(`${BASE_URL}/sensors`);

        if (res.data.success && res.data.data.report) {
            console.log(`✅ PASS: Fetched sensor data for ${res.data.data.report.length} godowns.`);

            const sample = res.data.data.report[0];
            console.log('   Sample Readings:', sample.sensors);

            if (sample.sensors.temperature && sample.sensors.humidity) {
                console.log(`✅ PASS: Data contains vital metrics (Temp: ${sample.sensors.temperature}°C, Humidity: ${sample.sensors.humidity}%)`);
            } else {
                console.error('❌ FAIL: Missing sensor metrics');
            }

            // Check if alerts work
            const critical = res.data.data.report.find(g => g.status === 'Critical');
            if (critical) {
                console.log(`✅ PASS: System correctly flagged Critical Status.`);
                console.log(`   Alert: ${critical.alerts[0].msg}`);
            }

        } else {
            console.error('❌ FAIL: Invalid response format', res.data);
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ FAIL: Request failed', error.message);
    } finally {
        server.close();
        console.log('Test Server Stopped.');
    }
}

runTests();
