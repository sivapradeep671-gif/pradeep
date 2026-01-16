const { io } = require("socket.io-client");

console.log("--- Testing WebSocket Connection ---");

const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log("✅ Connected to WebSocket Server! ID:", socket.id);
});

socket.on("fleet_update", (data) => {
    console.log(`✅ Received 'fleet_update' event.`);
    console.log(`   Truck Count: ${data.length}`);
    if (data.length > 0) {
        console.log(`   Sample Truck: ${data[0].id} at [${data[0].lat.toFixed(4)}, ${data[0].lng.toFixed(4)}]`);
        console.log(`   Status: ${data[0].status}`);
    }

    console.log("Test Passed. Exiting...");
    socket.disconnect();
    process.exit(0);
});

socket.on("connect_error", (err) => {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
});

// Timeout if no event received
setTimeout(() => {
    console.error("❌ Timeout: No 'fleet_update' received within 5 seconds.");
    process.exit(1);
}, 5000);
