// https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/#:~:text=Electron%20and,is%20Facebook's%20JavaScript%20view%20framework.&text=And%20Electron%20is%20GitHub's%20framework,platform%20desktop%20apps%20in%20JavaScript.&text=Most%20use%20webpack%20for%20the%20configuration%20necessary%20for%20React%20development.

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
});