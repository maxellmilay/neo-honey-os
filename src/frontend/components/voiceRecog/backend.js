const express = require('express');
const expressWs = require('express-ws');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
expressWs(app);

app.use(cors());
app.use(express.json());

let pythonProcess = null;
let initializationTimeout = null;

function killPythonProcess() {
    if (pythonProcess) {
        console.log('[DEBUG] Killing existing Python process');
        pythonProcess.kill();
        pythonProcess = null;
    }
    if (initializationTimeout) {
        clearTimeout(initializationTimeout);
        initializationTimeout = null;
    }
}

// Voice recognition endpoint
app.post('/desktop', (req, res) => {
    console.log('[DEBUG] Voice recognition endpoint hit');
    
    // Set up SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Kill any existing Python process
    killPythonProcess();

    const scriptPath = path.join(__dirname, 'voice_recog.py');
    console.log(`[DEBUG] Starting Python script at: ${scriptPath}`);

    // Start the Python voice recognition script
    pythonProcess = spawn('python', [scriptPath]);
    console.log('[DEBUG] Python process spawned with PID:', pythonProcess.pid);

    // Set a timeout for initialization
    initializationTimeout = setTimeout(() => {
        console.error('[DEBUG] Voice recognition initialization timeout after 2 minutes');
        res.write('ERROR:Initialization timeout after 2 minutes\n');
        killPythonProcess();
    }, 120000); // 2 minutes timeout

    let isInitialized = false;

    // Handle Python script output
    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('[DEBUG] Python output:', output);
        
        // Check for initialization success
        if (output.includes('SYSTEM:READY')) {
            console.log('[DEBUG] Voice recognition system ready');
            isInitialized = true;
            if (initializationTimeout) {
                clearTimeout(initializationTimeout);
                initializationTimeout = null;
            }
        }
        
        res.write(output);
    });

    pythonProcess.stderr.on('data', (data) => {
        const error = data.toString();
        console.error('[DEBUG] Python error:', error);
        res.write(`ERROR:${error}\n`);
        
        // If we get an error during initialization, kill the process
        if (!isInitialized) {
            console.error('[DEBUG] Error during initialization');
            killPythonProcess();
        }
    });

    // Handle Python process errors
    pythonProcess.on('error', (error) => {
        console.error('[DEBUG] Failed to start Python process:', error);
        res.write(`ERROR:Failed to start Python process: ${error.message}\n`);
        killPythonProcess();
    });

    // Handle client disconnect
    req.on('close', () => {
        console.log('[DEBUG] Client disconnected');
        killPythonProcess();
    });

    // Handle Python process exit
    pythonProcess.on('close', (code) => {
        console.log(`[DEBUG] Python process exited with code ${code}`);
        res.write('SYSTEM:STOPPED\n');
        killPythonProcess();
    });
});

// Start server on a random available port
const server = app.listen(0, () => {
    const port = server.address().port;
    console.log(`[DEBUG] Voice recognition server running on port ${port}`);
    // Send port number to Electron main process
    if (process.send) {
        process.send({ type: 'PORT', port });
    }
});
