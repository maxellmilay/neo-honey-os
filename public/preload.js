const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    onVoiceServerPort: (callback) => {
        ipcRenderer.on('voice-server-port', (event, port) => callback(port));
    }
}); 