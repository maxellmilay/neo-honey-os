import React, { useState, useEffect } from "react";
import styles from "./MemoryManagement.module.css";

const MemoryManagement = ({ simulation }) => {
  const [processes, setProcesses] = useState([]);
  const [heap, setHeap] = useState(null);

  let processID = 0;

  function Process(size, time) {
    this.size = size;
    this.timeLeft = time;
    this.allocatedBlock = null;
    this.id = processID++;
    this.isAllocated = function () {
      return this.allocatedBlock != null;
    };
    this.tick = function () {
      this.timeLeft -= 1;
    };
  }

  useEffect(() => {
    console.log('Simulation data:', simulation);

    function MemControlBlock(size) {
      this.size = size;
      this.process = null;
      this.available = true;
      this.next = null;
      this.prev = null;
      this.fromPartition = false;

      this.setProcess = function (process) {
        if (process == null) {
          this.process = null;
          this.available = true;
        } else {
          this.process = process;
          this.available = false;
        }
      };
    }

    function Heap() {
      this.head = null;
      this.size = 0;

      this.requestAllocation = function (process) {
        let blockBestFit = this.head;

        while (blockBestFit && (blockBestFit.size < process.size || !blockBestFit.available)) {
          blockBestFit = blockBestFit.next;
          if (blockBestFit == null) {
            return false;
          }
        }

        let block = blockBestFit.next;
        while (block != null) {
          if (
            block.size >= process.size &&
            block.available &&
            block.size < blockBestFit.size
          ) {
            blockBestFit = block;
          }
          block = block.next;
        }

        const spaceLeftover =
          blockBestFit.size - (process.size + memControlBlockSize);

        if (spaceLeftover > 0) {
          const newBlock = new MemControlBlock(spaceLeftover);

          const nextBlock = blockBestFit.next;
          if (nextBlock != null) {
            nextBlock.prev = newBlock;
            newBlock.next = nextBlock;
          }

          blockBestFit.next = newBlock;
          newBlock.prev = blockBestFit;

          blockBestFit.size = process.size;

          newBlock.fromPartition = true;
        }

        blockBestFit.setProcess(process);
        process.allocatedBlock = blockBestFit;
        return true;
      };

      this.deallocateProcess = function (process) {
        const block = process.allocatedBlock;
        block.setProcess(null);
        process.allocatedBlock = null;
        this.mergeFreeBlocks(block);
      };

      this.mergeFreeBlocks = function (block) {
        if (block.prev && block.prev.available) {
          block.prev.size += block.size + memControlBlockSize;
          block.prev.next = block.next;
          if (block.next) {
            block.next.prev = block.prev;
          }
          block = block.prev;
        }

        if (block.next && block.next.available) {
          block.size += block.next.size + memControlBlockSize;
          block.next = block.next.next;
          if (block.next) {
            block.next.prev = block;
          }
        }
      };

      this.add = function (block) {
        if (this.head == null) {
          this.head = block;
        } else {
          block.next = this.head;
          this.head.prev = block;
          this.head = block;
        }

        this.size += block.size;
      };

      this.toString = function () {
        let string = "[|";
        let block = this.head;

        let prefix = "";
        const suffix = "</span> |";
        while (block != null) {
          if (block.available) {
            prefix = "<span style='color: #01DF01;'> ";
          } else {
            prefix = "<span style='color: #FF0000;'> ";
          }
          string += prefix + block.size + suffix;
          block = block.next;
        }

        string += "]";
        return string;
      };

      this.repaint = function () {
        let block = this.head;
        const memoryDiv = document.getElementById("memory");

        memoryDiv.innerHTML = "";

        while (block != null) {
          let height = (block.size / heap.size) * 48;
          if (block.fromPartition) {
            height += (memControlBlockSize / heap.size) * 48;
          }

          const divBlock = document.createElement("div");
          divBlock.style.height = height + "%";
          divBlock.setAttribute("id", "block");
          if (block.available) {
            divBlock.className = "available";
          } else {
            divBlock.className = "unavailable";
          }
          memoryDiv.appendChild(divBlock);

          const blockLabel = document.createElement("div");
          blockLabel.setAttribute("id", "blockLabel");
          blockLabel.style.height = height + "%";
          blockLabel.innerHTML = block.size + "K";
          if (height <= 2) {
            blockLabel.style.display = "none";
          }
          divBlock.appendChild(blockLabel);

          block = block.next;
        }
      };
    }

    const heap = new Heap();
    setHeap(heap);
    const memControlBlockSize = 16;
    const blockSizes = [50];
    for (let i = 0; i < blockSizes.length; i++) {
      heap.add(new MemControlBlock(blockSizes[i]));
    }

    const initialProcesses = simulation?.jobs?.map(
      (p) => new Process(p.memory, p.remaining)
    ) || [];
    console.log('Initial processes:', initialProcesses);
    setProcesses(initialProcesses);

    heap.repaint();

    const newClock = setInterval(() => {
      setProcesses((prevProcesses) => {
        const updatedProcesses = [...prevProcesses];
        for (let i = 0; i < updatedProcesses.length; i++) {
          const process = updatedProcesses[i];
          if (!process.isAllocated()) {
            heap.requestAllocation(process);
          } else {
            process.tick();
            if (process.timeLeft < 1) {
              heap.deallocateProcess(process);
              updatedProcesses.splice(i, 1);
              i--;
            }
          }
        }
        heap.repaint();
        return updatedProcesses;
      });
    }, 1000);

    return () => clearInterval(newClock);
  }, [simulation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses((prevProcesses) => {
        const updatedProcesses = [...prevProcesses];
        const newProcesses = simulation?.jobs
          ?.filter((p) => !updatedProcesses.some((proc) => proc.id === p.id))
          .map((p) => new Process(p.memory, p.remaining)) || [];
        
        updatedProcesses.push(...newProcesses);
        return updatedProcesses;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [simulation]);

  return (
    <div className={styles.container}>
      <div className={styles.rightContainer}>
        <div id="memoryContainer">
          <div id="memory"></div>
        </div>
      </div>
      <div className={styles.leftContainer}>
        <h2>Add Process</h2>
        <form
          className={styles.processForm}
          onSubmit={(e) => {
            e.preventDefault();
            const size = parseInt(e.target.elements.processSize.value);
            const time = parseInt(e.target.elements.processTime.value);
            const process = new Process(size, time);
            if (heap.requestAllocation(process)) {
              setProcesses((prevProcesses) => [...prevProcesses, process]);
              e.target.reset();
            }
          }}
        >
          <input
            type="text"
            name="processSize"
            placeholder="Process size"
            autoComplete="off"
          />
          <input
            type="text"
            name="processTime"
            placeholder="Process time"
            autoComplete="off"
          />
          <button type="submit">Add Process</button>
        </form>
      </div>
      <div id="logBoxContainer">
        <div id="logBox">DEBUG LOG<br /></div>
      </div>
    </div>
  );
};

export default MemoryManagement;
