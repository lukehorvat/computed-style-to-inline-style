const { app, BrowserWindow } = require('electron');
const path = require('path');
const pkg = require('../package.json');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: `${pkg.name} (v${pkg.version})`,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
