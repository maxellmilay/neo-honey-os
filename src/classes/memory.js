export class MemoryManager {
  constructor(totalMemory) {
    this.totalMemory = totalMemory;
    this.segments = [{ start: 0, end: totalMemory, jobId: null }]; // Initial segment covering the entire memory
  }

  // Allocate memory for a job
  allocateMemory(job) {
    const requiredMemory = job.memory;
    let bestFitIndex = -1;
    let smallestFreeSegment = Infinity;

    // Find the best fit segment for the job
    for (let i = 0; i < this.segments.length; i++) {
      const segment = this.segments[i];
      if (segment.jobId === null && segment.end - segment.start >= requiredMemory) {
        const segmentSize = segment.end - segment.start;
        if (segmentSize < smallestFreeSegment) {
          bestFitIndex = i;
          smallestFreeSegment = segmentSize;
        }
      }
    }

    if (bestFitIndex !== -1) {
      const bestFitSegment = this.segments[bestFitIndex];
      bestFitSegment.jobId = job.id;
      // Split the segment if it's larger than the required memory
      if (bestFitSegment.end - bestFitSegment.start > requiredMemory) {
        const newSegment = { start: bestFitSegment.start + requiredMemory, end: bestFitSegment.end, jobId: null };
        bestFitSegment.end = bestFitSegment.start + requiredMemory;
        this.segments.splice(bestFitIndex + 1, 0, newSegment);
      }
      return true;
    }

    return false; // Not enough contiguous memory available
  }

  // Deallocate memory for a job
  deallocateMemory(job) {
    for (const segment of this.segments) {
      if (segment.jobId === job.id) {
        segment.jobId = null;
        // Merge adjacent free segments
        const index = this.segments.indexOf(segment);
        if (index > 0 && this.segments[index - 1].jobId === null) {
          this.segments[index - 1].end = segment.end;
          this.segments.splice(index, 1);
        }
        if (index < this.segments.length - 1 && this.segments[index + 1].jobId === null) {
          this.segments[index].end = this.segments[index + 1].end;
          this.segments.splice(index + 1, 1);
        }
        break;
      }
    }
  }
}
