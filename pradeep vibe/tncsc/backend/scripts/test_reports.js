const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3007;
const BASE_URL = `http://localhost:${PORT}/api/v1/reports`;

async function runTests() {
    console.log('--- Testing CAG Audit Report API ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        console.log('[TEST 1] Fetching Audit Data...');
        const res = await axios.get(`${BASE_URL}/cag-audit`);

        if (res.data.success && res.data.data.stats) {
            const d = res.data.data;
            console.log(`✅ PASS: Audit Data aggregated successfully.`);
            console.log(`   Inventory: ${d.stats.currentStock}/${d.stats.totalCapacity} MT`);
            console.log(`   Est. Loss Value: Rs. ${d.stats.lossValue}`);
            console.log(`   Anomalies Detected: ${d.anomalies.length}`);
            console.log(`   Open Critical Incidents: ${d.criticalIncidents.length}`);

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
