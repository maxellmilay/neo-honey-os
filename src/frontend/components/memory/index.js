import React from 'react';
import styles from './memory.module.scss'; // Import CSS module

const MemoryManagement = ({ simulation }) => {
    
    if (!simulation || !simulation.memoryManager) {
        return <div className={`${styles.memoryContainer} w-full h-full flex flex-col rounded-md`}>No memory data available</div>;
    }

    const { totalMemory, segments } = simulation.memoryManager;

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

    return (
        <div className={`${styles.memoryContainer} w-full h-full flex flex-col rounded-md`}>
            {memorySegments}
        </div>
    );
};

export default MemoryManagement;
