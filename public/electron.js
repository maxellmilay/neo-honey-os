const path = require("path")
const { app, BrowserWindow } = require("electron")
const url = require("url")

let mainWindow;
let splashScreen;

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 800,
    height: 650,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });
  
	splashScreen.loadURL(
		url.format({
		pathname: path.join(__dirname, 'splash.html'),
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
		icon: path.join(__dirname, "./logo.ico"),
		webPreferences: {
			preload: path.join(__dirname, "../src/backend/controllers/preload.js"),
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: false,
		},
	})

	// Load the index.html of the app.
	const appURL = app.isPackaged
		? url.format({
				pathname: path.join(__dirname, "index.html"),
				protocol: "file:",
				slashes: true,
		  })
		: "http://localhost:3000"
		
	mainWindow.loadURL(appURL)

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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createSplashScreen();
	setTimeout(createWindow, 14500); // Change delay as needed
});
  
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
	  app.quit();
	}
  });
  
app.on('activate', () => {
if (mainWindow === null) {
	createWindow();
}
});