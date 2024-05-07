// const dbmgr = require("../../shared/config/dbManager")
// const db = dbmgr.db;

// const fs = require('fs').promises;

class Job {
    constructor(name, arrivalTime, burstTime, priority) {
        this.name = name;
        this.arrivalTime = arrivalTime;
        this.burstTime = burstTime;
        this.priority = priority;
        this.remainingTime = burstTime;
        this.startTime = null;
        this.endTime = null;
        this.waitingTime = 0;
        this.computingTime = 0;
        this.turnaroundTime = 0;
    }
}

// Function to generate random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random jobs
function generateRandomJobs(numJobs) {
    const jobs = [];
    for (let i = 0; i < numJobs; i++) {
        const name = `Job${i + 1}`;
        const arrivalTime = getRandomInt(0, 20); // Example: Jobs can arrive between 0 and 20 time units
        const burstTime = getRandomInt(1, 10); // Example: Jobs can have burst time between 1 and 10 time units
        const priority = getRandomInt(1, 5); // Example: Jobs can have priority between 1 and 5
        jobs.push(new Job(name, arrivalTime, burstTime, priority));
    }
    return jobs;
}

const firstComeFirstServe = (jobs) => {
    // Sort jobs by arrival time
    jobs.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    console.log("<< First Come First Serve (FCFS) >>");
    console.log("\n\t\tProcess | Arrival | CPU Burst Time(ms) | Waiting Time(ms) | Turnaround Time(ms)");

    // Calculate waiting time and turnaround time for each job
    jobs.forEach(job => {
        job.waitingTime = currentTime - job.arrivalTime;
        if (job.waitingTime < 0) {
            job.waitingTime = 0;
        }
        job.turnaroundTime = job.waitingTime + job.burstTime;
        currentTime += job.burstTime;
        totalWaitingTime += job.waitingTime;
        totalTurnaroundTime += job.turnaroundTime;

        console.log(`\t\t  ${job.name}\t| ${job.arrivalTime.toString().padStart(7)}\t${job.burstTime.toString().padStart(8)}\t${job.waitingTime.toString().padStart(15)}\t\t${job.turnaroundTime.toString().padStart(10)}`);
    });

    // Calculate average waiting time and average turnaround time
    const avgWaitingTime = totalWaitingTime / jobs.length;
    const avgTurnaroundTime = totalTurnaroundTime / jobs.length;

    console.log(`\n\tAverage Waiting Time: ${avgWaitingTime.toFixed(2)} ms`);
    console.log(`\tAverage Turnaround Time: ${avgTurnaroundTime.toFixed(2)} ms`);
};

const shortestJobFirst = (jobs) => {
    // Sort jobs by burst time
    jobs.sort((a, b) => a.burstTime - b.burstTime);

    let currentTime = 0;
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    console.log("<< Shortest Job First (SJF) >>");
    console.log("\n\t\tProcess | Arrival | CPU Burst Time(ms) | Waiting Time(ms) | Turnaround Time(ms)");

    // Calculate waiting time and turnaround time for each job
    jobs.forEach(job => {
        job.waitingTime = currentTime - job.arrivalTime;
        if (job.waitingTime < 0) {
            job.waitingTime = 0;
        }
        job.turnaroundTime = job.waitingTime + job.burstTime;
        currentTime += job.burstTime;
        totalWaitingTime += job.waitingTime;
        totalTurnaroundTime += job.turnaroundTime;

        console.log(`\t\t  ${job.name}\t| ${job.arrivalTime.toString().padStart(7)}\t${job.burstTime.toString().padStart(8)}\t${job.waitingTime.toString().padStart(15)}\t\t${job.turnaroundTime.toString().padStart(10)}`);
    });

    // Calculate average waiting time and average turnaround time
    const avgWaitingTime = totalWaitingTime / jobs.length;
    const avgTurnaroundTime = totalTurnaroundTime / jobs.length;

    console.log(`\n\tAverage Waiting Time: ${avgWaitingTime.toFixed(2)} ms`);
    console.log(`\tAverage Turnaround Time: ${avgTurnaroundTime.toFixed(2)} ms`);
};

const priorityScheduling = () => {
    // algo
};

const roundRobin = () => {
    // algo
};

module.exports = {
    generateRandomJobs,
    firstComeFirstServe,
    shortestJobFirst,
    priorityScheduling,
    roundRobin
};
