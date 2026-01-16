const app = require('../src/main');
const http = require('http');
const axios = require('axios');
const db = require('../src/database/db');

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}/api/v1/trips`;

async function runTests() {
    console.log('--- Testing Ration Shop Delivery Tracking ---');

    // Start Server
    const server = http.createServer(app);
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`Test Server running on port ${PORT}`);

    try {
        // 1. Create a Trip
        console.log('[STEP 1] Creating a Test Trip...');
        // We need to bypass the /trips POST directly or use DB
        const trip = await db.create('trips', {
            truckId: 'TN-TEST-9999',
            driverId: 101,
            origin: 'TNJ001',
            destination: 'SHOP-001',
            status: 'In Transit',
            loadWeight: 10000, // 10 Tons
            cargoType: 'Rice'
        });
        console.log(`✅ Trip Created: ${trip.id}`);

        // 2. Fetch QR Data
        console.log('[STEP 2] Fetching QR Data...');
        const qrRes = await axios.get(`${BASE_URL}/${trip.id}/qr`);
        if (qrRes.data.success && qrRes.data.data.tripId === trip.id) {
            console.log(`✅ PASS: QR Data Generated correctly.`);
        } else {
            console.error('❌ FAIL: QR Data Mismatch');
        }

        // 3. Simulate Scan with Low Weight (Fraud)
        console.log('[STEP 3] Simulating Scam (Low Weight)...');
        const fraudRes = await axios.post(`${BASE_URL}/${trip.id}/scan`, {
            scannedTripId: trip.id,
            receivedWeight: 9500, // 500kg less (5% loss -> Alert)
            shopId: 'SHOP-TEST-001'
        });

        if (fraudRes.data.alert && fraudRes.data.alert.type === 'THEFT_ALERT') {
            console.log(`✅ PASS: System correctly flagged 5% Weight Loss as FRAUD.`);
            console.log(`   Alert: ${fraudRes.data.alert.message}`);
        } else {
            console.error('❌ FAIL: Failed to detect fraud.');
        }

        // 4. Verify Trip Status
        const finalTrip = await db.findOne('trips', t => t.id === trip.id);
        console.log(`   Trip Status: ${finalTrip.status}`);

    } catch (error) {
        console.error('❌ FAIL: Request failed', error.message);
        if (error.response) console.error('   Response:', error.response.data);
    } finally {
        server.close();
        console.log('Test Server Stopped.');
    }
}

runTests();
