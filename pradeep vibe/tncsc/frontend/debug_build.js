const { spawn } = require('child_process');
const fs = require('fs');

const build = spawn('npm.cmd', ['run', 'build'], { cwd: process.cwd() });
const logStream = fs.createWriteStream('build_debug_node.log');

build.stdout.on('data', (data) => {
    process.stdout.write(data);
    logStream.write(data);
});

build.stderr.on('data', (data) => {
    process.stderr.write(data);
    logStream.write(data);
});

build.on('close', (code) => {
    console.log(`Build process exited with code ${code}`);
    logStream.end();
});
