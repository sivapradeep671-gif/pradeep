const app = require('../src/main');
const http = require('http');
const axios = require('axios');

const PORT = 3007;
const BASE_URL = `http://localhost:${PORT}/api/v1/trips`;

async function runTests() {
    console.log('--- Testing Fleet Logistics API ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        // Test 1: Create a Trip
        console.log('[TEST 1] Creating a new Trip...');
        const newTripData = {
            truckId: "TN-99-TEST-001",
            origin: "Test Origin",
            destination: "Test Dest",
            driverId: "TEST-DRIVER-1"
        };
        const createRes = await axios.post(BASE_URL, newTripData);

        let tripId;
        if (createRes.data.success && createRes.data.data) {
            tripId = createRes.data.data.id;
            console.log(`✅ PASS: Trip Created. ID: ${tripId}, Status: ${createRes.data.data.status}`);
        } else {
            console.error('❌ FAIL: Trip creation failed', createRes.data);
            process.exit(1);
        }

        // Test 2: Fetch Active Trips
        console.log('[TEST 2] Fetching All Trips...');
        const fetchRes = await axios.get(BASE_URL);

        if (fetchRes.data.success && Array.isArray(fetchRes.data.data)) {
            const found = fetchRes.data.data.find(t => t.id === tripId);
            if (found) {
                console.log(`✅ PASS: Newly created trip found in list.`);
            } else {
                console.error('❌ FAIL: Created trip not found in active list');
            }
        } else {
            console.error('❌ FAIL: Failed to fetch trips', fetchRes.data);
        }

        // Test 3: Update Trip Status
        console.log('[TEST 3] Updating Trip Status...');
        const updateRes = await axios.patch(`${BASE_URL}/${tripId}`, { status: 'In Transit' });

        if (updateRes.data.success && updateRes.data.data.status === 'In Transit') {
            console.log(`✅ PASS: Trip status updated to 'In Transit'.`);
        } else {
            console.error('❌ FAIL: Status update failed', updateRes.data);
        }

    } catch (error) {
        console.error('❌ FAIL: Request failed', error.message);
        if (error.response) console.error('   Response:', error.response.data);
    } finally {
        server.close();
        console.log('Test Server Stopped.');
    }
}

runTests();
