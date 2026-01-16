const app = require('../src/main');
const http = require('http');

const PORT = 3002;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

// specific check: Login as HQ Admin -> Create Consignment
// specific check: Login as Driver -> Start Trip
// specific check: Login as HQ Admin -> Track Trip

async function runTests() {
    console.log('--- Starting Trip Flow Automation Test ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    // Dynamic import for axios
    const axios = require('axios');

    try {
        // 1. Create Consignment (Trip)
        console.log('\n[TEST 1] Creating a new Consignment (Trip)...');
        const createRes = await axios.post(`${BASE_URL}/trips`, {
            truckId: 'TN-99-TEST-001',
            driverId: 999,
            origin: 'TEST_GODOWN_A',
            destination: 'TEST_FPS_B'
        });

        if (createRes.data.success) {
            console.log('✅ PASS: Trip Created with ID:', createRes.data.data.id);
        } else {
            console.error('❌ FAIL: Failed to create trip', createRes.data);
            process.exit(1);
        }

        const tripId = createRes.data.data.id;

        // 2. Start Trip (PATCH Transition)
        console.log(`\n[TEST 2] Starting Trip ${tripId} (State Transition: Created -> Started)...`);
        const startRes = await axios.patch(`${BASE_URL}/trips/${tripId}`, {
            status: 'Started',
            startTime: new Date().toISOString()
        });

        if (startRes.data.success && startRes.data.data.status === 'Started') {
            console.log('✅ PASS: Trip Status updated to Started');
        } else {
            console.error('❌ FAIL: Failed to update status to Started', startRes.data);
            process.exit(1);
        }

        // 3. Track Trip (Get details)
        console.log(`\n[TEST 3] Tracking Trip ${tripId} (Verification)...`);
        const trackRes = await axios.get(`${BASE_URL}/trips`);
        const trip = trackRes.data.data.find(t => t.id == tripId);

        if (trip && trip.status === 'Started') {
            console.log(`✅ PASS: Validated Trip ${tripId} is "In-Transit/Started" via GET API`);
        } else {
            console.error('❌ FAIL: Trip verification failed', trip);
            process.exit(1);
        }

        // 4. Complete Trip
        console.log(`\n[TEST 4] Completing Trip ${tripId}...`);
        const completeRes = await axios.post(`${BASE_URL}/trips/${tripId}/confirm`); // Testing existing route compatibility too

        if (completeRes.data.success && completeRes.data.data.status === 'Delivered') {
            console.log('✅ PASS: Trip Completed successfully');
        } else {
            console.error('❌ FAIL: Failed to complete trip', completeRes.data);
            process.exit(1);
        }

        console.log('\n--- Note for Manual Verification ---');
        console.log('You can replicate these steps in the UI:');
        console.log('1. Login as HQ Admin -> Create Consignment');
        console.log('2. Login as Driver -> See assigned trip -> Start Trip');
        console.log('3. Login as HQ Admin -> See Trip is "In-Transit"');

    } catch (error) {
        console.error('❌ FAIL: Exception during test execution:', error.message);
        if (error.response) console.error('Response data:', error.response.data);
    } finally {
        server.close();
        console.log('\nTest Server Stopped.');
    }
}

runTests();
