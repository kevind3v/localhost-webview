const { app, BrowserWindow, globalShortcut, Tray } = require('electron');
const config = require('./config');

let win = null;
let contents = null;

function createWindow() {
  const appIcon = new Tray(__dirname + '/icon.png')
  win = new BrowserWindow({
    width: config.width,
    height: config.height,
    titleBarStyle: 'hidden',
    title: 'Localhost',
    skipTaskbar: true,
    icon: __dirname + '/icon.png',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(config.url);

  contents = win.webContents;
}

function toggleDevTools() {
  contents.toggleDevTools();
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J', toggleDevTools);
}

app.whenReady().then(createWindow).then(createShortcuts);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', recreateWindow);

function recreateWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}
