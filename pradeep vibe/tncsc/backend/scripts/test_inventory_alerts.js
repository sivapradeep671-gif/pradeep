const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3006;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

async function runTests() {
    console.log('--- Testing Inventory & Alerts APIs ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        // Test 1: Inventory
        console.log('[TEST 1] Fetching Inventory Analytics...');
        const invRes = await axios.get(`${BASE_URL}/analytics/inventory`);

        if (invRes.data.success && invRes.data.data) {
            console.log(`✅ PASS: Fetched inventory data.`);
            console.log(`   - Commodities: ${invRes.data.data.commodities.length}`);
            console.log(`   - Health Index: ${invRes.data.data.healthIndex}%`);
        } else {
            console.error('❌ FAIL: Invalid inventory response', invRes.data);
        }

        // Test 2: Alerts
        console.log('[TEST 2] Fetching Alerts...');
        const alertRes = await axios.get(`${BASE_URL}/alerts`);

        if (alertRes.data.success && alertRes.data.data) {
            console.log(`✅ PASS: Fetched alerts data.`);
            console.log(`   - Active Alerts: ${alertRes.data.data.alerts.length}`);
            console.log(`   - Related Tasks: ${alertRes.data.data.tasks.length}`);
        } else {
            console.error('❌ FAIL: Invalid alerts response', alertRes.data);
        }

    } catch (error) {
        console.error('❌ FAIL: Request failed', error.message);
    } finally {
        server.close();
        console.log('Test Server Stopped.');
    }
}

runTests();
