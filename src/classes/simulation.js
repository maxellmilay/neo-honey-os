import { Job } from './job';
import { MemoryManager } from './memory';

// Simulation class
export class Simulation {
  constructor(algorithm, jobs, totalMemory) {
    this.time = 0; // Current time
    this.algorithm = algorithm; // Scheduling algorithm
    this.jobs = jobs; // Array of jobs
    this.readyQueue = []; // Queue of ready jobs
    this.currentJob = undefined; // Currently running job
    this.ganttChart = []; // Gantt chart for visualization
    this.idleTime = 0; // Total idle time
    this.totalMemory = totalMemory; // Total memory available
    this.memoryManager = new MemoryManager(totalMemory); // Memory manager
    this.stopAddingJobsFlag = false; // Flag to stop adding new jobs

    // Initialize all jobs with status "New"
    this.jobs.forEach(job => job.setStatus("New"));
  }

  // Perform the next step in the simulation
  nextStep() {
    if (this.isFinished()) return; // If all jobs are finished, return

    this.time++; // Increment the current time

    // Add new jobs dynamically every few time units
    if (!this.stopAddingJobsFlag && this.time % 3 === 0) {
      this.addNewJob();
    }

    if (this.currentJob && this.currentJob.finished) {
      // Deallocate memory when a job is terminated
      this.memoryManager.deallocateMemory(this.currentJob);
      this.currentJob = undefined;
    }

    // Check if any new jobs have arrived
    const newJobs = this.jobs.filter(job => job.arrivalTime === this.time);
    newJobs.forEach(job => {
      if (!this.readyQueue.includes(job)) {
        if (this.memoryManager.allocateMemory(job)) {
          this.readyQueue.push(job);
          job.setStatus("Ready"); // Job is "Ready" when it enters the readyQueue
        } else {
          job.setStatus("Waiting For Memory");
        }
      }
    });

    // Update waiting time for all jobs in the ready queue
    this.readyQueue.forEach(job => job.updateWaitingTime());

    // Check if the current job is about to finish
    if (this.currentJob && this.currentJob.remaining === 1) {
      const nextJob = this.readyQueue[0];
      if (nextJob && nextJob.status === "New") {
        nextJob.setStatus("Ready");
      }
    }

    // Process the ready queue using the scheduling algorithm
    this.algorithm.processQueue(this.readyQueue, this.currentJob);

    // Get the next job from the ready queue and set it as the current job
    this.currentJob = this.readyQueue.shift();
    if (this.currentJob) {
      this.currentJob.process(this.time);
    }

    // Update the gantt chart and idle time
    if (!this.isFinished()) {
      this.ganttChart.push(this.currentJob ? this.currentJob.id : 0);
      this.idleTime += this.currentJob ? 0 : 1;
    }

    // Update the statuses of all jobs
    this.updateJobStatuses();
  }

  // Add a new job to the simulation
  addNewJob() {
    const newJobId = this.jobs.length + 1;
    const newJob = Job.createRandomJob(newJobId);
    newJob.arrivalTime = this.time; // Set arrivalTime to the current time
    this.jobs.push(newJob);
  }

  // Update the statuses of all jobs
  updateJobStatuses() {
    this.jobs.forEach(job => {
      if (job.remaining === 0) {
        job.setStatus("Terminated");
      } else if (this.currentJob === job) {
        job.setStatus("Running");
      } else if (job === this.readyQueue[0]) { // Check if the job is the first in the ready queue
        job.setStatus("Ready");
      } else if (job.status === "Waiting For Memory" && this.memoryManager.allocateMemory(job)) {
        job.setStatus("Ready");
        this.readyQueue.push(job);
      } else {
        job.setStatus("Waiting for Memory");
      }
    });
    
    // Define the order of job statuses for sorting
    const statusOrder = {
      'Running': 1,
      'Ready': 2,
      'New': 3,
      'Waiting': 4,
      'Waiting For Memory': 5,
      'Terminated': 6
    };

    // Sort the jobs based on their statuses
    this.jobs.sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  }

  // Reset the simulation
  reset() {
    this.time = 0; // Reset the current time
    this.jobs.forEach(item => item.reset()); // Reset all jobs
    this.readyQueue = []; // Clear the ready queue
    this.currentJob = undefined; // Clear the current job
    this.ganttChart = []; // Clear the gantt chart
    this.idleTime = 0; // Reset the idle time
    this.stopAddingJobsFlag = false; // Reset the flag

    // Reset all job statuses to "New"
    this.jobs.forEach(job => job.setStatus("New"));
  }

  // Check if all jobs are finished
  isFinished() {
    return this.jobs.every(job => job.finished);
  }

  // Stop adding new jobs
  stopAddingJobs() {
    this.stopAddingJobsFlag = true;
  }

  // Finish the simulation by executing all remaining steps
  finish() {
    this.stopAddingJobs();
    while (!this.isFinished()) {
      this.nextStep();
    }
  }

  // Get the text representation of the current job
  get jobText() {
    return this.currentJob ? this.currentJob.id : "Idle";
  }

  // Get the CPU utilization percentage
  get utilization() {
    if (this.time === 0) return 100;
    return Math.floor(((this.time - this.idleTime) * 100) / this.time);
  }

  // Get the average waiting time for all jobs
  get averageWait() {
    let total = 0;
    this.jobs.forEach(job => {
      total += job.getWaitingTime(this.time);
    });
    return Math.floor(total / this.jobs.length);
  }

  // Get the average turnaround time for all jobs
  get averageTurnaround() {
    let total = 0;
    this.jobs.forEach(job => {
      total += job.getTurnaroundTime(this.time);
    });
    return Math.floor(total / this.jobs.length);
  }
}
