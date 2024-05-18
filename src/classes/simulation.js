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
  }

  nextStep() {
    if (this.isFinished()) return;
    this.time++;
    if (this.currentJob && this.currentJob.finished) {
      this.currentJob = undefined;
    }

    const newJobs = this.jobs.filter(job => job.arrivalTime === this.time);
    this.readyQueue.push(...newJobs);
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

  reset() {
    this.time = 0;
    this.jobs.forEach(item => item.reset());
    this.readyQueue = [];
    this.currentJob = undefined;
    this.ganttChart = [];
    this.idleTime = 0;
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
