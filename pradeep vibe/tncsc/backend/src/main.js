const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const db = require('./database/db');

// Import Module Routes
// Import Module Routes
const authRoutes = require('./modules/auth/auth.routes');
const godownRoutes = require('./modules/godown/godown.routes');
// const riskRoutes = require('./modules/risk-engine/risk.routes');
const alertRoutes = require('./modules/alerts/alerts.routes');
const reportRoutes = require('./modules/reports/reports.routes');

const app = express();

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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: config.nodeEnv === 'development' ? err.message : undefined
    });
});

// Start Server
if (require.main === module) {
    app.listen(config.port, () => {
        console.log(`RiskGuard Server running on port ${config.port} | Env: ${config.nodeEnv}`);
    });
}

module.exports = app; // For testing
