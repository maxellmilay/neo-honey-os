import React from 'react';
import styles from './MemoryManagement.module.css';

function MemoryManagement() {
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
                <form className={styles.processForm}>
                    <input type="text" name="processSize" placeholder="Process size" autoComplete="off" />
                    <input type="text" name="processTime" placeholder="Process time" autoComplete="off" />
                    <button type="submit" style={{ display: 'none' }}></button>
                </form>
                <br /><br />
                <h2>Process Queue</h2>
                <table className={styles.processTable}>
                    <tr><th>Process ID</th><th>Size (K)</th><th>Time Units Remaining</th></tr>
                </table>
                <br /><br />
                <div className={styles.logBoxContainer}>
                    <div className={styles.logBox}>DEBUG LOG<br /></div>
                </div>
            </div>
        </div>
    );
}
<script src="./script.js"></script>
export default MemoryManagement;
