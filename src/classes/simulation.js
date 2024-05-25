// import { Algorithm } from './algorithm';
// import { Job } from './job';

// export class Simulation {
//   constructor(algorithm, jobs) {
//     this.time = 0;
//     this.algorithm = algorithm;
//     this.jobs = jobs;
//     this.readyQueue = [];
//     this.currentJob = undefined;
//     this.ganttChart = [];
//     this.idleTime = 0;
//   }

//   nextStep() {
//     if (this.isFinished()) return;
//     this.time++;

//     // Add new jobs dynamically every few time units
//     if (this.time % 5 === 0) {
//       this.addNewJob();
//     }

//     if (this.currentJob && this.currentJob.finished) {
//       this.currentJob = undefined;
//     }

//     const newJobs = this.jobs.filter(job => job.arrivalTime === this.time);
//     this.readyQueue.push(...newJobs);
//     this.algorithm.processQueue(this.readyQueue, this.currentJob);

//     this.currentJob = this.readyQueue.shift();
//     if (this.currentJob) {
//       this.currentJob.process(this.time);
//     }
//     if (!this.isFinished()) {
//       this.ganttChart.push(this.currentJob ? this.currentJob.id : 0);
//       this.idleTime += this.currentJob ? 0 : 1;
//     }
//   }


//   addNewJob() {
//     const newJobId = this.jobs.length + 1;
//     const newJob = Job.createRandomJob(newJobId);
//     this.jobs.push(newJob);
//     this.readyQueue.push(newJob); 
//   }

//   reset() {
//     this.time = 0;
//     this.jobs.forEach(item => item.reset());
//     this.readyQueue = [];
//     this.currentJob = undefined;
//     this.ganttChart = [];
//     this.idleTime = 0;
//   }

//   isFinished() {
//     return this.jobs.every(job => job.finished);
//   }

//   get jobText() {
//     return this.currentJob ? this.currentJob.id : "Idle";
//   }

//   get utilization() {
//     if (this.time === 0) return 100;
//     return Math.floor(((this.time - this.idleTime) * 100) / this.time);
//   }

//   get averageWait() {
//     let total = 0;
//     this.jobs.forEach(job => {
//       total += job.getWaitingTime(this.time);
//     });
//     return Math.floor(total / this.jobs.length);
//   }

//   get averageTurnaround() {
//     let total = 0;
//     this.jobs.forEach(job => {
//       total += job.getTurnaroundTime(this.time);
//     });
//     return Math.floor(total / this.jobs.length);
//   }
// }

import { Algorithm } from './algorithm';
import { Job } from './job';

export class Simulation {
  constructor(algorithm, jobs) {
    this.time = 0;
    this.algorithm = algorithm;
    this.jobs = jobs;
    this.readyQueue = [];
    this.currentJob = undefined;
    this.ganttChart = [];
    this.idleTime = 0;
    this.lastArrivalTime = 0; // Track the last arrival time
  }

  nextStep() {
    if (this.isFinished()) return;
    this.time++;

    // Add new jobs dynamically every few time units
    if (this.time % 5 === 0) {
      this.addNewJob();
    }

    if (this.currentJob && this.currentJob.finished) {
      this.currentJob = undefined;
    }

    const newJobs = this.jobs.filter(job => job.arrivalTime === this.time);
    newJobs.forEach(job => {
      if (!this.readyQueue.includes(job)) {
        this.readyQueue.push(job);
      }
    });

    this.algorithm.processQueue(this.readyQueue, this.currentJob);

    this.currentJob = this.readyQueue.shift();
    if (this.currentJob) {
      this.currentJob.process(this.time);
    }
    if (!this.isFinished()) {
      this.ganttChart.push(this.currentJob ? this.currentJob.id : 0);
      this.idleTime += this.currentJob ? 0 : 1;
    }
  }

  addNewJob() {
    const newJobId = this.jobs.length + 1;

    // Generate a new arrival time that is random but greater than the last arrival time
    const arrivalIncrement = Math.floor(Math.random() * 5) + 1; // Random increment between 1 and 5
    this.lastArrivalTime += arrivalIncrement;

    const newJob = Job.createRandomJob(newJobId);
    newJob.arrivalTime = this.lastArrivalTime; // Set arrivalTime to the new calculated time
    this.jobs.push(newJob);
    this.readyQueue.push(newJob);
  }

  reset() {
    this.time = 0;
    this.jobs.forEach(item => item.reset());
    this.readyQueue = [];
    this.currentJob = undefined;
    this.ganttChart = [];
    this.idleTime = 0;
    this.lastArrivalTime = 0; // Reset the last arrival time
  }

  isFinished() {
    return this.jobs.every(job => job.finished);
  }

  get jobText() {
    return this.currentJob ? this.currentJob.id : "Idle";
  }

  get utilization() {
    if (this.time === 0) return 100;
    return Math.floor(((this.time - this.idleTime) * 100) / this.time);
  }

  get averageWait() {
    let total = 0;
    this.jobs.forEach(job => {
      total += job.getWaitingTime(this.time);
    });
    return Math.floor(total / this.jobs.length);
  }

  get averageTurnaround() {
    let total = 0;
    this.jobs.forEach(job => {
      total += job.getTurnaroundTime(this.time);
    });
    return Math.floor(total / this.jobs.length);
  }
}
