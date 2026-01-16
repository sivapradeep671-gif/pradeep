const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// --- User Management ---

// Get all users
router.get('/users', async (req, res) => {
    const users = await db.find('users');
    res.json({ success: true, data: users });
});

// Create new user
router.post('/users', async (req, res) => {
    const newUser = await db.create('users', {
        ...req.body,
        lastActive: 'Never'
    });
    await db.logAction('USER_CREATED', `New user ${newUser.name} added as ${newUser.role}`);
    res.json({ success: true, data: newUser, message: 'User added successfully' });
});

// Revoke user
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const users = await db.find('users');
    const index = users.findIndex(u => u.id == id);
    if (index !== -1) {
        const user = users[index];
        db.users.splice(index, 1);
        await db.logAction('USER_REVOKED', `Access revoked for ${user.name}`);
        res.json({ success: true, message: 'Access revoked' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// --- System Configuration ---

// Get rules
router.get('/rules', async (req, res) => {
    const rules = await db.findOne('config', (c) => c.type === 'system_rules');
    res.json({ success: true, data: rules || { humidityThreshold: 80, moistureThreshold: 14, stockAgeAlert: 90 } });
});

// Update rules
router.post('/rules', async (req, res) => {
    const existing = await db.findOne('config', (c) => c.type === 'system_rules');
    if (existing) {
        await db.update('config', existing.id, { ...req.body });
    } else {
        await db.create('config', { type: 'system_rules', ...req.body });
    }
    await db.logAction('CONFIG_UPDATED', `System thresholds updated: ${JSON.stringify(req.body)}`);
    res.json({ success: true, message: 'Configuration updated successfully' });
});

// Feature 5: Officer Performance Leaderboard
router.get('/officer-performance', async (req, res) => {
    // 1. Get all relevant officers
    const officers = await db.find('users', u => u.role === 'FieldOfficer' || u.role === 'RegionalManager');

    // 2. Calculate scores
    const leaderboard = officers.map(officer => {
        // Simulation Logic
        const totalIncidents = 20 + Math.floor(Math.random() * 30); // 20-50
        const resolved = Math.floor(totalIncidents * (0.6 + (Math.random() * 0.4))); // 60-100% resolution
        const pending = totalIncidents - resolved;
        const slaCompliance = 80 + Math.floor(Math.random() * 20); // 80-100%
        const avgResponseTime = 2 + (Math.random() * 5); // 2-7 hours

        // Formula: Score = (Resolved * 5) + (SLA * 2) - (AvgTime * 5)
        let score = (resolved * 5) + (slaCompliance * 2) - (avgResponseTime * 5);
        score = Math.round(score);

        return {
            id: officer.id,
            name: officer.name,
            district: officer.district,
            role: officer.role,
            metrics: {
                totalIncidents,
                resolved,
                pending,
                slaCompliance,
                avgResponseTime: avgResponseTime.toFixed(1)
            },
            score
        };
    });

    // 3. Sort by Score DESC
    leaderboard.sort((a, b) => b.score - a.score);

    res.json({ success: true, data: leaderboard });
});

module.exports = router;
