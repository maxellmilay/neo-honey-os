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

  // processQueue(readyQueue, currentJob) {
  //   if (!currentJob) {
  //     this.processTime = 0;
  //     return;
  //   }
  //   this.processTime++;
  //   if (this.processTime === this.quantumTime) {
  //     readyQueue.push(currentJob);
  //     this.processTime = 0;
  //   } else {
  //     readyQueue.unshift(currentJob);
  //   }
  // }

  
    processQueue(readyQueue, currentJob) {
        if (currentJob && this.currentQuantum < this.quantum && !currentJob.finished) {
            this.currentQuantum++;
            return;
        }

        this.currentQuantum = 1;
        readyQueue.push(currentJob);  // Push the current job back to the queue
        readyQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }
}
