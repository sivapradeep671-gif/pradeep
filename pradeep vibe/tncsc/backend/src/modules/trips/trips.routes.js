const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// Get all trips
router.get('/', async (req, res) => {
    const trips = await db.find('trips');
    res.json({ success: true, data: trips });
});

// Get trips for a specific driver
router.get('/driver/:id', async (req, res) => {
    const trips = await db.find('trips', t => t.driverId == req.params.id);
    res.json({ success: true, data: trips });
});
// Create a new trip (Consignment)
router.post('/', async (req, res) => {
    const { truckId, driverId, origin, destination } = req.body;

    // Basic validation
    if (!truckId || !origin || !destination) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newTrip = await db.create('trips', {
        truckId,
        driverId: driverId || null,
        origin,
        destination,
        status: 'Created',
        startTime: null,
        geofenceViolation: false,
        lastLat: null,
        lastLng: null
    });

    await db.logAction('TRIP_CREATED', `Trip ${newTrip.id} created for Truck ${truckId}`);
    res.json({ success: true, data: newTrip });
});

// Update trip details (Generic PATCH)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const existing = await db.findOne('trips', t => t.id == id);
    if (!existing) return res.status(404).json({ success: false, message: 'Trip not found' });

    // Prevent overwriting ID
    delete updates.id;

    const updated = await db.update('trips', id, updates);

    if (updates.status) {
        await db.logAction('TRIP_STATUS_UPDATE', `Trip ${id} status changed to ${updates.status}`);
    }

    res.json({ success: true, data: updated });
});

// Start a trip
router.post('/:id/start', async (req, res) => {
    const trip = await db.update('trips', req.params.id, {
        status: 'Started',
        startTime: new Date().toISOString()
    });
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    res.json({ success: true, data: trip });
});

// Mock GPS update and Geofence check
router.post('/:id/location', async (req, res) => {
    const { lat, lng } = req.body;
    const trip = await db.findOne('trips', t => t.id == req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    // Mock geofence logic: if lng > 80 (just a dummy check), violation
    const violation = lng > 80.5;
    const updated = await db.update('trips', req.params.id, {
        lastLat: lat,
        lastLng: lng,
        geofenceViolation: violation
    });

    if (violation) {
        await db.create('alerts', {
            godownId: trip.origin,
            type: 'Route Deviation',
            severity: 'High',
            message: `Truck ${trip.truckId} deviated from route!`,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        });
    }

    res.json({ success: true, data: updated, violation });
});

// Confirm delivery
router.post('/:id/confirm', async (req, res) => {
    const trip = await db.update('trips', req.params.id, {
        status: 'Delivered',
        endTime: new Date().toISOString()
    });

    // Audit log (immutable ledger simulation)
    await db.create('auditLog', {
        action: 'TRIP_COMPLETED',
        details: `Trip ${req.params.id} delivered. Truck ${trip.truckId}`,
        timestamp: new Date().toISOString(),
        hash: Buffer.from(`TRIP-${req.params.id}-${Date.now()}`).toString('base64')
    });

    res.json({ success: true, data: trip });
});

// Feature 4: QR Code Data Generation
router.get('/:id/qr', async (req, res) => {
    const trip = await db.findOne('trips', t => t.id == req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    // Generate signed payload (Mock signature)
    const payload = {
        tripId: trip.id,
        truckId: trip.truckId,
        commodity: trip.cargoType || 'Rice',
        sentWeight: trip.loadWeight || 10000, // Default 10 Tons
        origin: trip.origin,
        timestamp: new Date().toISOString()
    };

    res.json({ success: true, data: payload });
});

// Feature 4: Shop Acceptance & Discrepancy Check
router.post('/:id/scan', async (req, res) => {
    const { scannedTripId, receivedWeight, shopId } = req.body;

    if (scannedTripId != req.params.id) {
        return res.status(400).json({ success: false, message: 'Trip ID Mismatch' });
    }

    const trip = await db.findOne('trips', t => t.id == req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

    // Weight Check logic
    const sentWeight = trip.loadWeight || 10000; // Mock data fallback
    const difference = sentWeight - receivedWeight;
    const lossSystem = (difference / sentWeight) * 100;

    let status = 'Delivered';
    let alert = null;

    if (lossSystem > 1.0) { // Tolerance 1%
        alert = {
            type: 'THEFT_ALERT',
            severity: 'High',
            message: `Weight Discrepancy Detected! Sent: ${sentWeight}kg, Recv: ${receivedWeight}kg. Shortage: ${difference}kg`,
            shopId
        };
        // Log alert to DB
        await db.create('alerts', {
            godownId: trip.origin, // Notify Origin Godown
            ...alert,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        });
    }

    // Update Trip
    const updatedTrip = await db.update('trips', req.params.id, {
        status: status,
        endTime: new Date().toISOString(),
        receivedWeight,
        weightDiscrepancy: difference
    });

    res.json({
        success: true,
        data: updatedTrip,
        alert
    });
});

module.exports = router;
