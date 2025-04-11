const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require('child_process');
const url = require("url")
const remote = require('@electron/remote/main');

console.log('Electron main process started');

let mainWindow;
let splashScreen;
let expressProcess;
remote.initialize();

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

let cameraWindow;

// Update your createCameraWindow function
function createCameraWindow() {
    cameraWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
      },
    });
  
    // Enable remote module for this window
    remote.enable(cameraWindow.webContents);
  
    cameraWindow.loadFile(path.join(__dirname, "../src/frontend/components/camera/index.html"));
    
    // Handle the "minimize-camera" IPC event
    ipcMain.on("minimize-camera", () => {
    if (cameraWindow) {
        cameraWindow.minimize();
    }
    });

    cameraWindow.on("closed", () => {
      cameraWindow = null;
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
            preload: path.join(__dirname, 'preload.js'),
		},
	})

    // and load the index.html of the app.
    const appURL = app.isPackaged
        ? `file://${path.join(__dirname, "index.html")}`
        : "http://localhost:3000";
        mainWindow.loadURL(appURL);

    // Open the DevTools.
    // if (!app.isPackaged) {
    //     win.webContents.openDevTools();
    // }
	mainWindow.once('ready-to-show', () => {
		// Show the window only when all assets are loaded
		mainWindow.show();
		if (splashScreen) {
			splashScreen.close();
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

// Run Express server
function runServer() {
    expressProcess = spawn('node', ['src/frontend/components/voiceRecog/backend.js']);

    expressProcess.stdout.on('data', (data) => {
        console.log(`Express: ${data}`);
    });

    expressProcess.stderr.on('data', (data) => {
        console.error(`Express Error: ${data}`);
    });

    expressProcess.on('close', (code) => {
        console.log(`Express process exited with code ${code}`);
    });
}

app.whenReady().then(() => {
    console.log('App is ready')
    createSplashScreen();
    setTimeout(createWindow, 10000); // Change delay as needed
    // setTimeout(runServer, 9000); // Start Express server after a delay
    ipcMain.on("open-camera", () => {
        console.log("Opening camera...");
        createCameraWindow();
      });
    ipcMain.on("minimize-camera", () => {
    if (cameraWindow) {
        cameraWindow.minimize();
    }
    });
       // Handle "close-camera" event
    ipcMain.on("close-camera", () => {
    if (cameraWindow) {
        console.log("Closing camera...");
        cameraWindow.close();
    }
    });
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
        expressProcess.kill(); // Kill Express server process when quitting Electron app
    }
});