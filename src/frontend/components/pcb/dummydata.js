// dummyData.js

// Function to generate a random integer between min and max (inclusive)
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate random status
const getRandomStatus = () => {
    const statuses = ["New", "Ready", "Running", "Waiting", "Terminated"];
    return statuses[getRandomInt(0, statuses.length - 1)];
};

// Function to generate a single random process control block
export const generateRandomProcessControlBlock = (latestProcessId) => {
    return {
        id: latestProcessId + 1, // Increment the latest process ID by 1
        arrivalTime: getRandomInt(0, 10), // Example range: 0 to 10
        burstTime: getRandomInt(1, 20), // Example range: 1 to 20
        memorySize: getRandomInt(50, 300), // Example range: 50 to 300
        priority: getRandomInt(1, 5), // Example range: 1 to 5
        status: getRandomStatus(),
    };
};