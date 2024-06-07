export class Job {
  constructor(jobId, arriveTime, burst, priority, memory) {
    this.id = jobId; // Job ID
    this.arrivalTime = arriveTime; // Arrival time of the job
    this.burst = burst; // Burst time of the job
    this.priority = priority; // Priority of the job
    this.memory = memory; // Memory required by the job
    this.startTime = 0; // Start time of the job
    this.finishTime = 0; // Finish time of the job
    this.remaining = this.burst; // Remaining burst time of the job
    this.processed = false; // Flag to indicate if the job has been processed
    this.waitingTime = 0; // Waiting time of the job
    this.status = "New"; // Status of the job
    this.heap = null; // Heap associated with the job
  }

  // Set the status of the job
  setStatus(status) {
    const validStatuses = ["New", "Ready", "Running", "Waiting", "Suspended", "Terminated", "Waiting For Memory"];
    if (validStatuses.includes(status)) {
        this.status = status;
    } 
  }

  // Update the waiting time of the job
  updateWaitingTime() {
    if (this.status === "Ready") {
      this.waitingTime++;
    }
  }

  // Create a random job
  static createRandomJob(jobId) {
    
    const ranges = [
        { min: 50, max: 120, probability: 0.75 },
        { min: 121, max: 150, probability: 0.15 },
        { min: 151, max: 256, probability: 0.10 }
    ];

    const weightedRandom = () => {
        const random = Math.random();
        let sum = 0;

        for (const range of ranges) {
            sum += range.probability;
            if (random <= sum) {
                return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
            }
        }
    };

    const random = (max, min = 1) => Math.floor(Math.random() * max) + min;
    const arriveTime = jobId === 1 ? 1 : random(20, 2);
    const burst = jobId === 1 ? random(15,5) : random(15, 1);
    const priority = random(15);
    const memory = weightedRandom();
    return new Job(jobId, arriveTime, burst, priority, memory);
  }

  // Check if the job has started
  get started() {
    return this.burst !== this.remaining;
  }

  // Check if the job has finished
  get finished() {
    return this.remaining === 0;
  }

  // Calculate the percentage of completion of the job
  get percent() {
    return Math.floor(((this.burst - this.remaining) * 100) / this.burst);
  }

  // Reset the job to its initial state
  reset() {
    this.startTime = 0;
    this.finishTime = 0;
    this.remaining = this.burst;
    this.processed = false; // Reset processed flag
    this.status = "New";
  }

  // Process the job
  process(simulationTime) {
    if (this.finished || this.processed) {
      console.log("Job already finished or processed", this.id, this.finished, this.processed);
      return;
    }
    if (!this.started) {
      this.startTime = simulationTime;
    }
    this.remaining--;
    if (this.finished) {
      this.finishTime = simulationTime + 1;
    }
  }

  // Calculate the turnaround time of the job
  getTurnaroundTime(simulationTime) {
    if (!this.started) {
      return 0;
    }
    if (this.finished) {
      return this.finishTime - this.arrivalTime;
    }
    return simulationTime + 1 - this.arrivalTime;
  }

  // Calculate the waiting time of the job
  getWaitingTime(simulationTime) {
    return this.getTurnaroundTime(simulationTime) - (this.burst - this.remaining);
  }

  // Clone the job
  clone() {
    const job = new Job(this.id, this.arrivalTime, this.burst, this.priority, this.memory);
    job.startTime = this.startTime;
    job.finishTime = this.finishTime;
    job.remaining = this.remaining;
    job.processed = this.processed;
    job.status = this.status;
    return job;
  }

  // Compare jobs by ID
  compareById(other) {
    return this.id - other.id;
  }

  // Compare jobs by arrival time
  compareByArrive(other) {
    const tmp = this.arrivalTime - other.arrivalTime;
    return tmp === 0 ? this.compareById(other) : tmp;
  }

  // Compare jobs by burst time
  compareByBurst(other) {
    const tmp = this.burst - other.burst;
    return tmp === 0 ? this.compareByArrive(other) : tmp;
  }

  // Compare jobs by priority
  compareByPriority(other) {
    const tmp = this.priority - other.priority;
    return tmp === 0 ? this.compareByArrive(other) : tmp;
  }

  // Compare jobs by memory
  compareByMemory(other) {
    const tmp = this.priority - other.priority;
    return tmp === 0 ? this.compareById(other) : tmp;
  }

  // Compare jobs by remaining burst time
  compareByRemaining(other) {
    const tmp = this.remaining - other.remaining;
    return tmp === 0 ? this.compareByArrive(other) : tmp;
  }
}
