import React from 'react';
import styles from './memory.module.scss'; // Import CSS module

const MemoryManagement = ({ simulation }) => {
    
    if (!simulation || !simulation.memoryManager) {
        return (
            <div className="w-full h-full flex flex-col items-center pt-[24px]">
                <div className={`${styles.memoryContainer} w-full h-[500px] flex items-center justify-center mb-4 rounded-md`}>
                    Available
                </div>
             <> <b>MB / 1024 MB</b> used </>
            </div>
        )
    }

    const { totalMemory, segments } = simulation.memoryManager;


    // Calculate used memory
    const usedMemory = segments?.reduce((acc, segment) => acc + (segment.end - segment.start), 0) || 0;

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
        <div className="w-full h-full flex flex-col items-center pt-[24px]">
            <div className={`${styles.memoryContainer} w-full h-[480px] mb-2 flex flex-col bg-border-orange-500 border-b-2`}>
                {memorySegments}
            </div>
             <> <b>MB / {totalMemory} MB</b> memory used </>
        </div>
    );
};

export default MemoryManagement;
