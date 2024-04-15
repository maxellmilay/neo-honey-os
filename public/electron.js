const path = require("path")
const { app, BrowserWindow } = require("electron")
const url = require("url")

let splashScreen;

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  });
  splashScreen.loadFile('splash.html');
  splashScreen.on('closed', () => {
    splashScreen = null;
  });
}

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1280,
		height: 720,
		frame: false, 
		center: true,
		resizable: false,
		maximizable: true,
		webPreferences: {
			preload: path.join(__dirname, "../src/backend/controllers/preload.js"),
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: false,
		},
	})

	// Set minimum window size
	win.setMinimumSize(700, 650)

	// and load the index.html of the app.
	// win.loadFile("index.html");
	const appURL = app.isPackaged
		? url.format({
				pathname: path.join(__dirname, "index.html"),
				protocol: "file:",
				slashes: true,
		  })
		: "http://localhost:3000"
	win.loadURL(appURL)

	// Open the DevTools.
	// if (!app.isPackaged) {
	// 	win.webContents.openDevTools()
	// }
	win.once('ready-to-show', () => {
		win.show();
		if (splashScreen) {
		  splashScreen.close();
		}
	  });
	
	win.on('closed', () => {
		win = null;
	});

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createSplashScreen();
	setTimeout(createWindow, 2000); // Change delay as needed
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
