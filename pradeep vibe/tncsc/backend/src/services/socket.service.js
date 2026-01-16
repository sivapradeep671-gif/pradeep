const { Server } = require('socket.io');

let io;
let truckSimulationInterval;
const TRUCKS_COUNT = 150; // Requested "100+"

// Mock Data Generators
const DISTRICT_CENTERS = [
    { name: 'Thanjavur', lat: 10.7870, lng: 79.1378 },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
    { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Salem', lat: 11.6643, lng: 78.1460 },
    { name: 'Trichy', lat: 10.7905, lng: 78.7047 },
    { name: 'Tirunelveli', lat: 8.7139, lng: 77.7567 },
    { name: 'Vellore', lat: 12.9165, lng: 79.1325 }
];

const TRUCK_STATUSES = ['In Transit', 'In Transit', 'In Transit', 'Loading', 'Unloading', 'Stopped', 'Delayed'];
const ANOMALIES = [null, null, null, null, 'Long Stop', 'Route Deviation', 'Signal Loss'];

// Initialize Fleet State
let fleet = Array.from({ length: TRUCKS_COUNT }).map((_, i) => {
    const center = DISTRICT_CENTERS[Math.floor(Math.random() * DISTRICT_CENTERS.length)];
    return {
        id: `TRK-${center.name.substring(0, 3).toUpperCase()}-${1000 + i}`,
        lat: center.lat + (Math.random() - 0.5) * 0.5, // Scramble around center
        lng: center.lng + (Math.random() - 0.5) * 0.5,
        status: 'In Transit',
        speed: Math.floor(Math.random() * 60) + 20, // 20-80 km/h
        bearing: Math.floor(Math.random() * 360),
        destination: 'FPS-' + Math.floor(Math.random() * 500),
        cargo: Math.random() > 0.5 ? 'Paddy' : 'Rice',
        weight: (Math.random() * 10 + 5).toFixed(1) + ' Tons',
        driver: `Driver ${i + 1}`,
        lastUpdate: new Date().toISOString()
    };
});

const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: "*", // Allow all for dev
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client Connected: ${socket.id}`);

        // Send immediate snapshot
        socket.emit('fleet_update', fleet);

        socket.on('disconnect', () => {
            console.log(`Client Disconnected: ${socket.id}`);
        });
    });

    startSimulation();
    console.log('🚛 Fleet Simulation Service Started');
};

const startSimulation = () => {
    if (truckSimulationInterval) clearInterval(truckSimulationInterval);

    truckSimulationInterval = setInterval(() => {
        // Update 30% of trucks every tick to simulate async updates
        fleet = fleet.map(truck => {
            if (Math.random() > 0.3) return truck;

            // Simple movement logic
            const moveAmt = 0.005; // Approx 500m
            let newLat = truck.lat + (Math.cos(truck.bearing * Math.PI / 180) * moveAmt);
            let newLng = truck.lng + (Math.sin(truck.bearing * Math.PI / 180) * moveAmt);

            // Randomly change status/bearing
            if (Math.random() > 0.95) {
                truck.status = TRUCK_STATUSES[Math.floor(Math.random() * TRUCK_STATUSES.length)];
                truck.bearing = Math.floor(Math.random() * 360);
            }

            return {
                ...truck,
                lat: newLat,
                lng: newLng,
                lastUpdate: new Date().toISOString()
            };
        });

        // Broadcast updates
        io.emit('fleet_update', fleet);

    }, 2000); // 2 second refresh rate
};

module.exports = { initializeSocket };
