const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: ' desktop application',
        width: 1500,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            
        },
    });

    
    mainWindow.webContents.openDevTools();
    const startUrl = url.format({
        pathname: path.join(__dirname, './Frontend/APP/build/index.html'),
        protocol: 'file:',
        slashes: true,  // Ensure this is included
    });

    // Load local file
    mainWindow.loadURL('http://localhost:3000/');
}

app.whenReady().then(createMainWindow).catch(e => console.error('Failed to create main window:', e));

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});

// Global handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
