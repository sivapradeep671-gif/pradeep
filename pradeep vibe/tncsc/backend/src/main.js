const express = require('express');
const http = require('http'); // New Import
const cors = require('cors');
const config = require('./config/config');
const db = require('./database/db');

// Import Module Routes
// Import Module Routes
const authRoutes = require('./modules/auth/auth.routes');
const godownRoutes = require('./modules/godown/godown.routes');
const alertRoutes = require('./modules/alerts/alerts.routes');
const reportRoutes = require('./modules/reports/reports.routes');
const integrationRoutes = require('./modules/integration/integration.routes');
const incidentRoutes = require('./modules/incidents/incidents.routes');
const tripRoutes = require('./modules/trips/trips.routes');
const inspectionRoutes = require('./modules/inspections/inspections.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const analyticsRoutes = require('./modules/analytics/analytics.routes'); // Feature 2
const qualityRoutes = require('./modules/quality/quality.routes'); // Feature 3
const { initializeSocket } = require('./services/socket.service'); // New Import

const app = express();
const server = http.createServer(app); // Wrap App

// Middleware
app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'UP', timestamp: new Date(), env: config.nodeEnv });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/godowns', godownRoutes);
app.use('/api/v1/alerts', alertRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/integrations', integrationRoutes);
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/inspections', inspectionRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/inspections', inspectionRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/analytics', analyticsRoutes); // Feature 2
app.use('/api/v1/quality', qualityRoutes); // Feature 3

// SERVE STATIC FRONTEND (Production/Merged Mode)
const path = require('path');
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// Handle SPA routing - return index.html for any unknown route NOT starting with /api
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    } else {
        res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
    }
});

// Global Error Handler
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: config.nodeEnv === 'development' ? err.stack : undefined
    });
});

// Start Server
if (require.main === module) {
    // Initialize Socket
    initializeSocket(server);

    server.listen(config.port, () => {
        console.log(`RiskGuard Server running on port ${config.port} | Env: ${config.nodeEnv}`);
    });
}

module.exports = app; // For testing
