const { exec } = require('child_process');

const scripts = [
    'backend/scripts/test_impact_analytics.js',
    'backend/scripts/test_quality.js',
    'backend/scripts/test_inventory_alerts.js',
    'backend/scripts/test_fleet_logistics.js',
    'backend/scripts/test_remaining_modules.js'
];

console.log('🚀 STARTING FINAL SYSTEM VERIFICATION (6 PHASES)\n');

const runScript = (script) => {
    return new Promise((resolve, reject) => {
        console.log(`Resource: ${script} ...`);
        exec(`node ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ FAILED: ${script}`);
                console.error(stderr || stdout);
                resolve(false);
            } else {
                // Check stdout for "PASS" keywords used in individual scripts
                if (stdout.includes('FAIL')) {
                    console.error(`❌ FAILED: ${script} (Logic Error)`);
                    console.log(stdout); // Show output to see what failed
                    resolve(false);
                } else {
                    console.log(`✅ PASSED: ${script}`);
                    resolve(true);
                }
            }
        });
    });
};

const verifyAll = async () => {
    let passed = 0;
    for (const script of scripts) {
        const result = await runScript(script);
        if (result) passed++;
    }

    console.log('\n----------------------------------------');
    console.log(`SUMMARY: ${passed}/${scripts.length} Test Suites Passed`);
    console.log('----------------------------------------');

    if (passed === scripts.length) {
        console.log('\n🎉 ALL 6 PHASES ARE VERIFIED AND OPERATIONAL.');
        console.log('1. Impact Analytics:    [OK]');
        console.log('2. Quality Control:     [OK]');
        console.log('3. Inventory & Aging:   [OK]');
        console.log('4. Alerts & Tasks:      [OK]');
        console.log('5. Logistics & Fleet:   [OK]');
        console.log('6. Reports & P-Board:   [OK]');
    } else {
        console.error('\n⚠️ SOME PHASES FAILED VERIFICATION. CHECK LOGS ABOVE.');
        process.exit(1);
    }
};

verifyAll();
