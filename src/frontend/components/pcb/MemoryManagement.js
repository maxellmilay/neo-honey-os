import React, { useState, useEffect } from 'react';
import styles from './MemoryManagement.module.css';

function MemoryManagement() {
    const [processes, setProcesses] = useState([]);

    useEffect(() => {
        // Process Class
        let processID = 0;
        function Process(size, time) {
            this.size = size;
            this.timeLeft = time;
            this.allocatedBlock = null;
            this.id = processID++;

            this.isAllocated = function() {
                return this.allocatedBlock != null;
            };

            this.tick = function() {
                this.timeLeft -= 1;
            };
        }

        // MemControlBlock Class
        function MemControlBlock(size) {
            this.size = size;
            this.process = null;
            this.available = true;
            this.next = null;
            this.prev = null;
            this.fromPartition = false;

            this.setProcess = function(process) {
                if (process == null) {
                    this.process = null;
                    this.available = true;
                } else {
                    this.process = process;
                    this.available = false;
                }
            };
        }

        // Heap Class
        function Heap() {
            this.head = null;
            this.size = 0;

            this.requestAllocation = function(process) {
                let blockBestFit = this.head;

                // Make sure our initial best block is valid
                while ((blockBestFit.size < process.size) || (!blockBestFit.available)) {
                    blockBestFit = blockBestFit.next;
                    if (blockBestFit == null) {return false}; // Means we couldn't even find an initial valid block
                };
        
                // See if there's an even better block
                let block = blockBestFit.next;
                while (block != null) {
                    if ((block.size >= process.size) && (block.available) && (block.size < blockBestFit.size)) {
                        blockBestFit = block;
                    };
                    block = block.next;
                };
        
                const spaceLeftover = blockBestFit.size - (process.size + memControlBlockSize); // Space leftover if block was divided
        
                // Partition block if needed
                if (spaceLeftover > 0) {
                    const newBlock = new MemControlBlock(spaceLeftover);
        
                    const nextBlock = blockBestFit.next;
                    if (nextBlock != null) {
                        nextBlock.prev = newBlock;
                        newBlock.next = nextBlock;
                    };
        
                    blockBestFit.next = newBlock;
                    newBlock.prev = blockBestFit;
        
                    blockBestFit.size = process.size;
        
                    newBlock.fromPartition = true;
                };
        
                blockBestFit.setProcess(process);
                process.allocatedBlock = blockBestFit;
                return true;
            };
        

            this.deallocateProcess = function(process) {
                process.allocatedBlock.setProcess(null);
                process.allocatedBlock = null;
            };
        

            this.add = function(block) {
                if (this.head == null) {
                    this.head = block;
                } else {
                    block.next = this.head;
                    this.head.prev = block;
                    this.head = block;
                };
        
                this.size += block.size;
            }

            this.toString = function() {
                let string = "[|";
                let block = this.head;
        
                let prefix = "";
                const suffix = "</span> |";
                while (block != null) {
                    if (block.available) {prefix = "<span style='color: #01DF01;'> "} else {prefix = "<span style='color: #FF0000;'> "};
                    string += (prefix + block.size + suffix);
                    block = block.next;
                };
        
                string += "]"
                return string;
            };

            this.repaint = function() {
                let block = this.head;
                const memoryDiv = document.getElementById("memory");

                while (memoryDiv.firstChild) {
                    memoryDiv.removeChild(memoryDiv.firstChild);
                }

                while (block != null) {
                    let height = ((block.size/heap.size)*100);
                    if (block.fromPartition) {
                        height += (memControlBlockSize/heap.size)*100;
                    };
        
                    // Create div block element
                    const divBlock = document.createElement("div");
                    divBlock.style.height = (height + "%");
                    divBlock.setAttribute("id", "block");
                    if (block.available) {divBlock.className = "available"} else {divBlock.className = "unavailable"};
                    memoryDiv.appendChild(divBlock);
        
                    // Add size label
                    // TODO: Show process details on mouse over
                    const blockLabel = document.createElement("div");
                    blockLabel.setAttribute("id", "blockLabel");
                    blockLabel.style.height = (height + "%");
                    blockLabel.innerHTML = block.size + "K";
                    if (height <= 2) {
                        blockLabel.style.display = "none";
                    };
                    divBlock.appendChild(blockLabel);
        
                    block = block.next;
                };
            };
        }

        // Event handler for process submission
        function handleProcessSubmission(event) {
            event.preventDefault();
            const form = event.target;
            const processSizeInput = form.elements.processSize;
            const processTimeInput = form.elements.processTime;

            const size = parseInt(processSizeInput.value);
            const time = parseInt(processTimeInput.value);

            const newProcess = new Process(size, time);
            setProcesses([...processes, newProcess]);
            addProcessToTable(newProcess);

            // Debug log
            log("Requesting: " + newProcess.size);
            log(heap.toString() + "<br>");

            // Clear form
            processSizeInput.value = "";
            processTimeInput.value = "";
        }

        // Helper function to log messages
        function log(string) {
            const logBox = document.getElementById("logBox");
            logBox.innerHTML += (string + "<br />");
        }

        // Helper function to add process to the table
        function addProcessToTable(process) {
            const processTable = document.getElementById("processTable");

            const row = document.createElement("tr");
            row.setAttribute("id", "process" + process.id);

            const colName = document.createElement("td");
            colName.innerHTML = process.id;

            const colSize = document.createElement("td");
            colSize.innerHTML = process.size;

            const colTime = document.createElement("td");
            colTime.setAttribute("id", "process" + process.id + "timeLeft");
            colTime.innerHTML = process.timeLeft;

            row.appendChild(colName);
            row.appendChild(colSize);
            row.appendChild(colTime);

            processTable.appendChild(row);
        }

        // Helper function to remove process from the table
        function removeProcessFromTable(process) {
            const processTable = document.getElementById("processTable");
            processTable.removeChild(document.getElementById("process" + process.id));
        }

        // Helper function to refresh table
        function refreshTable() {
            for (let i = 0; i < processes.length; i++) {
                const process = processes[i];
                document.getElementById("process" + process.id + "timeLeft").innerHTML = process.timeLeft;
            }
        }

        // Initialize heap
        const heap = new Heap();
        const memControlBlockSize = 16;
        const blockSizes = [256, 256, 256, 256];
        for (let i = 0; i < blockSizes.length; i++) {
            heap.add(new MemControlBlock(blockSizes[i]));
        }

        // Draw initial heap
        heap.repaint();

        // Start clock
        const newClock = setInterval(function() {
            for (let i = 0; i < processes.length; i++) {
                const process = processes[i];
                if (!process.isAllocated()) {
                    heap.requestAllocation(process);
                } else {
                    process.tick();
                    if (process.timeLeft < 1) {
                        heap.deallocateProcess(process);
                        const index = processes.indexOf(process);
                        if (index > -1) {
                            const newProcesses = [...processes];
                            newProcesses.splice(index, 1);
                            setProcesses(newProcesses);
                        }
                        removeProcessFromTable(process);
                    }
                }
            }
            refreshTable();
            heap.repaint();
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(newClock); // Clear interval when component unmounts
        };
    }, []); // Empty dependency array to run only once on component mount

    return (
        <div className={styles.mainContainer}>
            <div id="title">
                <h3>Memory Management</h3>
            </div>

            <div className={styles.rightContainer}>
                <div id="memoryContainer">
                    <div id="memory"></div>
                </div>
            </div>

            <div className={styles.leftContainer}>
                <h2>Add Process</h2>
                <form className={styles.processForm} onSubmit={handleProcessSubmission}>
                    <input type="text" name="processSize" placeholder="Process size" autoComplete="off" />
                    <input type="text" name="processTime" placeholder="Process time" autoComplete="off" />
                    <button type="submit" style={{ display: 'none' }}></button>
                </form>
                <br /><br />
                <h2>Process Queue</h2>
                <table className={styles.processTable} id="processTable">
                    <tr><th>Process ID</th><th>Size (K)</th><th>Time Units Remaining</th></tr>
                </table>
                <br /><br />
                <div className={styles.logBoxContainer}>
                    <div className={styles.logBox} id="logBox">DEBUG LOG<br /></div>
                </div>
            </div>
        </div>
    );
}

export default MemoryManagement;
