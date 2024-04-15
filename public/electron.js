const path = require("path")
const { app, BrowserWindow } = require("electron")
const url = require("url")

let mainWindow;
let splashScreen;

function createSplashScreen() {
  splashScreen = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    // transparent: true,
    alwaysOnTop: true
  });
//   splashScreen.loadFile('splash.html');


	splashScreen.loadURL(
		url.format({
		pathname: path.join(__dirname, 'splash.html'),
		protocol: 'file:',
		slashes: true
		})
	);

//   splashScreen.loadURL(appURL)

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
		alwaysOnTop: true,
		webPreferences: {
			preload: path.join(__dirname, "../src/backend/controllers/preload.js"),
			nodeIntegration: true,
			contextIsolation: true,
			sandbox: false,
		},
	})

	// Set minimum window size
	// mainWindow.setMinimumSize(700, 650)

	// and load the index.html of the app.
	// mainWindow.loadFile("index.html");
	const appURL = app.isPackaged
		? url.format({
				pathname: path.join(__dirname, "index.html"),
				protocol: "file:",
				slashes: true,
		  })
		: "http://localhost:3000"
	mainWindow.loadURL(appURL)

	// Open the DevTools.
	// if (!app.isPackaged) {
	// 	mainWindow.webContents.openDevTools()
	// }
	mainWindow.once('ready-to-show', () => {
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
	setTimeout(createWindow,5000); // Change delay as needed
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