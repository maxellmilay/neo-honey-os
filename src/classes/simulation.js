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

    // Initialize all jobs with status "New"
    this.jobs.forEach(job => job.setStatus("New"));
  }

  nextStep() {
    if (this.isFinished()) return;
    this.time++;

    // Add new jobs dynamically every few time units
    if (this.time % 2 === 0) {
      this.addNewJob();
    }

    if (this.currentJob && this.currentJob.finished) {
      this.currentJob = undefined;
    }

    const newJobs = this.jobs.filter(job => job.arrivalTime === this.time);
    newJobs.forEach(job => {
      if (!this.readyQueue.includes(job)) {
        this.readyQueue.push(job);
        job.setStatus("New"); // Job is "New" when it enters the readyQueue
      }
    });

    if (this.currentJob && this.currentJob.remaining === 1) {
      const nextJob = this.readyQueue[0];
      if (nextJob && nextJob.status === "New") {
        nextJob.setStatus("Ready");
      }
    }

    this.algorithm.processQueue(this.readyQueue, this.currentJob);

    this.currentJob = this.readyQueue.shift();
    if (this.currentJob) {
      this.currentJob.process(this.time);
    }
    if (!this.isFinished()) {
      this.ganttChart.push(this.currentJob ? this.currentJob.id : 0);
      this.idleTime += this.currentJob ? 0 : 1;
    }

    this.updateJobStatuses();
  }

  addNewJob() {
    const newJobId = this.jobs.length + 1;
    const newJob = Job.createRandomJob(newJobId);
    newJob.arrivalTime = this.time; // Set arrivalTime to the current time
    newJob.setStatus("New");
    this.jobs.push(newJob);
    this.readyQueue.push(newJob);
  }

  updateJobStatuses() {
    this.jobs.forEach(job => {
      if (job.remaining === 0) {
          job.setStatus("Terminated");
      } else if (this.currentJob === job) {
          job.setStatus("Running");
      } else if (job === this.readyQueue[0]) { // Check if the job is the first in the ready queue
          job.setStatus("Ready");
      } else if (job.status === "New" && this.time - job.arrivalTime >= 1) {
          job.setStatus("Waiting");
      } else if (job.status === "New") {
          // Keep the status as "New" if less than 1 unit of time has elapsed
          job.setStatus("New");
      } else {
          job.setStatus("Waiting");
      }
  });
  
    const statusOrder = {
      'Running': 1,
      'Ready': 2,
      'New': 3,
      'Waiting': 4,
      'Terminated': 5
    };

    this.jobs.sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }

  reset() {
    this.time = 0;
    this.jobs.forEach(item => item.reset());
    this.readyQueue = [];
    this.currentJob = undefined;
    this.ganttChart = [];
    this.idleTime = 0;

    // Reset all job statuses to "New"
    this.jobs.forEach(job => job.setStatus("New"));
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
