// const path = require("path")

// const { app, BrowserWindow } = require("electron")
// const url = require("url")

// function createWindow() {
// 	// Create the browser window.
// 	const win = new BrowserWindow({
// 		width: 1280,
// 		height: 720,
// 		frame: false, 
// 		center: true,
// 		resizable: false,
// 		maximizable: true,
// 		webPreferences: {
// 			preload: path.join(__dirname, "../src/backend/controllers/preload.js"),
// 			nodeIntegration: true,
// 			contextIsolation: true,
// 			sandbox: false,
// 		},
// 	})

// 	// Set minimum window size
// 	win.setMinimumSize(700, 650)

// 	// and load the index.html of the app.
// 	// win.loadFile("index.html");
// 	const appURL = app.isPackaged
// 		? url.format({
// 				pathname: path.join(__dirname, "index.html"),
// 				protocol: "file:",
// 				slashes: true,
// 		  })
// 		: "http://localhost:3000"
// 	win.loadURL(appURL)

// 	// Open the DevTools.
// 	// if (!app.isPackaged) {
// 	// 	win.webContents.openDevTools()
// 	// }
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
// 	createWindow()
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on("window-all-closed", () => {
// 	if (process.platform !== "darwin") {
// 		app.quit()
// 	}
// })

// app.on("activate", () => {
// 	// On macOS it's common to re-create a window in the app when the
// 	// dock icon is clicked and there are no other windows open.
// 	if (BrowserWindow.getAllWindows().length === 0) {
// 		createWindow()
// 	}
// })

const path = require("path");
const { app, BrowserWindow } = require("electron");
const { spawn } = require('child_process');

let expressProcess;

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
    });

    // Set minimum window size
    win.setMinimumSize(700, 650);

    // and load the index.html of the app.
    const appURL = app.isPackaged
        ? `file://${path.join(__dirname, "index.html")}`
        : "http://localhost:3000";
    win.loadURL(appURL);

    // Open the DevTools.
    if (!app.isPackaged) {
        win.webContents.openDevTools();
    }
}

// Run Express server
function runServer() {
    expressProcess = spawn('node', ['backend.js']);

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
    runServer(); // Start Express server
    createWindow();
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
