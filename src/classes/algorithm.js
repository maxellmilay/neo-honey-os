import { Job } from './job';

export class Algorithm {
  constructor() {
    this.isPreemptive = false;
  }

  processQueue(readyQueue, currentJob) {
    if (currentJob && this.isPreemptive) {
      readyQueue.push(currentJob);
    }
    readyQueue = this.orderQueue(readyQueue);
    if (currentJob && !this.isPreemptive) {
      readyQueue.unshift(currentJob);
    }
  }

  orderQueue(readyQueue) {
    return readyQueue.sort((a, b) => a.compareByArrive(b));
  }
}

export class FirstComeFirstServe extends Algorithm { }

export class ShortestJobFirst extends Algorithm {
  orderQueue(readyQueue) {
    return readyQueue.sort((a, b) => a.compareByBurst(b));
  }
}

export class Priority extends Algorithm {
  orderQueue(readyQueue) {
    return readyQueue.sort((a, b) => a.compareByPriority(b));
  }
}

export class PreemptivePriority extends Priority {
  constructor() {
    super();
    this.isPreemptive = true;
  }
}

export class STRF extends Algorithm {
  constructor() {
    super();
    this.isPreemptive = true;
  }

  orderQueue(readyQueue) {
    return readyQueue.sort((a, b) => a.compareByRemaining(b));
  }
}
export class RoundRobin extends Algorithm {
  constructor(quantum) {
    super();
    this.quantumTime = quantum;
    this.processTime = 0;
  }

  processQueue(readyQueue, currentJob) {
    if (!currentJob) {
      this.processTime = 0;
      return;
    }

    // Increment the process time for the current job
    this.processTime++;

    // Check if the current job has reached the quantum time
    if (this.processTime === this.quantumTime) {
      // Set the status of the current job to "Ready" before pushing it back to the queue
      currentJob.setStatus("Ready");
      readyQueue.push(currentJob);
      this.processTime = 0; // Reset process time
    } else {
      readyQueue.unshift(currentJob); // Put the current job back to the front of the queue
    }
  }
}
