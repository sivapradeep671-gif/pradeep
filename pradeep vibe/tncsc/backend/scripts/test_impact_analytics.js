const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}/api/v1/analytics`;

async function runTests() {
    console.log('--- Testing Impact Analytics API ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        console.log('[TEST 1] Fetching Impact Data...');
        const res = await axios.get(`${BASE_URL}/impact`);

        if (res.data.success && res.data.data) {
            const data = res.data.data;
            console.log(`✅ PASS: Fetched impact data successfully.`);

            // Verify structure
            if (data.preventionData && data.comparisonData && data.financial) {
                console.log(`   Data Structure Validated:`);
                console.log(`   - Financial Saved: ${data.financial.totalSaved}`);
                console.log(`   - Prevention Records: ${data.preventionData.length}`);
                console.log(`   - Infrastructure Gaps: ${data.infrastructureGaps.length}`);
            } else {
                console.error('❌ FAIL: Missing key data fields');
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
