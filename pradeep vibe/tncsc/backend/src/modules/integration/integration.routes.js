const express = require('express');
const router = express.Router();

/**
 * Mock Service for External Tamil Nadu Government APIs
 * - ePDS: Electronic Public Distribution System
 * - e-DPC: Electronic Direct Purchase Centres
 * - TNCSC ERP: Enterprise Resource Planning
 * - TNeGA: Tamil Nadu e-Governance Agency
 */

// Mock ePDS: Validate FPS (Fair Price Shop) ID and check stock levels
router.get('/epds/fps/:id', (req, res) => {
    res.json({
        success: true,
        data: {
            fpsId: req.params.id,
            name: `FPS Shop ${req.params.id}`,
            district: 'Thanjavur',
            status: 'Online',
            stock: [
                { commodity: 'Rice', quantity: 15.5, unit: 'Tons' },
                { commodity: 'Sugar', quantity: 2.1, unit: 'Tons' }
            ]
        }
    });
});

// Mock e-DPC: Get current procurement rates
router.get('/edpc/rates', (req, res) => {
    res.json({
        success: true,
        data: {
            paddy_grade_a: 2350,
            paddy_common: 2200,
            unit: 'Quintal',
            effectiveFrom: new Date().toISOString()
        }
    });
});

// Mock ERP: Sync godown stock movement
router.post('/erp/sync-movement', (req, res) => {
    const { movementId, items } = req.body;
    console.log(`[ERP-SYNC] Syncing movement ${movementId} with ${items.length} items`);
    res.json({
        success: true,
        erpRef: `ERP-REF-${Math.floor(Math.random() * 100000)}`,
        status: 'Synchronized'
    });
});

// Mock TNeGA: Security & Auth validation (External)
router.post('/tnega/validate-token', (req, res) => {
    res.json({
        success: true,
        principal: 'TN-GOV-OFFICIAL',
        claims: ['RISK_MGMT_ADMIN', 'DISTRICT_VIEWER']
    });
});

module.exports = router;
