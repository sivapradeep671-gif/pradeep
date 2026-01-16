const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3006;
const BASE_URL = `http://localhost:${PORT}/api/v1/admin`;

async function runTests() {
    console.log('--- Testing Officer Performance API ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        console.log('[TEST 1] Fetching Leaderboard...');
        const res = await axios.get(`${BASE_URL}/officer-performance`);

        if (res.data.success && Array.isArray(res.data.data)) {
            console.log(`✅ PASS: Fetched data for ${res.data.data.length} officers.`);

            const list = res.data.data;
            const top = list[0];
            console.log(`   Top Performer: ${top.name} (Score: ${top.score})`);
            console.log(`   Metrics: Resolved ${top.metrics.resolved}/${top.metrics.totalIncidents}, SLA ${top.metrics.slaCompliance}%`);

            // Verify Sorting
            if (list.length > 1 && list[0].score >= list[1].score) {
                console.log(`✅ PASS: Leaderboard is correctly sorted by Score DESC.`);
            } else if (list.length > 1) {
                console.error('❌ FAIL: Sorting logic incorrect.');
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
