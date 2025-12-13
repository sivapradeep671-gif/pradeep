require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || 'tncsc-super-secret-key-change-in-prod',
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'admin',
        pass: process.env.DB_PASS || 'password',
        name: process.env.DB_NAME || 'tncsc_riskguard'
    },
    risk: {
        agingThresholdDays: 90,
        utilizationThreshold: 90
    }
};
