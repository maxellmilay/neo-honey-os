const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { fork } = require('child_process');
const url = require("url")

let mainWindow;
let splashScreen;
let expressProcess;
let voiceServerPort = null;

function createSplashScreen() {
    splashScreen = new BrowserWindow({
      width: 800,
      height: 650,
      frame: false,
      fullscreen: true,
      transparent: true,
      skipTaskbar: true,
      icon: path.join(__dirname, "./logo.ico"),
      alwaysOnTop: false
    });
    
      splashScreen.loadURL(
          url.format({
		  pathname: path.join(__dirname, '../src/frontend/components/splash.html'),
          protocol: 'file:',
          slashes: true
          })
      );
  
    splashScreen.on('closed', () => {
      splashScreen = null;
    });
}
  
function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		frame: false, 
		center: true,
		resizable: false,
		maximizable: true,
        alwaysOnTop: false,
        fullscreen: true,
		icon: path.join(__dirname, "./logo.ico"),
		webPreferences: {
            nodeIntegration: true,
			contextIsolation: true,
			sandbox: false,
            preload: path.join(__dirname, 'preload.js')
		},
	});

    // and load the index.html of the app.
    const appURL = app.isPackaged
        ? `file://${path.join(__dirname, "index.html")}`
        : "http://localhost:3000";
    mainWindow.loadURL(appURL);

    // Open the DevTools.
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }

	mainWindow.once('ready-to-show', () => {
		// Show the window only when all assets are loaded
		mainWindow.show();
		if (splashScreen) {
			splashScreen.close();
		}
        // Start voice server after window is ready
        runServer();
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

// Run Express server
function runServer() {
    console.log('Starting voice recognition server...');
    const serverPath = path.join(__dirname, '../src/frontend/components/voiceRecog/backend.js');
    console.log('Server path:', serverPath);
    
    expressProcess = fork(serverPath, [], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    expressProcess.stdout.on('data', (data) => {
        console.log(`Voice Server: ${data}`);
    });

    expressProcess.stderr.on('data', (data) => {
        console.error(`Voice Server Error: ${data}`);
    });

    expressProcess.on('message', (message) => {
        console.log('Received message from voice server:', message);
        if (message.type === 'PORT') {
            voiceServerPort = message.port;
            console.log('Voice server running on port:', voiceServerPort);
            if (mainWindow && mainWindow.webContents) {
                mainWindow.webContents.send('voice-server-port', voiceServerPort);
            }
        }
    });

    expressProcess.on('error', (error) => {
        console.error('Voice server error:', error);
    });

    expressProcess.on('close', (code) => {
        console.log(`Voice server process exited with code ${code}`);
    });
}

app.whenReady().then(() => {
    createSplashScreen();
    setTimeout(createWindow, 10000); // Change delay as needed
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('before-quit', () => {
    if (expressProcess) {
        expressProcess.kill(); // Kill voice server process when quitting Electron app
    }
});

// Add IPC handler to respond to port requests from renderer
ipcMain.on('get-voice-server-port', (event) => {
    if (voiceServerPort) {
        event.sender.send('voice-server-port', voiceServerPort);
    }
});