const express = require('express');
const router = express.Router();
const db = require('../../database/db');

// Get all incidents
router.get('/', async (req, res) => {
    const incidents = await db.find('incidents');
    const now = new Date();
    const processed = incidents.map(i => {
        let slaStatus = 'On Track';
        if (i.status === 'Closed') slaStatus = 'Done';
        else if (new Date(i.slaDeadline) < now) slaStatus = 'EXPIRED';
        else {
            const diffHr = (new Date(i.slaDeadline) - now) / (1000 * 60 * 60);
            slaStatus = `${Math.round(diffHr)} hrs left`;
        }
        return { ...i, slaStatus };
    });
    res.json({ success: true, data: processed });
});

// Get incidents by godown
router.get('/godown/:id', async (req, res) => {
    const incidents = await db.find('incidents', i => i.godownId === req.params.id);
    res.json({ success: true, data: incidents });
});

// Create new incident
router.post('/', async (req, res) => {
    const incident = await db.create('incidents', {
        ...req.body,
        status: 'Open',
        createdAt: new Date().toISOString(),
        history: [{ msg: 'Incident created', time: new Date().toISOString() }]
    });
    await db.logAction('INCIDENT_CREATED', `Incident #${incident.id} raised for ${incident.godownId}`);
    res.json({ success: true, data: incident });
});

// Update incident (assign, change status, add comment)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const existing = await db.findOne('incidents', i => i.id == id);
    if (!existing) return res.status(404).json({ success: false, message: 'Incident not found' });

    if (updateData.comment) {
        existing.history.push({ msg: updateData.comment, time: new Date().toISOString() });
        delete updateData.comment;
    }

    const updated = await db.update('incidents', id, { ...updateData, history: existing.history });
    await db.logAction('INCIDENT_UPDATED', `Incident #${id} modified: ${updated.status}`);
    res.json({ success: true, data: updated });
});

module.exports = router;
