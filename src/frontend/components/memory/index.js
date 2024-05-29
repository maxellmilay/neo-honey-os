import React from 'react';
import styles from './memory.module.scss'; // Import CSS module

const MemoryManagement = ({ simulation }) => {
    
    if (!simulation || !simulation.memoryManager) {
        return (
            <div className="w-full h-full flex flex-col items-center pt-[24px]">
                <div className={`${styles.memoryContainer} w-full h-[475px] flex items-center justify-center mb-4 rounded-md`}>
                    Available
                </div>
             <> <b>0 MB / 1024 MB (0%) </b> Memory Usage </>
            </div>
        )
    }

    const { totalMemory, segments } = simulation.memoryManager;

const usedMemory = simulation?.jobs
  .filter(item => item.status === "Ready" || item.status === "Running")
  .reduce((total, item) => total + item.memory, 0);

    // Render memory segments
    const memorySegments = segments?.map((segment, index) => (
        <div
            key={index}
            className={segment.jobId ? styles[`memory-allocated-${segment.jobId}`] : styles.deallocatedBlock}
            style={{ height: `${((segment.end - segment.start) / totalMemory) * 100}%` }}
        >
            {segment.jobId ? `Job ${segment.jobId}` : ''}
        </div>
    ));

const percentage = Math.floor((usedMemory / totalMemory) * 100);

    return (
        <div className="w-full h-full flex flex-col items-center pt-[24px]">
            <div className={`${styles.memoryContainer} w-full h-[475px] mb-2 flex flex-col bg-border-orange-500 border-b-2`}>
                {memorySegments}
            </div>
             <> <b>{usedMemory} MB / {totalMemory} MB ({percentage}%) </b> Memory Usage </>
        </div>
    );
};

export default MemoryManagement;
