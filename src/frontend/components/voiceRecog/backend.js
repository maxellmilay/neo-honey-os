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

// Voice recognition endpoint
app.post('/desktop', (req, res) => {
    // Set up SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Kill any existing Python process
    if (pythonProcess) {
        pythonProcess.kill();
    }

    // Start the Python voice recognition script
    pythonProcess = spawn('python', [path.join(__dirname, 'voice_recog.py')]);

    // Handle Python script output
    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Python output:', output);
        res.write(output);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Python error:', data.toString());
        res.write(`ERROR:${data.toString()}\n`);
    });

    // Handle client disconnect
    req.on('close', () => {
        console.log('Client disconnected');
        if (pythonProcess) {
            pythonProcess.kill();
            pythonProcess = null;
        }
    });

    // Handle Python process exit
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        res.write('SYSTEM:STOPPED\n');
        pythonProcess = null;
    });
});

// Start server on a random available port
const server = app.listen(0, () => {
    const port = server.address().port;
    console.log(`Voice recognition server running on port ${port}`);
    // Send port number to Electron main process
    if (process.send) {
        process.send({ type: 'PORT', port });
    }
});
