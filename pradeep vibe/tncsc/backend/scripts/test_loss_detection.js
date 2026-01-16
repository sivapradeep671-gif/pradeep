const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3003;
const BASE_URL = `http://localhost:${PORT}/api/v1/analytics`;

async function runTests() {
    console.log('--- Testing Inventory Loss Detection ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        console.log('[TEST 1] Fetching Loss Trends...');
        const res = await axios.get(`${BASE_URL}/loss-trends`);

        if (res.data.success && Array.isArray(res.data.data)) {
            console.log(`✅ PASS: Fetched trends for ${res.data.data.length} godowns.`);

            const anomalies = res.data.data.filter(g => g.abnormalDetected);
            console.log(`   Anomalies Detected: ${anomalies.length}`);

            if (anomalies.length > 0) {
                console.log(`✅ PASS: System correctly identified at least one high-risk godown.`);
                console.log(`   Sample Anomaly: ${anomalies[0].name} (Loss: ${anomalies[0].avgLoss}%)`);
            } else {
                console.warn('⚠️ WARNING: No anomalies generated (Random chance or logic issue). Rerun might be needed.');
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
